import type { jsPDF as JsPDF } from 'jspdf'
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
  logoSize: 60,

  // QR code size (mm)
  qrSize: 40,

  // Icon dot radius (mm)
  iconRadius: 3,

  // Font sizes (pt)
  font: {
    // NOME BAMBINO, SEZIONE, REFERENTE labels
    label: 16,
    // address / city
    address: 18,
    // school phone
    schoolPhone: 22,
    // school name
    schoolName: 32,
    referentName: 22,
    referentPhone: 18,
    // section value
    section: 26,
    // child name (largest)
    childName: 48
  },

  // Line heights (mm) — space added after each text block
  lineH: {
    // gap below a label before its value
    label: 12,
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

  const iconSize = C.iconRadius * 2

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
      leftY += C.logoSize + 15
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

    // ── ADDRESS & PHONE (bottom-anchored) ───────────────────────────────────
    // rowPhoneY / rowDetailY are shared with the right panel to keep elements aligned
    const leftIconX = leftCenterX - leftPanelW * 0.3
    const leftTextX = leftIconX + iconSize + 2
    const rowPhoneY = cardY + cardH - C.pad - 4
    const rowDetailY = rowPhoneY - 12

    // iconTopOffset: places icon center at ~cap-height midpoint of the adjacent text
    // (baseline − capCenter − iconSize/2) / iconSize ≈ 0.92 for Helvetica at these sizes
    const iconTopOffset = (textY: number) => textY - iconSize * 0.92

    if (school.phone) {
      drawIcon(pdf, 'phone', leftIconX, iconTopOffset(rowPhoneY), iconSize, [20, 150, 130])
      pdf.setFontSize(C.font.schoolPhone)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(20, 150, 130)
      pdf.text(school.phone, leftTextX, rowPhoneY)
    }

    if (school.address || school.city) {
      pdf.setFontSize(C.font.address)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(90, 90, 90)

      // city at rowDetailY → aligns with referentName on the right
      // address one row above city (smaller Y = higher on page)
      if (school.city) {
        drawIcon(pdf, 'pin', leftIconX, iconTopOffset(rowDetailY), iconSize, [110, 110, 110])
        pdf.text(school.city, leftTextX, rowDetailY)
      }
      if (school.address) {
        const addrY = school.city ? rowDetailY - C.lineH.address : rowDetailY
        drawIcon(pdf, 'pin', leftIconX, iconTopOffset(addrY), iconSize, [110, 110, 110])
        pdf.text(school.address, leftTextX, addrY)
      }
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
    rightY += C.lineH.label * 1.5

    pdf.setFontSize(C.font.childName)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(20, 20, 20)
    const childNameLines = pdf.splitTextToSize(person.fullName, rightWidth)
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

    // ── REFERENT & QR CODE (bottom-anchored) ────────────────────────────────
    // QR CODE (bottom-right corner)
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

    if (school.referentName || school.referentPhone) {
      if (school.referentPhone) {
        drawIcon(pdf, 'phone', rightStartX, iconTopOffset(rowPhoneY), iconSize, [20, 150, 130])
        pdf.setFontSize(C.font.schoolPhone)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(20, 150, 130)
        pdf.text(school.referentPhone, rightStartX + iconSize + 2, rowPhoneY)
      }

      if (school.referentName) {
        drawIcon(pdf, 'person', rightStartX, iconTopOffset(rowDetailY), iconSize, [110, 110, 110])
        pdf.setFontSize(C.font.address)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(90, 90, 90)
        pdf.text(school.referentName, rightStartX + iconSize + 2, rowDetailY)
      }

      const refLabelY = rowDetailY - 14
      pdf.setFontSize(C.font.label)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(160, 160, 160)
      pdf.text('REFERENTE DI EMERGENZA', rightStartX, refLabelY)

      pdf.setDrawColor(230, 230, 230)
      pdf.setLineWidth(0.5)
      pdf.line(rightStartX, refLabelY - 15, cardX + cardW - 10, refLabelY - 15)
    }
  }

  return pdf
}

function buildFilename(schoolName: string | undefined): string {
  return `Tessere-${schoolName?.replace(/\s+/g, '-') ?? 'Scuola'}-${new Date().toISOString().split('T')[0]}.pdf`
}

// Draws a vector icon directly on the jsPDF canvas — resolution-independent, crisp at any DPI.
// (x, y) = top-left corner of the icon bounding box; size = width = height in mm.
function drawIcon(
  pdf: JsPDF,
  type: 'phone' | 'pin' | 'person',
  x: number,
  y: number,
  size: number,
  color: [number, number, number]
): void {
  const [r, g, b] = color
  const cx = x + size / 2
  const s = size

  if (type === 'phone') {
    // Classic diagonal handset: thick rounded stroke between ear (top-right) and mouth (bottom-left)
    const earX = x + s * 0.65
    const earY = y + s * 0.20
    const mouthX = x + s * 0.35
    const mouthY = y + s * 0.80
    pdf.setDrawColor(r, g, b)
    pdf.setLineCap('round')
    pdf.setLineWidth(s * 0.28)
    pdf.line(earX, earY, mouthX, mouthY)
    pdf.setLineCap('butt')
  } else if (type === 'pin') {
    // Filled teardrop: circle + converging triangle + white inner dot
    const pinR = s * 0.34
    const pinCy = y + s * 0.38
    pdf.setFillColor(r, g, b)
    pdf.circle(cx, pinCy, pinR, 'F')
    const triLeft = cx - pinR * 0.75
    const triRight = cx + pinR * 0.75
    const triTop = pinCy + pinR * 0.45
    const triTip = y + s * 0.95
    pdf.lines(
      [[triRight - triLeft, 0], [cx - triRight, triTip - triTop]],
      triLeft, triTop,
      [1, 1], 'F', true
    )
    pdf.setFillColor(255, 255, 255)
    pdf.circle(cx, pinCy, pinR * 0.40, 'F')
  } else {
    // Person: filled circle (head) + filled half-ellipse (bust/shoulders)
    pdf.setFillColor(r, g, b)
    pdf.circle(cx, y + s * 0.27, s * 0.20, 'F')
    pdf.ellipse(cx, y + s * 0.80, s * 0.34, s * 0.23, 'F')
  }

  // Restore safe drawing defaults so subsequent PDF operations aren't affected
  pdf.setLineWidth(0.4)
  pdf.setDrawColor(0, 0, 0)
  pdf.setFillColor(0, 0, 0)
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
