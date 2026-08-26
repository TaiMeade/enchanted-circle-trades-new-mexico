<script setup>
import { ref } from 'vue'

import site from '@/config/site'
import useEmailJS, { isConfigured } from '@/composables/useEmailJS'
import useServices from '@/composables/useServices'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  /**
   * Preselects the service picker. Set when the form is opened from a trade
   * tile, so the visitor isn't asked something the page already knows.
   */
  service: { type: String, default: null },
})

const { serviceOptions } = useServices()
const { loading, success, error, sendEmail, reset } = useEmailJS()

const formRef = ref(null)
const blank = () => ({ name: '', email: '', phone: '', service: props.service, message: '' })
const form = ref(blank())

/**
 * Honeypot. Real people never see this field, so anything typed into it came
 * from a bot filling every input on the page. Submissions that trip it are
 * dropped silently — telling a bot it failed just teaches it to try again.
 */
const honeypot = ref('')

const rules = {
  required: (v) => (!!v && String(v).trim().length > 0) || 'This field is required.',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v ?? '') || 'Enter a valid email address.',
  phone: (v) =>
    !v || v.replace(/\D/g, '').length >= 10 || 'Enter a 10-digit phone number, or leave it blank.',
  message: (v) =>
    (!!v && v.trim().length >= 10) || 'A sentence or two about the job helps us quote it.',
}

async function submit() {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  if (honeypot.value) {
    success.value = true
    return
  }

  await sendEmail({
    // Recipient comes from config, so there is one place to change it.
    to_email: site.email,
    from_name: form.value.name,
    from_email: form.value.email,
    from_phone: form.value.phone || 'Not provided',
    service_type: form.value.service ?? 'Not specified',
    message: form.value.message,
  })
}

function sendAnother() {
  form.value = blank()
  formRef.value?.resetValidation()
  reset()
}
</script>

<!--
  ── On the field treatment ──

  Vuetify supplies the components — validation, error wiring, and the
  associations that make a screen reader announce this form correctly. What it
  does not supply is the look: an outlined Material field floats its label up
  into a notch cut through its own border, which is a Material signature and
  reads as a stranger on a page built out of hairlines, square corners and
  condensed caps.

  So the label is a real <label> above the field, set in the same eyebrow type
  as every section heading on the site, and the Vuetify field is given no
  `label` prop at all — no float, no notch, no reserved space. The id/for pair
  keeps the association Vuetify's own label would have provided.

  The rest is in the scoped block at the bottom: borders at the same hairline
  weight as the rest of the page, and the accent arriving only on the control
  being touched. Green is the mass, orange is the light.

  Deliberately frame-less: the surrounding surface (the contact modal) owns the
  border, background and padding, so this can sit inline on a page later.
-->
<template>
  <!-- Success state -->
  <div v-if="success" class="py-6 text-center">
    <AppIcon name="checkCircle" :size="44" class="mx-auto text-success" />
    <h3 class="type-display mt-6 text-2xl text-spruce">Message sent</h3>
    <p class="mx-auto mt-4 max-w-sm leading-relaxed text-pretty text-stone">
      Thanks — we'll get back to you shortly. If it's urgent, calling
      {{ site.phone }} is faster.
    </p>
    <BaseButton variant="outline" class="mt-8" @click="sendAnother">
      Send another message
    </BaseButton>
  </div>

  <!-- Form -->
  <v-form v-else ref="formRef" class="contact-form" novalidate @submit.prevent="submit">
    <div
      v-if="!isConfigured"
      class="mb-7 flex items-start gap-3 border-l-2 border-error bg-error/8 px-4 py-3 text-sm text-spruce"
      role="alert"
    >
      <AppIcon name="alert" :size="18" class="mt-0.5 text-error" />
      <p>
        The form isn't available right now. Please call
        <a :href="site.phoneHref" class="font-semibold underline">{{ site.phone }}</a>
        or email
        <a :href="`mailto:${site.email}`" class="font-semibold underline">{{ site.email }}</a>
        .
      </p>
    </div>

    <div class="grid gap-x-5 gap-y-5 sm:grid-cols-2">
      <div class="field">
        <label class="field-label type-label" for="cf-name">Name</label>
        <v-text-field
          id="cf-name"
          v-model="form.name"
          autocomplete="name"
          hide-details="auto"
          :rules="[rules.required]"
          :disabled="!isConfigured"
        />
      </div>

      <div class="field">
        <label class="field-label type-label" for="cf-email">Email</label>
        <v-text-field
          id="cf-email"
          v-model="form.email"
          type="email"
          placeholder="you@example.com"
          autocomplete="email"
          hide-details="auto"
          :rules="[rules.required, rules.email]"
          :disabled="!isConfigured"
        />
      </div>

      <div class="field">
        <label class="field-label type-label" for="cf-phone">
          Phone
          <span class="field-note">Optional</span>
        </label>
        <v-text-field
          id="cf-phone"
          v-model="form.phone"
          type="tel"
          placeholder="(575) 555-0100"
          autocomplete="tel"
          hide-details="auto"
          :rules="[rules.phone]"
          :disabled="!isConfigured"
        />
      </div>

      <div class="field">
        <label class="field-label type-label" for="cf-service">What do you need?</label>
        <v-select
          id="cf-service"
          v-model="form.service"
          placeholder="Pick a trade"
          :items="serviceOptions"
          :menu-props="{ contentClass: 'contact-form-menu' }"
          hide-details="auto"
          :rules="[rules.required]"
          :disabled="!isConfigured"
        />
      </div>
    </div>

    <div class="field mt-5">
      <label class="field-label type-label" for="cf-message">Tell us about the job</label>
      <p id="cf-message-help" class="field-help">
        Rough size, timing, and anything you already know about what's involved.
      </p>
      <v-textarea
        id="cf-message"
        v-model="form.message"
        aria-describedby="cf-message-help"
        rows="4"
        auto-grow
        hide-details="auto"
        :rules="[rules.required, rules.message]"
        :disabled="!isConfigured"
      />
    </div>

    <!-- Honeypot — off-screen, skipped by keyboard, hidden from screen readers. -->
    <div class="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden">
      <label for="ect-company">Company (leave this empty)</label>
      <input
        id="ect-company"
        v-model="honeypot"
        type="text"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
      />
    </div>

    <div
      v-if="error"
      class="mt-7 flex items-start gap-3 border-l-2 border-error bg-error/8 px-4 py-3 text-sm text-spruce"
      role="alert"
    >
      <AppIcon name="alert" :size="18" class="mt-0.5 text-error" />
      <p>{{ error }}</p>
    </div>

    <BaseButton
      type="submit"
      size="lg"
      class="mt-7"
      :disabled="loading || !isConfigured"
      block
      :arrow="!loading"
    >
      {{ loading ? 'Sending…' : 'Send message' }}
    </BaseButton>

    <p class="mt-5 text-center text-sm text-stone">
      Or call
      <a :href="site.phoneHref" class="font-medium text-ember-deep underline underline-offset-4">
        {{ site.phone }}
      </a>
    </p>
  </v-form>
</template>

<style scoped>
/* ── The label above the field ─────────────────────────────────────────── */

.field-label {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
  color: var(--color-spruce);
  transition: color 160ms ease;
}

/* The accent lands on the one control being used, and nowhere else. */
.field:focus-within .field-label {
  color: var(--color-ember-deep);
}

/* "Optional" — same line as the label, visibly subordinate to it. */
.field-note {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--color-stone);
}

.field-help {
  margin-top: -0.25rem;
  margin-bottom: 0.5rem;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--color-stone);
}

/* ── Vuetify's field internals ─────────────────────────────────────────── *
 * Unlayered scoped rules, so they outrank both the vuetify-* layers and the
 * plain `.v-field` block in styles/main.css on specificity.
 * ---------------------------------------------------------------------- */

.contact-form :deep(.v-field) {
  background-color: var(--color-snow);
  color: var(--color-spruce);
}

/*
 * Hairline borders. Vuetify draws an outlined field as separate __start,
 * __notch and __end pieces, each taking its border from `currentColor` on the
 * outline element — so the color is set once, on the parent.
 */
.contact-form :deep(.v-field__outline) {
  color: color-mix(in srgb, var(--color-spruce) 28%, transparent);
  --v-field-border-opacity: 1;
}

.contact-form :deep(.v-field:hover .v-field__outline) {
  color: color-mix(in srgb, var(--color-spruce) 55%, transparent);
}

/* Focus and error both take the border to full strength — 2px, from Vuetify. */
.contact-form :deep(.v-field--focused .v-field__outline) {
  color: var(--color-ember-deep);
}

.contact-form :deep(.v-input--error .v-field__outline) {
  color: var(--color-error);
}

/* 16px minimum, or iOS Safari zooms the viewport the moment a field is tapped. */
.contact-form :deep(.v-field__input) {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-spruce);
  padding-inline: 1rem;
  min-height: 3.5rem;
}

.contact-form :deep(textarea.v-field__input) {
  padding-block: 0.875rem;
  line-height: 1.6;
}

.contact-form :deep(input::placeholder),
.contact-form :deep(textarea::placeholder) {
  color: var(--color-stone);
  opacity: 0.75;
}

.contact-form :deep(.v-select__selection-text) {
  color: var(--color-spruce);
}

/*
 * Validation messages. `hide-details="auto"` means this box has no height until
 * a rule actually fails, so the resting form keeps one consistent rhythm set by
 * the grid rather than by Vuetify's reserved message space.
 */
.contact-form :deep(.v-input__details) {
  padding-inline: 0;
  min-height: 0;
  padding-top: 0.4375rem;
}

.contact-form :deep(.v-messages) {
  opacity: 1;
}

.contact-form :deep(.v-messages__message) {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  line-height: 1.45;
  letter-spacing: 0;
  color: var(--color-error);
}

.contact-form :deep(.v-input--disabled) {
  opacity: 0.5;
}
</style>
