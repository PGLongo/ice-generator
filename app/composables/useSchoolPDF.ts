import type { SchoolFormData } from '@/types/school-form'

export const useSchoolPDF = () => {
  const generateSchoolPDF = async (formData: SchoolFormData): Promise<void> => {
    if (import.meta.server) return

    const { default: jsPDF } = await import('jspdf')
    const QRCode = await import('qrcode')

    const { school, people } = formData

    // A4 landscape: 297mm x 210mm
    const pdf = new jsPDF('l', 'mm', 'a4')
    const W = pdf.internal.pageSize.getWidth() // 297
    const H = pdf.internal.pageSize.getHeight() // 210

    const margin = 15
    const dividerX = W * 0.42 // divider at ~42% from left
    const leftCenterX = margin + (dividerX - margin) / 2
    const rightStartX = dividerX + 10
    const rightWidth = W - rightStartX - margin

    // Pre-load logo if present
    let logoDataUrl: string | null = null
    if (school.logoUrl) {
      try {
        logoDataUrl = await loadImage(school.logoUrl)
      } catch {
        // skip logo if load fails
      }
    }

    for (let i = 0; i < people.length; i++) {
      const person = people[i]
      if (!person) continue

      if (i > 0) pdf.addPage()

      // ─── LEFT PANEL ───────────────────────────────────────────
      let leftY = margin + 5

      // Logo
      if (logoDataUrl) {
        const logoSize = 30
        pdf.addImage(logoDataUrl, 'PNG', leftCenterX - logoSize / 2, leftY, logoSize, logoSize)
        leftY += logoSize + 8
      } else {
        leftY += 10
      }

      // School name (large, centered in left panel)
      if (school.name) {
        pdf.setFontSize(16)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(30, 30, 30)
        const nameLines = pdf.splitTextToSize(school.name, dividerX - margin - 10)
        pdf.text(nameLines, leftCenterX, leftY, { align: 'center' })
        leftY += nameLines.length * 8 + 4
      }

      // Address + city
      if (school.address || school.city) {
        const address = [school.address, school.city].filter(Boolean).join(', ')
        pdf.setFontSize(9)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(100, 100, 100)
        const addrLines = pdf.splitTextToSize(address, dividerX - margin - 10)
        pdf.text(addrLines, leftCenterX, leftY, { align: 'center' })
        leftY += addrLines.length * 5 + 4
      }

      // Phone
      if (school.phone) {
        pdf.setFontSize(9)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(100, 100, 100)
        pdf.text(school.phone, leftCenterX, leftY, { align: 'center' })
      }

      // ─── VERTICAL DIVIDER ─────────────────────────────────────
      pdf.setDrawColor(220, 220, 220)
      pdf.setLineWidth(0.5)
      pdf.line(dividerX, margin, dividerX, H - margin)

      // ─── RIGHT PANEL ──────────────────────────────────────────
      let rightY = margin + 10

      // "NOME BAMBINO" label
      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(150, 150, 150)
      pdf.text('NOME BAMBINO', rightStartX, rightY)
      rightY += 7

      // Child name (very large)
      pdf.setFontSize(32)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(20, 20, 20)
      const nameLines = pdf.splitTextToSize(person.fullName, rightWidth - 40)
      pdf.text(nameLines, rightStartX, rightY)
      rightY += nameLines.length * 14 + 6

      // "SEZIONE" label + value
      if (school.section) {
        pdf.setFontSize(8)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(150, 150, 150)
        pdf.text('SEZIONE', rightStartX, rightY)
        rightY += 6

        pdf.setFontSize(18)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(20, 20, 20)
        pdf.text(school.section, rightStartX, rightY)
        rightY += 12
      }

      rightY += 4

      // Separator line
      pdf.setDrawColor(235, 235, 235)
      pdf.setLineWidth(0.3)
      pdf.line(rightStartX, rightY, W - margin, rightY)
      rightY += 8

      // "REFERENTE DI EMERGENZA" label
      if (school.referentName || school.referentPhone) {
        pdf.setFontSize(8)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(150, 150, 150)
        pdf.text('REFERENTE DI EMERGENZA', rightStartX, rightY)
        rightY += 7

        // Referent name
        if (school.referentName) {
          pdf.setFontSize(11)
          pdf.setFont('helvetica', 'normal')
          pdf.setTextColor(40, 40, 40)
          pdf.text(school.referentName, rightStartX, rightY)
          rightY += 7
        }

        // Referent phone (teal colored)
        if (school.referentPhone) {
          pdf.setFontSize(13)
          pdf.setFont('helvetica', 'bold')
          pdf.setTextColor(20, 150, 130)
          pdf.text(school.referentPhone, rightStartX, rightY)
        }
      }

      // ─── QR CODE (bottom-right of right panel) ────────────────
      try {
        const qrData = [person.fullName, school.section, school.referentName, school.referentPhone]
          .filter(Boolean)
          .join('\n')
        const qrDataUrl = await QRCode.toDataURL(qrData || person.fullName, { width: 120, margin: 1 })
        const qrSize = 35
        const qrX = W - margin - qrSize
        const qrY = H - margin - qrSize
        pdf.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize)
      } catch {
        // skip QR if generation fails
      }

      // ─── FOOTER ───────────────────────────────────────────────
      pdf.setFontSize(7)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(200, 200, 200)
      pdf.text(
        `Generato il ${new Date().toLocaleDateString('it-IT')}`,
        margin,
        H - 5
      )
    }

    const filename = `Tessere-${school.name?.replace(/\s+/g, '-') ?? 'Scuola'}-${new Date().toISOString().split('T')[0]}.pdf`
    pdf.save(filename)
  }

  return { generateSchoolPDF }
}

function loadImage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      canvas.getContext('2d')!.drawImage(img, 0, 0)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = reject
    img.src = url
  })
}
