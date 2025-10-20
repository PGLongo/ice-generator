<script setup lang="ts">
const props = defineProps<{
  open?: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
  cancel: []
}>()

const isOpen = computed({
  get: () => props.open ?? false,
  set: (value) => emit('update:open', value)
})

const handleConfirm = () => {
  emit('confirm')
  isOpen.value = false
}

const handleCancel = () => {
  emit('cancel')
  isOpen.value = false
}
</script>

<template>
  <UModal v-model:open="isOpen">
    <template #header>
      <slot name="title">
        {{ $t('dialog.confirmDelete') }}
      </slot>
    </template>

    <template #body>
      <slot name="message">
        <div class="space-y-2">
          <p>{{ $t('dialog.confirmDeleteMessage') }}</p>
          <p class="text-sm text-gray-500">{{ $t('dialog.confirmDeleteMessageWarning') }}</p>
        </div>
      </slot>
    </template>

    <template #footer="{ close }">
      <div class="flex justify-end gap-3">
        <UButton
          color="neutral"
          variant="outline"
          @click="() => { handleCancel(); close() }"
        >
          {{ $t('dialog.cancel') }}
        </UButton>
        <UButton
          color="error"
          @click="() => { handleConfirm(); close() }"
        >
          {{ $t('dialog.delete') }}
        </UButton>
      </div>
    </template>
  </UModal>
</template>
