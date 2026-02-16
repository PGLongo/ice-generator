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

    // Card dimensions and position (centered on page with margins)
    const cardMarginH = 18
    const cardMarginV = 15
    const cardX = cardMarginH
    const cardY = cardMarginV
    const cardW = pageW - cardMarginH * 2
    const cardH = pageH - cardMarginV * 2
    const cardPad = 14

    // Left panel ends at ~42% of card width
    const dividerX = cardX + cardW * 0.40
    const leftCenterX = cardX + (dividerX - cardX) / 2
    const rightStartX = dividerX + 10
    const rightWidth = cardX + cardW - rightStartX - cardPad

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

      // ─── CARD BORDER (rounded rectangle) ──────────────────────
      pdf.setDrawColor(180, 180, 180)
      pdf.setLineWidth(0.7)
      pdf.roundedRect(cardX, cardY, cardW, cardH, 5, 5, 'S')

      // ─── LEFT PANEL ───────────────────────────────────────────
      let leftY = cardY + cardPad + 5

      // Logo
      if (logoDataUrl) {
        const logoSize = 32
        pdf.addImage(logoDataUrl, 'PNG', leftCenterX - logoSize / 2, leftY, logoSize, logoSize)
        leftY += logoSize + 10
      } else {
        leftY += 8
      }

      // School name (large, bold, centered in left panel)
      if (school.name) {
        pdf.setFontSize(15)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(30, 30, 30)
        const maxWidth = dividerX - cardX - cardPad * 2
        const nameLines = pdf.splitTextToSize(school.name, maxWidth)
        pdf.text(nameLines, leftCenterX, leftY, { align: 'center' })
        leftY += nameLines.length * 7 + 10
      }

      // Address with location icon
      if (school.address || school.city) {
        const address = school.address ?? ''
        const city = school.city ?? ''

        pdf.setFontSize(8)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(110, 110, 110)

        // Draw a small circle as location icon
        pdf.setDrawColor(110, 110, 110)
        pdf.setLineWidth(0.3)
        pdf.circle(leftCenterX - 18, leftY - 1.5, 2, 'S')
        // Inner dot
        pdf.setFillColor(110, 110, 110)
        pdf.circle(leftCenterX - 18, leftY - 1.5, 0.6, 'F')

        if (address) {
          pdf.text(address, leftCenterX - 13, leftY - 0.5)
          leftY += 5
        }
        if (city) {
          pdf.text(city, leftCenterX - 13 + (address ? 0 : 0), leftY - 0.5)
          leftY += 5
        }
        leftY += 4
      }

      // Phone with phone icon
      if (school.phone) {
        // Draw a simple handset icon (circle)
        pdf.setDrawColor(20, 150, 130)
        pdf.setLineWidth(0.3)
        pdf.circle(leftCenterX - 18, leftY - 1.5, 2, 'S')

        pdf.setFontSize(9)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(20, 150, 130)
        pdf.text(school.phone, leftCenterX - 13, leftY - 0.5)
      }

      // ─── VERTICAL DIVIDER ─────────────────────────────────────
      pdf.setDrawColor(210, 210, 210)
      pdf.setLineWidth(0.4)
      pdf.line(dividerX, cardY + cardPad, dividerX, cardY + cardH - cardPad)

      // ─── RIGHT PANEL ──────────────────────────────────────────
      let rightY = cardY + cardPad + 10

      // "NOME BAMBINO" label
      pdf.setFontSize(8)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(150, 150, 150)
      pdf.text('NOME BAMBINO', rightStartX, rightY)
      rightY += 8

      // Child name (very large)
      pdf.setFontSize(34)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(20, 20, 20)
      const nameLines = pdf.splitTextToSize(person.fullName, rightWidth - 35)
      pdf.text(nameLines, rightStartX, rightY)
      rightY += nameLines.length * 14 + 8

      // "SEZIONE" label + value
      if (school.section) {
        pdf.setFontSize(8)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(150, 150, 150)
        pdf.text('SEZIONE', rightStartX, rightY)
        rightY += 7

        pdf.setFontSize(20)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(20, 20, 20)
        pdf.text(school.section, rightStartX, rightY)
        rightY += 14
      }

      rightY += 4

      // Separator line
      pdf.setDrawColor(230, 230, 230)
      pdf.setLineWidth(0.3)
      pdf.line(rightStartX, rightY, cardX + cardW - cardPad, rightY)
      rightY += 8

      // "REFERENTE DI EMERGENZA" label
      if (school.referentName || school.referentPhone) {
        pdf.setFontSize(8)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(150, 150, 150)
        pdf.text('REFERENTE DI EMERGENZA', rightStartX, rightY)
        rightY += 8

        // Referent name with person icon (small circle)
        if (school.referentName) {
          pdf.setDrawColor(80, 80, 80)
          pdf.setLineWidth(0.3)
          pdf.circle(rightStartX + 2, rightY - 1.5, 2, 'S')

          pdf.setFontSize(11)
          pdf.setFont('helvetica', 'normal')
          pdf.setTextColor(40, 40, 40)
          pdf.text(school.referentName, rightStartX + 7, rightY - 0.5)
          rightY += 8
        }

        // Referent phone (teal colored) with phone icon
        if (school.referentPhone) {
          pdf.setDrawColor(20, 150, 130)
          pdf.setLineWidth(0.3)
          pdf.circle(rightStartX + 2, rightY - 1.5, 2, 'S')

          pdf.setFontSize(12)
          pdf.setFont('helvetica', 'bold')
          pdf.setTextColor(20, 150, 130)
          pdf.text(school.referentPhone, rightStartX + 7, rightY - 0.5)
        }
      }

      // ─── QR CODE (bottom-right of right panel) ────────────────
      try {
        const qrData = [person.fullName, school.section, school.referentName, school.referentPhone]
          .filter(Boolean)
          .join('\n')
        const qrDataUrl = await QRCode.toDataURL(qrData || person.fullName, { width: 150, margin: 1 })
        const qrSize = 38
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
