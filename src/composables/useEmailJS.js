import { ref } from 'vue'
import emailjs from '@emailjs/browser'

import site from '@/config/site'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

/**
 * Whether the three EmailJS keys were present at build time.
 *
 * They come from `.env` locally and from GitHub Actions secrets in CI. If a
 * deploy is missing them the form would otherwise fail at submit time with an
 * opaque "public key is required" error, so check up front and tell the visitor
 * to call instead.
 */
export const isConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

if (!isConfigured && import.meta.env.DEV) {
  console.warn(
    '[useEmailJS] Missing VITE_EMAILJS_* environment variables. ' +
      'Copy .env.example to .env and fill in the values — the contact form is disabled until then.'
  )
}

export function useEmailJS() {
  const loading = ref(false)
  const success = ref(false)
  const error = ref(null)

  /**
   * @param {Record<string, string>} templateParams Must include `to_email`; the
   *   shared EmailJS template routes on it.
   */
  async function sendEmail(templateParams) {
    if (!isConfigured) {
      error.value = `The contact form isn't available right now. Please call ${site.phone}.`
      return false
    }

    loading.value = true
    success.value = false
    error.value = null

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY })
      success.value = true
      return true
    } catch (err) {
      // Phone number comes from config — never hardcode it into a string here.
      error.value = `That didn't send. Try again, or call ${site.phone} and we'll take the details over the phone.`
      console.error('[useEmailJS] send failed:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  function reset() {
    success.value = false
    error.value = null
  }

  return { loading, success, error, sendEmail, reset }
}

export default useEmailJS
