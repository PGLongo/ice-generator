import type { SchoolFormData } from '@/types/school-form'

export const useSchoolPDF = () => {
  const generateSchoolPDF = async (formData: SchoolFormData): Promise<void> => {
    if (import.meta.server) return

    const { default: jsPDF } = await import('jspdf')
    const QRCode = await import('qrcode')

    const { school, people } = formData

    // A4 landscape: 297mm x 210mm
    const pdf = new jsPDF('l', 'mm', 'a4')
    const pageW = pdf.internal.pageSize.getWidth()
    const pageH = pdf.internal.pageSize.getHeight()

    // Card dimensions (centered with margins)
    const cardMarginH = 18
    const cardMarginV = 15
    const cardX = cardMarginH
    const cardY = cardMarginV
    const cardW = pageW - cardMarginH * 2
    const cardH = pageH - cardMarginV * 2
    const cardPad = 14

    // Left panel ends at 38% of card width
    const dividerX = cardX + cardW * 0.38
    const leftPanelW = dividerX - cardX
    const leftCenterX = cardX + leftPanelW / 2
    const rightStartX = dividerX + 12
    const rightWidth = cardX + cardW - rightStartX - cardPad

    // Pre-load logo if present
    let logoDataUrl: string | null = null
    let logoFormat = 'PNG'
    if (school.logoUrl) {
      try {
        const result = await loadImage(school.logoUrl)
        logoDataUrl = result.dataUrl
        logoFormat = result.format
      } catch {
        // skip logo if load fails
      }
    }

    for (let i = 0; i < people.length; i++) {
      const person = people[i]
      if (!person) continue

      if (i > 0) pdf.addPage()

      // CARD BORDER (rounded rectangle)
      pdf.setDrawColor(180, 180, 180)
      pdf.setLineWidth(0.7)
      pdf.roundedRect(cardX, cardY, cardW, cardH, 5, 5, 'S')

      // LEFT PANEL
      let leftY = cardY + cardPad + 6

      // Logo (centered in left panel)
      if (logoDataUrl) {
        const logoSize = 36
        pdf.addImage(logoDataUrl, logoFormat, leftCenterX - logoSize / 2, leftY, logoSize, logoSize)
        leftY += logoSize + 8
      } else {
        leftY += 10
      }

      // School name (bold, centered)
      if (school.name) {
        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(30, 30, 30)
        const maxWidth = leftPanelW - cardPad * 2
        const schoolNameLines = pdf.splitTextToSize(school.name, maxWidth)
        pdf.text(schoolNameLines, leftCenterX, leftY, { align: 'center' })
        leftY += schoolNameLines.length * 6.5 + 10
      }

      // Address with filled location dot icon
      if (school.address || school.city) {
        const iconX = leftCenterX - leftPanelW * 0.3
        const textX = iconX + 6

        pdf.setFillColor(110, 110, 110)
        pdf.setDrawColor(110, 110, 110)

        let addrY = leftY
        if (school.address) {
          pdf.circle(iconX, addrY - 1.2, 2.5, 'F')
          pdf.setFontSize(8.5)
          pdf.setFont('helvetica', 'normal')
          pdf.setTextColor(90, 90, 90)
          pdf.text(school.address, textX, addrY)
          addrY += 6
        }
        if (school.city) {
          pdf.setFontSize(8.5)
          pdf.setFont('helvetica', 'normal')
          pdf.setTextColor(90, 90, 90)
          pdf.text(school.city, textX, addrY)
          addrY += 6
        }
        leftY = addrY + 4
      }

      // Phone with filled teal dot icon
      if (school.phone) {
        const iconX = leftCenterX - leftPanelW * 0.3
        const textX = iconX + 6

        pdf.setFillColor(20, 150, 130)
        pdf.circle(iconX, leftY - 1.2, 2.5, 'F')

        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(20, 150, 130)
        pdf.text(school.phone, textX, leftY)
      }

      // VERTICAL DIVIDER
      pdf.setDrawColor(220, 220, 220)
      pdf.setLineWidth(0.4)
      pdf.line(dividerX, cardY + cardPad, dividerX, cardY + cardH - cardPad)

      // RIGHT PANEL
      let rightY = cardY + cardPad + 8

      // "NOME BAMBINO" label
      pdf.setFontSize(7.5)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(160, 160, 160)
      pdf.text('NOME BAMBINO', rightStartX, rightY)
      rightY += 16 // enough gap so 40pt name doesn't overlap

      // Child name (very large)
      pdf.setFontSize(40)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(20, 20, 20)
      const childNameLines = pdf.splitTextToSize(person.fullName, rightWidth - 42)
      pdf.text(childNameLines, rightStartX, rightY)
      rightY += childNameLines.length * 16 + 6

      // "SEZIONE" label + value
      if (school.section) {
        pdf.setFontSize(7.5)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(160, 160, 160)
        pdf.text('SEZIONE', rightStartX, rightY)
        rightY += 8

        pdf.setFontSize(26)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(20, 20, 20)
        pdf.text(school.section, rightStartX, rightY)
        rightY += 16
      }

      rightY += 4

      // Separator line
      pdf.setDrawColor(230, 230, 230)
      pdf.setLineWidth(0.3)
      pdf.line(rightStartX, rightY, cardX + cardW - cardPad, rightY)
      rightY += 10

      // "REFERENTE DI EMERGENZA" section
      if (school.referentName || school.referentPhone) {
        pdf.setFontSize(7.5)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(160, 160, 160)
        pdf.text('REFERENTE DI EMERGENZA', rightStartX, rightY)
        rightY += 10

        // Referent name with filled grey dot
        if (school.referentName) {
          pdf.setFillColor(80, 80, 80)
          pdf.circle(rightStartX + 3, rightY - 1.5, 3, 'F')

          pdf.setFontSize(12)
          pdf.setFont('helvetica', 'normal')
          pdf.setTextColor(40, 40, 40)
          pdf.text(school.referentName, rightStartX + 9, rightY)
          rightY += 10
        }

        // Referent phone with filled teal dot
        if (school.referentPhone) {
          pdf.setFillColor(20, 150, 130)
          pdf.circle(rightStartX + 3, rightY - 1.5, 3, 'F')

          pdf.setFontSize(16)
          pdf.setFont('helvetica', 'bold')
          pdf.setTextColor(20, 150, 130)
          pdf.text(school.referentPhone, rightStartX + 9, rightY)
        }
      }

      // QR CODE (bottom-right of right panel)
      try {
        const qrData = [person.fullName, school.section, school.referentName, school.referentPhone]
          .filter(Boolean)
          .join('\n')
        const qrDataUrl = await QRCode.toDataURL(qrData || person.fullName, { width: 150, margin: 1 })
        const qrSize = 40
        const qrX = cardX + cardW - cardPad - qrSize
        const qrY = cardY + cardH - cardPad - qrSize
        pdf.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize)
      } catch {
        // skip QR if generation fails
      }
    }

    const filename = `Tessere-${school.name?.replace(/\s+/g, '-') ?? 'Scuola'}-${new Date().toISOString().split('T')[0]}.pdf`
    pdf.save(filename)
  }

  return { generateSchoolPDF }
}

interface LoadImageResult {
  dataUrl: string
  format: string
}

function loadImage(url: string): Promise<LoadImageResult> {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader()
        reader.onload = () => {
          const dataUrl = reader.result as string
          const format = blob.type === 'image/jpeg' ? 'JPEG'
            : blob.type === 'image/webp' ? 'WEBP'
              : 'PNG'
          resolve({ dataUrl, format })
        }
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
      .catch(reject)
  })
}
