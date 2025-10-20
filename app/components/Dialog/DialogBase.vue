<script setup lang="ts">
interface Props {
  open?: boolean
  title?: string
  confirmText?: string
  cancelText?: string
  confirmColor?: 'primary' | 'error' | 'warning' | 'success' | 'neutral'
  confirmVariant?: 'solid' | 'outline' | 'soft' | 'ghost'
  cancelColor?: 'primary' | 'error' | 'warning' | 'success' | 'neutral'
  cancelVariant?: 'solid' | 'outline' | 'soft' | 'ghost'
  hideCancel?: boolean
  hideConfirm?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  title: '',
  confirmText: '',
  cancelText: '',
  confirmColor: 'primary',
  confirmVariant: 'solid',
  cancelColor: 'neutral',
  cancelVariant: 'outline',
  hideCancel: false,
  hideConfirm: false
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
  cancel: []
}>()

const isOpen = computed({
  get: () => props.open,
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

// Exposed methods for imperative usage
const show = () => {
  isOpen.value = true
}

const hide = () => {
  isOpen.value = false
}

defineExpose({
  show,
  hide
})
</script>

<template>
  <UModal v-model:open="isOpen">
    <template #header>
      <slot name="title">
        <span v-if="title">{{ title }}</span>
      </slot>
    </template>

    <template #body>
      <slot name="message" ></slot>
    </template>

    <template #footer="{ close }">
      <div class="flex justify-end gap-3">
        <UButton
          v-if="!hideCancel"
          :color="cancelColor"
          :variant="cancelVariant"
          @click="() => { handleCancel(); close() }"
        >
          <slot name="cancel-text">
            {{ cancelText || $t('dialog.cancel') }}
          </slot>
        </UButton>
        <UButton
          v-if="!hideConfirm"
          :color="confirmColor"
          :variant="confirmVariant"
          @click="() => { handleConfirm(); close() }"
        >
          <slot name="confirm-text">
            {{ confirmText || $t('dialog.confirm') }}
          </slot>
        </UButton>
      </div>
    </template>
  </UModal>
</template>
