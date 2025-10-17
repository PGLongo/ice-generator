/**
 * Composable for formatting hrefs (tel:, mailto:, etc.)
 * Used for creating clickable links in templates
 */
export function useHref() {
  /**
   * Format a phone number for href (tel: protocol)
   * Removes all spaces from the phone number
   * @param phone - Phone number to format
   * @returns Formatted tel: URL or empty string if no phone
   */
  const tel = (phone?: string | null): string => {
    if (!phone) return ''
    return `tel:${phone.replace(/\s+/g, '')}`
  }

  /**
   * Format an email address for href (mailto: protocol)
   * @param email - Email address to format
   * @param subject - Optional email subject
   * @param body - Optional email body
   * @returns Formatted mailto: URL or empty string if no email
   */
  const mailto = (email?: string | null, subject?: string, body?: string): string => {
    if (!email) return ''
    let mailtoUrl = `mailto:${email}`
    const params = new URLSearchParams()
    if (subject) params.append('subject', subject)
    if (body) params.append('body', body)
    const queryString = params.toString()
    if (queryString) mailtoUrl += `?${queryString}`
    return mailtoUrl
  }

  return {
    tel,
    mailto
  }
}
