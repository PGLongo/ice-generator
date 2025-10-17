import QRCode from 'qrcode'
import type { QRCodeToDataURLOptions } from 'qrcode'

export type QRCodeValue = string | Ref<string | undefined | null> | ComputedRef<string | undefined | null>

export type QRCodeOptions = QRCodeToDataURLOptions

/**
 * Composable for generating QR codes using the qrcode library
 * Provides unified API for both reactive and static QR code generation
 */
export function useQRCode() {
  const { tel, mailto } = useHref()

  /**
   * Internal function to generate QR code from string value
   */
  const generateFromString = async (
    value: string,
    options?: QRCodeToDataURLOptions
  ): Promise<string> => {
    const defaultOptions: QRCodeToDataURLOptions = {
      width: 512,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    }

    return await QRCode.toDataURL(value, { ...defaultOptions, ...options })
  }

  /**
   * Generate a QR code (static or reactive based on input type)
   * @param value - String value or reactive reference
   * @param options - QR code generation options (including reactive flag)
   * @returns Promise<string> or Ref<string> depending on input
   */
  function generateQRCode(value: string, options?: QRCodeOptions): Promise<string>
  function generateQRCode(value: Ref<string | undefined | null> | ComputedRef<string | undefined | null>, options?: QRCodeOptions): Ref<string>
  function generateQRCode(value: QRCodeValue, options?: QRCodeOptions): Promise<string> | Ref<string> {
    // If value is a ref/computed, generate reactive QR code
    if (isRef(value)) {
      const qrCodeDataUrl = ref('')

      watch(
        value,
        async (newValue) => {
          if (newValue) {
            try {
              qrCodeDataUrl.value = await generateFromString(newValue, options)
            } catch (error) {
              console.error('Failed to generate QR code:', error)
              qrCodeDataUrl.value = ''
            }
          } else {
            qrCodeDataUrl.value = ''
          }
        },
        { immediate: true }
      )

      return qrCodeDataUrl
    }

    // Otherwise, generate static QR code
    return generateFromString(value, options)
  }

  /**
   * Generate a QR code for a phone number (tel: protocol)
   * @param phone - Phone number or reactive reference to phone number
   * @param options - QR code generation options
   * @returns Promise<string> or Ref<string> depending on input
   */
  function generatePhoneQR(phone: string, options?: QRCodeOptions): Promise<string>
  function generatePhoneQR(phone: Ref<string | undefined | null> | ComputedRef<string | undefined | null>, options?: QRCodeOptions): Ref<string>
  function generatePhoneQR(phone: QRCodeValue, options?: QRCodeOptions): Promise<string> | Ref<string> {
    if (isRef(phone)) {
      const telValue = computed(() => tel(phone.value))
      return generateQRCode(telValue, options)
    }
    return generateQRCode(tel(phone), options)
  }

  /**
   * Generate a QR code for an email address (mailto: protocol)
   * @param email - Email address or reactive reference to email
   * @param subject - Optional email subject
   * @param body - Optional email body
   * @param options - QR code generation options
   * @returns Promise<string> or Ref<string> depending on input
   */
  function generateEmailQR(
    email: string,
    subject?: string,
    body?: string,
    options?: QRCodeOptions
  ): Promise<string>
  function generateEmailQR(
    email: Ref<string | undefined | null> | ComputedRef<string | undefined | null>,
    subject?: string,
    body?: string,
    options?: QRCodeOptions
  ): Ref<string>
  function generateEmailQR(
    email: QRCodeValue,
    subject?: string,
    body?: string,
    options?: QRCodeOptions
  ): Promise<string> | Ref<string> {
    if (isRef(email)) {
      const mailtoValue = computed(() => mailto(email.value, subject, body))
      return generateQRCode(mailtoValue, options)
    }
    return generateQRCode(mailto(email, subject, body), options)
  }

  return {
    generateQRCode,
    generatePhoneQR,
    generateEmailQR
  }
}
