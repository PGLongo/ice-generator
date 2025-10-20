import jsPDF from 'jspdf'
import type { IceData } from '@/types/ice'

export const useIcePDF = () => {
  const { generateQRCode } = useQRCode()
  const { generateShareableUrl } = useIceUrlShare()

  const generatePDF = async (data: IceData, includeQRCode: boolean = true): Promise<void> => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    let yPosition = margin

    // Title
    pdf.setFontSize(24)
    pdf.setFont('helvetica', 'bold')
    pdf.text('🆘 ICE - In Case of Emergency', pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 15

    // Name
    pdf.setFontSize(20)
    pdf.setFont('helvetica', 'bold')
    pdf.text(data.name, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 10

    // Age and Blood Type
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    let personalInfo = `${data.age} anni`
    if (data.bloodType) {
      const bloodType = typeof data.bloodType === 'object' && data.bloodType !== null
        ? (data.bloodType as { label?: string }).label || ''
        : data.bloodType || ''
      if (bloodType) {
        personalInfo += ` • Gruppo Sanguigno: ${bloodType}`
      }
    }
    pdf.text(personalInfo, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 15

    // Emergency Contacts
    if (data.emergencyContacts && data.emergencyContacts.length > 0) {
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('📞 Contatti di Emergenza', margin, yPosition)
      yPosition += 10

      data.emergencyContacts.forEach((contact, index) => {
        if (yPosition > pageHeight - 40) {
          pdf.addPage()
          yPosition = margin
        }

        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        const priority = index === 0 ? 'PRIMARIO' : index === 1 ? 'SECONDARIO' : `CONTATTO ${index + 1}`
        pdf.text(`${priority}: ${contact.name}`, margin, yPosition)
        yPosition += 6

        pdf.setFont('helvetica', 'normal')
        pdf.text(`Relazione: ${contact.relationship}`, margin + 5, yPosition)
        yPosition += 5
        pdf.text(`Telefono: ${contact.phone}`, margin + 5, yPosition)
        yPosition += 5

        if (contact.email) {
          pdf.text(`Email: ${contact.email}`, margin + 5, yPosition)
          yPosition += 5
        }
        yPosition += 5
      })
    }

    // Medical Information
    if (data.allergies?.length || data.medicalConditions?.length || data.currentMedications?.length || data.medicalNotes) {
      if (yPosition > pageHeight - 60) {
        pdf.addPage()
        yPosition = margin
      }

      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('🏥 Informazioni Mediche', margin, yPosition)
      yPosition += 10

      if (data.allergies?.length) {
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Allergie:', margin, yPosition)
        yPosition += 5
        pdf.setFont('helvetica', 'normal')
        data.allergies.forEach(allergy => {
          pdf.text(`• ${allergy}`, margin + 5, yPosition)
          yPosition += 5
        })
        yPosition += 3
      }

      if (data.medicalConditions?.length) {
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Condizioni Mediche:', margin, yPosition)
        yPosition += 5
        pdf.setFont('helvetica', 'normal')
        data.medicalConditions.forEach(condition => {
          pdf.text(`• ${condition}`, margin + 5, yPosition)
          yPosition += 5
        })
        yPosition += 3
      }

      if (data.currentMedications?.length) {
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Farmaci Attuali:', margin, yPosition)
        yPosition += 5
        pdf.setFont('helvetica', 'normal')
        data.currentMedications.forEach(medication => {
          pdf.text(`• ${medication}`, margin + 5, yPosition)
          yPosition += 5
        })
        yPosition += 3
      }

      if (data.medicalNotes) {
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Note Mediche:', margin, yPosition)
        yPosition += 5
        pdf.setFont('helvetica', 'normal')
        const lines = pdf.splitTextToSize(data.medicalNotes, pageWidth - 2 * margin)
        pdf.text(lines, margin + 5, yPosition)
        yPosition += lines.length * 5 + 5
      }
    }

    // Additional Information
    if (data.primaryDoctor || data.insuranceInfo || data.specialInstructions) {
      if (yPosition > pageHeight - 40) {
        pdf.addPage()
        yPosition = margin
      }

      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('ℹ️ Informazioni Aggiuntive', margin, yPosition)
      yPosition += 10

      if (data.primaryDoctor) {
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Medico Curante:', margin, yPosition)
        yPosition += 5
        pdf.setFont('helvetica', 'normal')
        pdf.text(data.primaryDoctor, margin + 5, yPosition)
        yPosition += 8
      }

      if (data.insuranceInfo) {
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Assicurazione:', margin, yPosition)
        yPosition += 5
        pdf.setFont('helvetica', 'normal')
        const lines = pdf.splitTextToSize(data.insuranceInfo, pageWidth - 2 * margin)
        pdf.text(lines, margin + 5, yPosition)
        yPosition += lines.length * 5 + 5
      }

      if (data.specialInstructions) {
        pdf.setFontSize(12)
        pdf.setFont('helvetica', 'bold')
        pdf.text('Istruzioni Speciali:', margin, yPosition)
        yPosition += 5
        pdf.setFont('helvetica', 'normal')
        const lines = pdf.splitTextToSize(data.specialInstructions, pageWidth - 2 * margin)
        pdf.text(lines, margin + 5, yPosition)
        yPosition += lines.length * 5 + 5
      }
    }

    // QR Code (if requested)
    if (includeQRCode) {
      try {
        const shareableUrl = generateShareableUrl(data)
        const qrCodeDataUrl = await generateQRCode(shareableUrl, {
          width: 200,
          margin: 2
        })

        // Add QR code to a new page or bottom of current page
        if (yPosition > pageHeight - 80) {
          pdf.addPage()
          yPosition = margin
        } else {
          yPosition += 10
        }

        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.text('📱 QR Code per informazioni complete', margin, yPosition)
        yPosition += 10

        // Add QR code image
        const qrSize = 50
        const qrX = margin
        const qrY = yPosition

        pdf.addImage(qrCodeDataUrl, 'PNG', qrX, qrY, qrSize, qrSize)

        // Add instructions next to QR code
        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'normal')
        const instructions = [
          'Scansiona questo QR code per:',
          '• Accedere alle informazioni complete',
          '• Condividere con soccorritori',
          '• Aggiornare i dati se necessario'
        ]
        
        let instructionY = qrY + 5
        instructions.forEach(instruction => {
          pdf.text(instruction, qrX + qrSize + 10, instructionY)
          instructionY += 5
        })

      } catch (error) {
        console.error('Error generating QR code for PDF:', error)
      }
    }

    // Footer
    const footerY = pageHeight - 15
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`Generato il ${new Date().toLocaleDateString('it-IT')} • Mantieni aggiornate queste informazioni`, 
      pageWidth / 2, footerY, { align: 'center' })

    // Save PDF
    const filename = `ICE-${data.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`
    pdf.save(filename)
  }

  return {
    generatePDF
  }
}