<script setup lang="ts">
import type { Person } from '@/types/school-form'

const props = defineProps<{
  modelValue: Person[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Person[]]
}>()

const localData = ref<Person[]>(props.modelValue || [])
const newPersonName = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const toast = useToast()

const addPerson = () => {
  if (newPersonName.value.trim()) {
    const newPerson: Person = {
      id: crypto.randomUUID(),
      fullName: newPersonName.value.trim()
    }
    localData.value.push(newPerson)
    emitUpdate()
    newPersonName.value = ''
    toast.add({
      title: 'Person added',
      color: 'success'
    })
  }
}

const removePerson = (id: string) => {
  localData.value = localData.value.filter(p => p.id !== id)
  emitUpdate()
  toast.add({
    title: 'Person removed',
    color: 'success'
  })
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = (e) => {
    const content = e.target?.result as string
    const ext = file.name.split('.').pop()?.toLowerCase()

    if (ext === 'csv') {
      parseCsv(content)
    } else if (ext === 'xlsx') {
      // Will be implemented after Step 5
      toast.add({
        title: 'Excel files not yet supported',
        description: 'Please use CSV format for now',
        color: 'warning'
      })
    }
  }

  reader.onerror = () => {
    toast.add({
      title: 'Error reading file',
      description: 'Please try again',
      color: 'error'
    })
  }

  if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
    reader.readAsText(file)
  } else {
    reader.readAsBinaryString(file)
  }

  // Reset input
  target.value = ''
}

const parseCsv = (content: string) => {
  const lines = content.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)

  const importedPeople: Person[] = lines.map(line => ({
    id: crypto.randomUUID(),
    fullName: line
  }))

  localData.value.push(...importedPeople)
  emitUpdate()

  toast.add({
    title: 'File imported successfully',
    description: `${importedPeople.length} people added`,
    color: 'success'
  })
}

const clearAll = () => {
  localData.value = []
  emitUpdate()
  toast.add({
    title: 'All people removed',
    color: 'success'
  })
}

const emitUpdate = () => {
  emit('update:modelValue', [...localData.value])
}

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  localData.value = newValue || []
}, { deep: true })
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <div class="w-1 h-6 bg-primary rounded-full"></div>
        <h3 class="text-lg font-semibold">
          People List
        </h3>
      </div>
      <UButton
        v-if="localData.length > 0"
        icon="i-heroicons-trash"
        size="sm"
        color="error"
        variant="ghost"
        @click="clearAll"
      >
        Clear All
      </UButton>
    </div>

    <!-- Manual input section -->
    <div class="flex gap-2">
      <UFormField label="Add person manually" class="flex-1">
        <UInput
          v-model="newPersonName"
          placeholder="Full Name"
          size="lg"
          icon="i-heroicons-user-plus"
          @keyup.enter="addPerson"
        />
      </UFormField>
      <UButton
        icon="i-heroicons-plus"
        size="lg"
        color="primary"
        class="mt-6"
        @click="addPerson"
      >
        Add
      </UButton>
    </div>

    <!-- File upload section -->
    <div class="flex gap-2 items-center">
      <input
        ref="fileInput"
        type="file"
        accept=".csv,.xlsx"
        class="hidden"
        @change="handleFileUpload"
      >
      <UButton
        icon="i-heroicons-arrow-up-tray"
        size="lg"
        color="secondary"
        @click="fileInput?.click()"
      >
        Upload File (CSV/Excel)
      </UButton>
      <p class="text-sm text-gray-500">
        Upload a CSV or Excel file with one name per line
      </p>
    </div>

    <!-- People list -->
    <div v-if="localData.length === 0" class="text-center py-8 text-gray-500">
      <p>No people added yet</p>
    </div>

    <div v-else class="space-y-2">
      <p class="text-sm text-gray-600 font-medium">
        {{ localData.length }} {{ localData.length === 1 ? 'person' : 'people' }}
      </p>
      <div
        v-for="person in localData"
        :key="person.id"
        class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
      >
        <span class="font-medium">{{ person.fullName }}</span>
        <UButton
          icon="i-heroicons-trash"
          size="xs"
          color="error"
          variant="ghost"
          @click="removePerson(person.id)"
        />
      </div>
    </div>
  </div>
</template>
