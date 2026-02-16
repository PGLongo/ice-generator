import type { SchoolFormData } from '@/types/school-form'

// ─── TUNABLE LAYOUT CONFIG ────────────────────────────────────────────────────
const CARD_CONFIG = {
  // Page margins (mm)
  marginH: 18,
  marginV: 15,

  // Card inner padding (mm)
  pad: 14,

  // Left panel width as fraction of card width (0–1)
  leftPanelRatio: 0.38,

  // Gap between divider and right panel content (mm)
  dividerGap: 12,

  // Logo size (mm)
  logoSize: 36,

  // QR code size (mm)
  qrSize: 40,

  // Icon dot radius (mm)
  iconRadius: 2.5,

  // Font sizes (pt)
  font: {
    // NOME BAMBINO, SEZIONE, REFERENTE labels
    label: 12,
    // address / city
    address: 14,
    // school phone
    schoolPhone: 16,
    // school name
    schoolName: 32,
    referentName: 20,
    referentPhone: 16,
    // section value
    section: 26,
    // child name (largest)
    childName: 60
  },

  // Line heights (mm) — space added after each text block
  lineH: {
    // gap below a label before its value
    label: 24,
    // gap between address lines
    address: 6,
    // per-line height for school name
    schoolName: 6.5,
    // gap after section value
    section: 16,
    referentName: 10,
    // per-line height for child name
    childName: 16
  }
}
// ─────────────────────────────────────────────────────────────────────────────

export const useSchoolPDF = () => {
  const generateSchoolPDF = async (formData: SchoolFormData): Promise<void> => {
    const pdf = await buildPDF(formData)
    const filename = buildFilename(formData.school.name)
    pdf.save(filename)
  }

  const previewSchoolPDF = async (formData: SchoolFormData): Promise<void> => {
    const pdf = await buildPDF(formData)
    const url = pdf.output('bloburl')
    window.open(url, '_blank')
  }

  return { generateSchoolPDF, previewSchoolPDF }
}

async function buildPDF(formData: SchoolFormData) {
  if (import.meta.server) throw new Error('PDF generation is client-only')

  const { default: jsPDF } = await import('jspdf')
  const QRCode = await import('qrcode')

  const { school, people } = formData
  const C = CARD_CONFIG

  const pdf = new jsPDF('l', 'mm', 'a4')
  const pageW = pdf.internal.pageSize.getWidth()
  const pageH = pdf.internal.pageSize.getHeight()

  const cardX = C.marginH
  const cardY = C.marginV
  const cardW = pageW - C.marginH * 2
  const cardH = pageH - C.marginV * 2

  const dividerX = cardX + cardW * C.leftPanelRatio
  const leftPanelW = dividerX - cardX
  const leftCenterX = cardX + leftPanelW / 2
  const rightStartX = dividerX + C.dividerGap
  const rightWidth = cardX + cardW - rightStartX - C.pad

  // Pre-load logo once for all pages
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

    // CARD BORDER
    pdf.setDrawColor(180, 180, 180)
    pdf.setLineWidth(0.7)
    pdf.roundedRect(cardX, cardY, cardW, cardH, 5, 5, 'S')

    // ── LEFT PANEL ──────────────────────────────────────────────────────────
    let leftY = cardY + C.pad + 6

    if (logoDataUrl) {
      pdf.addImage(logoDataUrl, logoFormat, leftCenterX - C.logoSize / 2, leftY, C.logoSize, C.logoSize)
      leftY += C.logoSize + 8
    } else {
      leftY += 10
    }

    if (school.name) {
      pdf.setFontSize(C.font.schoolName)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(30, 30, 30)
      const maxWidth = leftPanelW - C.pad * 2
      const schoolNameLines = pdf.splitTextToSize(school.name, maxWidth)
      pdf.text(schoolNameLines, leftCenterX, leftY, { align: 'center' })
      leftY += schoolNameLines.length * C.lineH.schoolName + 10
    }

    if (school.address || school.city) {
      const iconX = leftCenterX - leftPanelW * 0.3
      const textX = iconX + 6
      pdf.setFillColor(110, 110, 110)
      pdf.setDrawColor(110, 110, 110)

      let addrY = leftY
      if (school.address) {
        pdf.circle(iconX, addrY - 1.2, C.iconRadius, 'F')
        pdf.setFontSize(C.font.address)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(90, 90, 90)
        pdf.text(school.address, textX, addrY)
        addrY += C.lineH.address
      }
      if (school.city) {
        pdf.setFontSize(C.font.address)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(90, 90, 90)
        pdf.text(school.city, textX, addrY)
        addrY += C.lineH.address
      }
      leftY = addrY + 4
    }

    if (school.phone) {
      const iconX = leftCenterX - leftPanelW * 0.3
      const textX = iconX + 6
      pdf.setFillColor(20, 150, 130)
      pdf.circle(iconX, leftY - 1.2, C.iconRadius, 'F')
      pdf.setFontSize(C.font.schoolPhone)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(20, 150, 130)
      pdf.text(school.phone, textX, leftY)
    }

    // ── VERTICAL DIVIDER ────────────────────────────────────────────────────
    pdf.setDrawColor(220, 220, 220)
    pdf.setLineWidth(0.4)
    pdf.line(dividerX, cardY + C.pad, dividerX, cardY + cardH - C.pad)

    // ── RIGHT PANEL ─────────────────────────────────────────────────────────
    let rightY = cardY + C.pad + 8

    pdf.setFontSize(C.font.label)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(160, 160, 160)
    pdf.text('NOME BAMBINO', rightStartX, rightY)
    rightY += C.lineH.label

    pdf.setFontSize(C.font.childName)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(20, 20, 20)
    const childNameLines = pdf.splitTextToSize(person.fullName, rightWidth - C.qrSize - 5)
    pdf.text(childNameLines, rightStartX, rightY)
    rightY += childNameLines.length * C.lineH.childName + 6

    if (school.section) {
      pdf.setFontSize(C.font.label)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(160, 160, 160)
      pdf.text('SEZIONE', rightStartX, rightY)
      rightY += C.lineH.label

      pdf.setFontSize(C.font.section)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(20, 20, 20)
      pdf.text(school.section, rightStartX, rightY)
      rightY += C.lineH.section
    }

    rightY += 4
    pdf.setDrawColor(230, 230, 230)
    pdf.setLineWidth(0.3)
    pdf.line(rightStartX, rightY, cardX + cardW - C.pad, rightY)
    rightY += 10

    if (school.referentName || school.referentPhone) {
      pdf.setFontSize(C.font.label)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(160, 160, 160)
      pdf.text('REFERENTE DI EMERGENZA', rightStartX, rightY)
      rightY += C.lineH.label

      if (school.referentName) {
        pdf.setFillColor(80, 80, 80)
        pdf.circle(rightStartX + 3, rightY - 1.5, 3, 'F')
        pdf.setFontSize(C.font.referentName)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(40, 40, 40)
        pdf.text(school.referentName, rightStartX + 9, rightY)
        rightY += C.lineH.referentName
      }

      if (school.referentPhone) {
        pdf.setFillColor(20, 150, 130)
        pdf.circle(rightStartX + 3, rightY - 1.5, 3, 'F')
        pdf.setFontSize(C.font.referentPhone)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(20, 150, 130)
        pdf.text(school.referentPhone, rightStartX + 9, rightY)
      }
    }

    // QR CODE (bottom-right)
    try {
      const qrData = [person.fullName, school.section, school.referentName, school.referentPhone]
        .filter(Boolean)
        .join('\n')
      const qrDataUrl = await QRCode.toDataURL(qrData || person.fullName, { width: 150, margin: 1 })
      const qrX = cardX + cardW - C.pad - C.qrSize
      const qrY = cardY + cardH - C.pad - C.qrSize
      pdf.addImage(qrDataUrl, 'PNG', qrX, qrY, C.qrSize, C.qrSize)
    } catch {
      // skip QR if generation fails
    }
  }

  return pdf
}

function buildFilename(schoolName: string | undefined): string {
  return `Tessere-${schoolName?.replace(/\s+/g, '-') ?? 'Scuola'}-${new Date().toISOString().split('T')[0]}.pdf`
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
