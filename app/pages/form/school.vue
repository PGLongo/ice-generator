<script setup lang="ts">
import { useSchoolFormStore } from '@/stores/school-form'

const { t } = useI18n()
const toast = useToast()
const schoolFormStore = useSchoolFormStore()

// Reset dialog reference
const resetDialog = ref()

// Open reset confirmation modal
const openResetModal = () => {
  resetDialog.value?.show()
}

// Reset form - clear store (after confirmation)
const handleResetConfirm = () => {
  schoolFormStore.clearAll()
  resetDialog.value?.hide()
  toast.add({
    title: t('form.success'),
    description: 'All data has been reset',
    color: 'success'
  })
}

// Generate cards for all people
const generateCardsForAll = () => {
  if (!schoolFormStore.hasPeople) {
    toast.add({
      title: 'Error',
      description: 'Please add at least one person to the list',
      color: 'error'
    })
    return
  }

  // TODO: Implement card generation logic
  toast.add({
    title: 'Feature coming soon',
    description: 'Card generation will be implemented soon',
    color: 'info'
  })
}
</script>

<template>
  <UContainer class="py-12">
    <div class="max-w-4xl mx-auto">
      <UCard>
        <div class="space-y-8">
          <div class="text-center space-y-2">
            <h1 class="text-3xl font-bold">School Form</h1>
            <p class="text-gray-600">Create emergency cards for your school</p>
          </div>

          <USeparator />

          <!-- School Information Section (temporarily inline, will use FormSchoolInfo after refactoring) -->
          <div class="space-y-6">
            <div class="flex items-center gap-2 mb-6">
              <div class="w-1 h-6 bg-primary rounded-full"></div>
              <h3 class="text-lg font-semibold">
                School Information
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div class="md:col-span-8">
                <UFormField
                  label="School Name"
                  name="schoolName"
                  class="w-full"
                >
                  <UInput
                    v-model="schoolFormStore.data.school.name"
                    placeholder="Enter school name"
                    size="xl"
                    icon="i-heroicons-academic-cap"
                    class="w-full"
                  />
                </UFormField>
              </div>

              <div class="md:col-span-4">
                <UFormField
                  label="Phone"
                  name="schoolPhone"
                  class="w-full"
                >
                  <UInput
                    v-model="schoolFormStore.data.school.phone"
                    type="tel"
                    placeholder="Phone number"
                    size="xl"
                    icon="i-heroicons-phone"
                    class="w-full"
                  />
                </UFormField>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UFormField
                label="Address"
                name="schoolAddress"
                class="w-full"
              >
                <UInput
                  v-model="schoolFormStore.data.school.address"
                  placeholder="Street address"
                  size="xl"
                  icon="i-heroicons-map-pin"
                  class="w-full"
                />
              </UFormField>

              <UFormField
                label="City"
                name="schoolCity"
                class="w-full"
              >
                <UInput
                  v-model="schoolFormStore.data.school.city"
                  placeholder="City"
                  size="xl"
                  icon="i-heroicons-building-office"
                  class="w-full"
                />
              </UFormField>
            </div>
          </div>

          <USeparator />

          <!-- People List Section -->
          <FormPeopleList v-model="schoolFormStore.data.people" />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            <!-- Primary Action -->
            <UButton
              type="button"
              size="xl"
              block
              icon="i-heroicons-document-duplicate"
              :disabled="!schoolFormStore.hasPeople"
              @click="generateCardsForAll"
              class="col-span-full md:col-span-1"
            >
              Generate Cards for All ({{ schoolFormStore.peopleCount }})
            </UButton>

            <!-- Secondary Actions -->
            <UButton
              type="button"
              size="xl"
              color="neutral"
              variant="outline"
              icon="i-heroicons-arrow-path"
              block
              @click="openResetModal"
              class="col-span-full md:col-span-1"
            >
              Reset All
            </UButton>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Reset Confirmation Modal -->
    <DialogCancel
      ref="resetDialog"
      @confirm="handleResetConfirm"
    >
      <template #title>
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-amber-500" />
          <span>Confirm Reset</span>
        </div>
      </template>

      <template #message>
        <div class="space-y-2">
          <p>Are you sure you want to reset all school form data?</p>
          <p class="text-sm text-gray-500">This action cannot be undone.</p>
        </div>
      </template>
    </DialogCancel>
  </UContainer>
</template>
