<script setup>
import { ref } from 'vue'

import site from '@/config/site'
import useEmailJS, { isConfigured } from '@/composables/useEmailJS'
import useServices from '@/composables/useServices'
import AppIcon from '@/components/ui/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps({
  /**
   * Preselects the service picker. Set when the form is opened from a service
   * detail page, so the visitor isn't asked something the page already knows.
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
  Deliberately frame-less: the surrounding surface (currently the contact modal)
  owns the border, background, and padding. Keeps the form reusable if it ever
  needs to sit inline on a page again.
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
  <v-form v-else ref="formRef" novalidate @submit.prevent="submit">
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

    <div class="grid gap-x-5 sm:grid-cols-2">
      <v-text-field
        v-model="form.name"
        label="Name"
        autocomplete="name"
        :rules="[rules.required]"
        :disabled="!isConfigured"
      />
      <v-text-field
        v-model="form.email"
        label="Email"
        type="email"
        autocomplete="email"
        :rules="[rules.required, rules.email]"
        :disabled="!isConfigured"
      />
      <v-text-field
        v-model="form.phone"
        label="Phone (optional)"
        type="tel"
        autocomplete="tel"
        :rules="[rules.phone]"
        :disabled="!isConfigured"
      />
      <v-select
        v-model="form.service"
        label="What do you need?"
        :items="serviceOptions"
        :rules="[rules.required]"
        :disabled="!isConfigured"
      />
    </div>

    <!--
      Guidance goes in a persistent hint, not a placeholder. Vuetify renders a
      textarea's placeholder underneath its resting label, so the two sat on top
      of each other and neither could be read.
    -->
    <v-textarea
      v-model="form.message"
      label="Tell us about the job"
      hint="Rough size, timing, and anything you already know about what's involved."
      persistent-hint
      rows="5"
      :rules="[rules.required, rules.message]"
      :disabled="!isConfigured"
    />

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
      class="mb-6 flex items-start gap-3 border-l-2 border-error bg-error/8 px-4 py-3 text-sm text-spruce"
      role="alert"
    >
      <AppIcon name="alert" :size="18" class="mt-0.5 text-error" />
      <p>{{ error }}</p>
    </div>

    <BaseButton
      type="submit"
      size="lg"
      :disabled="loading || !isConfigured"
      block
      :arrow="!loading"
    >
      {{ loading ? 'Sending…' : 'Send message' }}
    </BaseButton>

    <p class="mt-5 text-center text-stone">
      Or call
      <a :href="site.phoneHref" class="font-medium text-ember-deep underline underline-offset-4">
        {{ site.phone }}
      </a>
    </p>
  </v-form>
</template>
