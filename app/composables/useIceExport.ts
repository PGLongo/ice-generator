import type { IceData } from '@/stores/ice'

export const useIceExport = () => {
  const generateHTML = (data: IceData): string => {
    const {
      name,
      age,
      bloodType: rawBloodType,
      allergies = [],
      medicalConditions = [],
      currentMedications = [],
      medicalNotes = '',
      emergencyContacts = [],
      primaryDoctor = '',
      insuranceInfo = '',
      specialInstructions = ''
    } = data

    // Handle bloodType - could be string or object with value property
    const bloodType = typeof rawBloodType === 'object' && rawBloodType !== null
      ? (rawBloodType as { value?: string }).value || ''
      : rawBloodType || ''

    // Helper to render list items
    const renderList = (items: string[]) => {
      if (!items || items.length === 0) return '<div class="form-value">None</div>'
      return `<ul class="list-disc list-inside space-y-1">${items.map(item => `<li class="form-value">${item}</li>`).join('')}</ul>`
    }

    // HTML with Nuxt UI-like styling
    const html = `<!DOCTYPE html>
<html lang="en" class="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ICE - ${name}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    :root {
      --gray-50: rgb(249 250 251);
      --gray-100: rgb(243 244 246);
      --gray-200: rgb(229 231 235);
      --gray-300: rgb(209 213 219);
      --gray-400: rgb(156 163 175);
      --gray-500: rgb(107 114 128);
      --gray-600: rgb(75 85 99);
      --gray-700: rgb(55 65 81);
      --gray-800: rgb(31 41 55);
      --gray-900: rgb(17 24 39);
      --gray-950: rgb(3 7 18);
      --green-500: #00C16A;
    }
    html {
      background: var(--gray-50);
      color: var(--gray-900);
    }
    body {
      font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      -webkit-font-smoothing: antialiased;
      line-height: 1.5;
      padding: 3rem 1rem;
    }
    .container {
      max-width: 42rem;
      margin: 0 auto;
    }
    .page-header {
      margin-bottom: 2rem;
      text-align: center;
    }
    .page-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--gray-600);
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .person-name {
      font-size: 3rem;
      font-weight: 700;
      color: var(--gray-900);
      margin-bottom: 0.5rem;
      letter-spacing: -0.025em;
    }
    .page-description {
      font-size: 1rem;
      color: var(--gray-500);
    }
    .card {
      background: white;
      border: 1px solid var(--gray-200);
      border-radius: 0.75rem;
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
      padding: 1.5rem;
    }
    .form-fields {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    .form-field {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .form-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--gray-900);
      display: block;
    }
    .form-value {
      width: 100%;
      padding: 0.625rem 0.875rem;
      background: var(--gray-50);
      border: 1px solid var(--gray-300);
      border-radius: 0.5rem;
      font-size: 1.125rem;
      color: var(--gray-900);
      font-weight: 500;
    }
    .section {
      margin-bottom: 2rem;
    }
    .section-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--gray-900);
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--gray-200);
    }
    .contact-card {
      background: var(--gray-50);
      border: 1px solid var(--gray-200);
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .contact-header {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--gray-900);
      margin-bottom: 0.75rem;
    }
    ul {
      padding-left: 1.5rem;
    }
    ul li {
      padding: 0.25rem 0;
    }
    a {
      color: var(--green-500);
      text-decoration: none;
      font-weight: 600;
    }
    a:hover {
      text-decoration: underline;
    }
    .primary-contacts {
      margin-bottom: 2rem;
    }
    .call-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 1rem 1.5rem;
      background: var(--green-500);
      color: white;
      text-decoration: none;
      border-radius: 0.75rem;
      font-size: 1.5rem;
      font-weight: 700;
      width: 100%;
      margin-top: 0.5rem;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      transition: all 0.2s;
    }
    .call-button:hover {
      background: #00A155;
      box-shadow: 0 6px 8px -1px rgba(0, 0, 0, 0.15);
      transform: translateY(-2px);
    }
    .call-button:active {
      transform: translateY(0);
    }
    .call-icon {
      font-size: 1.5rem;
    }
    .email-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.375rem;
      padding: 0.625rem 1rem;
      background: white;
      color: var(--green-500);
      text-decoration: none;
      border: 2px solid var(--green-500);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      width: 100%;
      margin-top: 0.75rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .email-button:hover {
      background: var(--green-500);
      color: white;
      transform: translateY(-1px);
    }
    .email-icon {
      font-size: 1rem;
    }
    .primary-contact-card {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
      border: 2px solid var(--green-500);
      border-radius: 0.75rem;
      padding: 1.5rem;
      margin-bottom: 1rem;
    }
    .contact-priority-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }
    .contact-priority {
      display: inline-block;
      background: var(--green-500);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .emergency-notice {
      margin-top: 1.5rem;
      padding: 1rem;
      background: rgb(254 242 242);
      border: 1px solid rgb(254 226 226);
      border-radius: 0.5rem;
      color: rgb(127 29 29);
      font-size: 0.875rem;
      font-weight: 500;
      text-align: center;
    }
    .footer-text {
      margin-top: 1.5rem;
      text-align: center;
      font-size: 0.875rem;
      color: var(--gray-500);
    }
    @media (max-width: 640px) {
      body {
        padding: 1.5rem 1rem;
      }
      .page-title {
        font-size: 1.875rem;
      }
    }
    @media print {
      html {
        background: white;
      }
      body {
        padding: 0;
      }
      .card {
        border: none;
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="page-header">
      <h1 class="page-title">🆘 In Case of Emergency</h1>
      <div class="person-name">${name}</div>
      <p class="page-description">${age} years old ${bloodType ? `• Blood Type: ${bloodType}` : ''}</p>
    </div>

    <div class="card">
      <div class="emergency-notice">
        ⚠️ EMERGENCY CONTACT INFORMATION - For medical personnel use only
      </div>

      <!-- Primary Emergency Contacts (First 2) -->
      ${emergencyContacts.length > 0 ? `
      <div class="primary-contacts">
        <h2 class="section-title">📞 Emergency Contacts - CALL IMMEDIATELY</h2>
        ${emergencyContacts.slice(0, 2).map((contact, index) => `
        <div class="primary-contact-card">
          <div class="contact-priority-row">
            <div class="contact-priority">${index === 0 ? 'PRIMARY CONTACT' : 'SECONDARY CONTACT'} • ${contact.relationship}</div>
            <div class="contact-header">${contact.name}</div>
          </div>
          <a href="tel:${contact.phone.replace(/\s+/g, '')}" class="call-button">
            <span class="call-icon">📱</span>
            <span>CALL ${contact.phone}</span>
          </a>
          ${contact.email ? `
          <a href="mailto:${contact.email}" class="email-button">
            <span class="email-icon">✉️</span>
            <span>EMAIL ${contact.name.split(' ')[0].toUpperCase()}</span>
          </a>
          ` : ''}
        </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- Personal Information Details -->
      <div class="section">
        <h2 class="section-title">Personal Information</h2>
        <div class="form-fields">
          <div class="form-field">
            <label class="form-label">Full Name</label>
            <div class="form-value">${name}</div>
          </div>

          <div class="form-field">
            <label class="form-label">Age</label>
            <div class="form-value">${age} years old</div>
          </div>

          ${bloodType ? `
          <div class="form-field">
            <label class="form-label">Blood Type</label>
            <div class="form-value">${bloodType}</div>
          </div>
          ` : ''}
        </div>
      </div>

      <!-- Medical Information -->
      ${allergies.length > 0 || medicalConditions.length > 0 || currentMedications.length > 0 || medicalNotes ? `
      <div class="section">
        <h2 class="section-title">Medical Information</h2>
        <div class="form-fields">
          ${allergies.length > 0 ? `
          <div class="form-field">
            <label class="form-label">Allergies</label>
            ${renderList(allergies)}
          </div>
          ` : ''}

          ${medicalConditions.length > 0 ? `
          <div class="form-field">
            <label class="form-label">Medical Conditions</label>
            ${renderList(medicalConditions)}
          </div>
          ` : ''}

          ${currentMedications.length > 0 ? `
          <div class="form-field">
            <label class="form-label">Current Medications</label>
            ${renderList(currentMedications)}
          </div>
          ` : ''}

          ${medicalNotes ? `
          <div class="form-field">
            <label class="form-label">Medical Notes</label>
            <div class="form-value">${medicalNotes}</div>
          </div>
          ` : ''}
        </div>
      </div>
      ` : ''}

      <!-- Additional Emergency Contacts (3+) -->
      ${emergencyContacts.length > 2 ? `
      <div class="section">
        <h2 class="section-title">Additional Emergency Contacts</h2>
        ${emergencyContacts.slice(2).map((contact, index) => `
        <div class="contact-card">
          <div class="contact-header">Contact ${index + 3}: ${contact.name}</div>
          <div class="form-fields">
            <div class="form-field">
              <label class="form-label">Relationship</label>
              <div class="form-value">${contact.relationship}</div>
            </div>
            <div class="form-field">
              <label class="form-label">Phone</label>
              <div class="form-value">
                <a href="tel:${contact.phone.replace(/\s+/g, '')}">${contact.phone}</a>
              </div>
            </div>
            ${contact.email ? `
            <div class="form-field">
              <label class="form-label">Email</label>
              <div class="form-value">
                <a href="mailto:${contact.email}">${contact.email}</a>
              </div>
            </div>
            ` : ''}
          </div>
        </div>
        `).join('')}
      </div>
      ` : ''}

      <!-- Additional Information -->
      ${primaryDoctor || insuranceInfo || specialInstructions ? `
      <div class="section">
        <h2 class="section-title">Additional Information</h2>
        <div class="form-fields">
          ${primaryDoctor ? `
          <div class="form-field">
            <label class="form-label">Primary Doctor</label>
            <div class="form-value">${primaryDoctor}</div>
          </div>
          ` : ''}

          ${insuranceInfo ? `
          <div class="form-field">
            <label class="form-label">Insurance Information</label>
            <div class="form-value">${insuranceInfo}</div>
          </div>
          ` : ''}

          ${specialInstructions ? `
          <div class="form-field">
            <label class="form-label">Special Instructions</label>
            <div class="form-value">${specialInstructions}</div>
          </div>
          ` : ''}
        </div>
      </div>
      ` : ''}
    </div>

    <p class="footer-text">
      Generated on ${new Date().toLocaleDateString()} • Keep this information updated
    </p>
  </div>
</body>
</html>`

    return html
  }

  const downloadHTML = (data: IceData) => {
    const html = generateHTML(data)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const filename = `ICE-${data.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.html`

    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return {
    generateHTML,
    downloadHTML
  }
}
