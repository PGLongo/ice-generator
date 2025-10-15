<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <div class="w-1 h-6 bg-primary rounded-full" />
        <h3 class="text-lg font-semibold">
          {{ $t('form.emergencyContacts') }}
        </h3>
      </div>
      <UButton
        icon="i-heroicons-plus"
        size="sm"
        color="primary"
        @click="addContact"
      >
        {{ $t('form.addContact') }}
      </UButton>
    </div>

    <div v-if="localData.length === 0" class="text-center py-8 text-gray-500">
      <p>{{ $t('form.noContacts') }}</p>
    </div>

    <div v-for="(contact, index) in localData" :key="contact.id" class="space-y-4 p-4 border border-gray-200 rounded-lg">
      <div class="flex items-center justify-between">
        <span class="font-medium text-sm text-gray-700">
          {{ $t('form.contact') }} {{ index + 1 }}
        </span>
        <UButton
          icon="i-heroicons-trash"
          size="xs"
          color="red"
          variant="ghost"
          @click="removeContact(index)"
        />
      </div>

      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-3">
          <UFormField
            :label="$t('form.contactName')"
            :name="`contact-name-${index}`"
            required
            class="w-full"
          >
            <UInput
              v-model="contact.name"
              :placeholder="$t('form.contactNamePlaceholder')"
              size="lg"
              icon="i-heroicons-user"
              class="w-full"
              @input="emitUpdate"
            />
          </UFormField>
        </div>

        <div class="col-span-12 md:col-span-3">
          <UFormField
            :label="$t('form.relationship')"
            :name="`relationship-${index}`"
            required
            class="w-full"
          >
            <UInput
              v-model="contact.relationship"
              :placeholder="$t('form.relationshipPlaceholder')"
              size="lg"
              icon="i-heroicons-heart"
              class="w-full"
              @input="emitUpdate"
            />
          </UFormField>
        </div>

        <div class="col-span-12 md:col-span-3">
          <UFormField
            :label="$t('form.phone')"
            :name="`phone-${index}`"
            required
            class="w-full"
          >
            <UInput
              v-model="contact.phone"
              type="tel"
              :placeholder="$t('form.phonePlaceholder')"
              size="lg"
              icon="i-heroicons-phone"
              class="w-full"
              @input="emitUpdate"
            />
          </UFormField>
        </div>

        <div class="col-span-12 md:col-span-3">
          <UFormField
            :label="$t('form.email')"
            :name="`email-${index}`"
            class="w-full"
          >
            <UInput
              v-model="contact.email"
              type="email"
              :placeholder="$t('form.emailPlaceholder')"
              size="lg"
              icon="i-heroicons-envelope"
              class="w-full"
              @input="emitUpdate"
            />
          </UFormField>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EmergencyContact } from '@/stores/ice'

const { t } = useI18n()

const props = defineProps<{
  modelValue: EmergencyContact[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: EmergencyContact[]]
}>()

const localData = ref<EmergencyContact[]>(props.modelValue || [])

const addContact = () => {
  const newContact: EmergencyContact = {
    id: crypto.randomUUID(),
    name: '',
    relationship: '',
    phone: '',
    email: ''
  }
  localData.value.push(newContact)
  emitUpdate()
}

const removeContact = (index: number) => {
  localData.value.splice(index, 1)
  emitUpdate()
}

const emitUpdate = () => {
  emit('update:modelValue', [...localData.value])
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  localData.value = newValue || []
}, { deep: true })
</script>
