<script setup lang="ts">
interface Props {
  open?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
  cancel: []
}>()

const { t } = useI18n()

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}

// Reference to DialogBase for method forwarding
const dialogBaseRef = ref()

// Exposed methods for imperative usage
const show = () => {
  dialogBaseRef.value?.show()
}

const hide = () => {
  dialogBaseRef.value?.hide()
}

defineExpose({
  show,
  hide
})
</script>

<template>
  <DialogBase
    ref="dialogBaseRef"
    :open="open"
    @update:open="(value: boolean) => emit('update:open', value)"
    :title="t('dialog.confirmDelete')"
    :confirm-text="t('dialog.delete')"
    :cancel-text="t('dialog.cancel')"
    confirm-color="error"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <template #message>
      <slot name="message">
        <div class="space-y-2">
          <p>{{ t('dialog.confirmDeleteMessage') }}</p>
          <p class="text-sm text-gray-500">{{ t('dialog.confirmDeleteMessageWarning') }}</p>
        </div>
      </slot>
    </template>

    <template #title>
      <slot name="title" ></slot>
    </template>
  </DialogBase>
</template>
