<script setup lang="ts">
import type { EmergencyContact } from '@/types/ice'

const props = defineProps<{
  modelValue: EmergencyContact[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: EmergencyContact[]]
}>()

const localData = ref<EmergencyContact[]>(props.modelValue || [])
const contactToDelete = ref<number | null>(null)
const isDialogOpen = ref(false)

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

const confirmDelete = (index: number) => {
  contactToDelete.value = index
  isDialogOpen.value = true
}

const handleDeleteConfirm = () => {
  if (contactToDelete.value !== null) {
    localData.value.splice(contactToDelete.value, 1)
    emitUpdate()
    contactToDelete.value = null
  }
}

const handleDeleteCancel = () => {
  contactToDelete.value = null
}

const emitUpdate = () => {
  emit('update:modelValue', [...localData.value])
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  localData.value = newValue || []
}, { deep: true })

const contactColors = ['blue', 'rose', 'violet', 'amber', 'cyan', 'emerald'] as const
const getContactColor = (index: number) => contactColors[index % contactColors.length]
</script>

<template>
  <div class="space-y-4">
    <!-- Add contact button -->
    <div class="flex justify-end">
      <UButton
        icon="i-lucide-plus"
        size="sm"
        color="primary"
        @click="addContact"
      >
        {{ $t('form.addContact') }}
      </UButton>
    </div>

    <!-- Empty state -->
    <div v-if="localData.length === 0" class="text-center py-8">
      <div class="w-12 h-12 rounded-xl bg-[var(--ui-bg-elevated)] border border-[var(--ui-border)] flex items-center justify-center mx-auto mb-3">
        <UIcon name="i-lucide-user-plus" class="w-5 h-5 text-[var(--ui-text-dimmed)]"></UIcon>
      </div>
      <p class="text-sm text-[var(--ui-text-dimmed)]">{{ $t('form.noContacts') }}</p>
    </div>

    <!-- Contact cards -->
    <div
      v-for="(contact, index) in localData"
      :key="contact.id"
      class="contact-card rounded-xl p-4 space-y-4"
    >
      <!-- Contact header: number badge + delete -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <div
            class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            :class="{
              'bg-blue-500/15': getContactColor(index) === 'blue',
              'bg-rose-500/15': getContactColor(index) === 'rose',
              'bg-violet-500/15': getContactColor(index) === 'violet',
              'bg-amber-500/15': getContactColor(index) === 'amber',
              'bg-cyan-500/15': getContactColor(index) === 'cyan',
              'bg-emerald-500/15': getContactColor(index) === 'emerald'
            }"
          >
            <span
              class="text-[10px] font-extrabold"
              :class="{
                'text-blue-500 dark:text-blue-400': getContactColor(index) === 'blue',
                'text-rose-500 dark:text-rose-400': getContactColor(index) === 'rose',
                'text-violet-500 dark:text-violet-400': getContactColor(index) === 'violet',
                'text-amber-500 dark:text-amber-400': getContactColor(index) === 'amber',
                'text-cyan-500 dark:text-cyan-400': getContactColor(index) === 'cyan',
                'text-emerald-500 dark:text-emerald-400': getContactColor(index) === 'emerald'
              }"
            >{{ index + 1 }}</span>
          </div>
          <span class="text-xs font-bold text-[var(--ui-text-muted)] uppercase tracking-wider">
            {{ $t('form.contact') }} {{ index + 1 }}
          </span>
        </div>
        <UButton
          icon="i-lucide-trash-2"
          size="xs"
          color="error"
          variant="ghost"
          @click="confirmDelete(index)"
        ></UButton>
      </div>

      <!-- Fields grid -->
      <div class="grid grid-cols-12 gap-4">
        <UFormField
          :label="$t('form.contactName')"
          :name="`contact-name-${index}`"
          required
          class="col-span-12 sm:col-span-6 md:col-span-3"
        >
          <UInput
            v-model="contact.name"
            :placeholder="$t('form.contactNamePlaceholder')"
            size="lg"
            icon="i-lucide-user"
            @input="emitUpdate"
          ></UInput>
        </UFormField>

        <UFormField
          :label="$t('form.relationship')"
          :name="`relationship-${index}`"
          required
          class="col-span-12 sm:col-span-6 md:col-span-3"
        >
          <UInput
            v-model="contact.relationship"
            :placeholder="$t('form.relationshipPlaceholder')"
            size="lg"
            icon="i-lucide-heart"
            @input="emitUpdate"
          ></UInput>
        </UFormField>

        <UFormField
          :label="$t('form.phone')"
          :name="`phone-${index}`"
          required
          class="col-span-12 sm:col-span-6 md:col-span-3"
        >
          <UInput
            v-model="contact.phone"
            type="tel"
            :placeholder="$t('form.phonePlaceholder')"
            size="lg"
            icon="i-lucide-phone"
            @input="emitUpdate"
          ></UInput>
        </UFormField>

        <UFormField
          :label="$t('form.email')"
          :name="`email-${index}`"
          class="col-span-12 sm:col-span-6 md:col-span-3"
        >
          <UInput
            v-model="contact.email"
            type="email"
            :placeholder="$t('form.emailPlaceholder')"
            size="lg"
            icon="i-lucide-mail"
            @input="emitUpdate"
          ></UInput>
        </UFormField>
      </div>
    </div>
  </div>

  <DialogCancel
    v-model:open="isDialogOpen"
    @confirm="handleDeleteConfirm"
    @cancel="handleDeleteCancel"
  ></DialogCancel>
</template>

<style scoped>
.contact-card {
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: border-color 0.2s;
}

.dark .contact-card {
  background: rgba(255, 255, 255, 0.025);
  border-color: rgba(255, 255, 255, 0.05);
}

.contact-card:hover {
  border-color: rgba(0, 0, 0, 0.08);
}

.dark .contact-card:hover {
  border-color: rgba(255, 255, 255, 0.08);
}
</style>
