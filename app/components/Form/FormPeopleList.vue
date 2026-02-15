<script setup lang="ts">
import * as XLSX from 'xlsx'
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
const { t } = useI18n()

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
      title: t('schoolForm.personAdded'),
      color: 'success'
    })
  }
}

const removePerson = (id: string) => {
  localData.value = localData.value.filter(p => p.id !== id)
  emitUpdate()
  toast.add({
    title: t('schoolForm.personRemoved'),
    color: 'success'
  })
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = (e) => {
    const content = e.target?.result
    const ext = file.name.split('.').pop()?.toLowerCase()

    if (ext === 'csv') {
      parseCsv(content as string)
    } else if (ext === 'xlsx') {
      parseExcel(content as string)
    }
  }

  reader.onerror = () => {
    toast.add({
      title: t('schoolForm.errorReadingFile'),
      description: t('schoolForm.errorReadingFileMessage'),
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
    title: t('schoolForm.fileImported'),
    description: t('schoolForm.peopleImported', { count: importedPeople.length }),
    color: 'success'
  })
}

const parseExcel = (content: string) => {
  try {
    const workbook = XLSX.read(content, { type: 'binary' })
    const firstSheetName = workbook.SheetNames[0]
    if (!firstSheetName) {
      throw new Error('No sheets found in Excel file')
    }
    const worksheet = workbook.Sheets[firstSheetName]
    if (!worksheet) {
      throw new Error('Sheet not found in Excel file')
    }

    // Convert to array of arrays
    const data = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 })

    // Filter empty rows and flatten to get all names
    const names: string[] = []
    data.forEach(row => {
      if (row && row.length > 0) {
        // Take first column value if exists and not empty
        const name = String(row[0] || '').trim()
        if (name) {
          names.push(name)
        }
      }
    })

    const importedPeople: Person[] = names.map(name => ({
      id: crypto.randomUUID(),
      fullName: name
    }))

    localData.value.push(...importedPeople)
    emitUpdate()

    toast.add({
      title: t('schoolForm.fileImported'),
      description: t('schoolForm.peopleImported', { count: importedPeople.length }),
      color: 'success'
    })
  } catch (error) {
    console.error('Error parsing Excel file:', error)
    toast.add({
      title: t('schoolForm.errorParsingExcel'),
      description: t('schoolForm.errorParsingExcelMessage'),
      color: 'error'
    })
  }
}

const clearAll = () => {
  localData.value = []
  emitUpdate()
  toast.add({
    title: t('schoolForm.allPeopleRemoved'),
    color: 'success'
  })
}

const emitUpdate = () => {
  emit('update:modelValue', [...localData.value])
}

// Table columns definition
const columns = [
  {
    key: 'fullName',
    label: t('schoolForm.fullName'),
    sortable: true
  },
  {
    key: 'actions',
    id: 'actions',
    label: t('schoolForm.actions'),
    sortable: false
  }
] as any

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
          {{ $t('schoolForm.peopleList') }}
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
        {{ $t('schoolForm.clearAll') }}
      </UButton>
    </div>

    <!-- Manual input section -->
    <div class="flex gap-2">
      <UFormField :label="$t('schoolForm.addPersonManually')" class="flex-1">
        <UInput
          v-model="newPersonName"
          :placeholder="$t('schoolForm.fullNamePlaceholder')"
          size="lg"
          icon="i-heroicons-user-plus"
          @keyup.enter="addPerson"
        ></UInput>
      </UFormField>
      <UButton
        icon="i-heroicons-plus"
        size="lg"
        color="primary"
        class="mt-6"
        @click="addPerson"
      >
        {{ $t('schoolForm.addPerson') }}
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
      />
      <UButton
        icon="i-heroicons-arrow-up-tray"
        size="lg"
        color="secondary"
        @click="fileInput?.click()"
      >
        {{ $t('schoolForm.uploadFile') }}
      </UButton>
      <p class="text-sm text-gray-500">
        {{ $t('schoolForm.uploadFileDescription') }}
      </p>
    </div>

    <!-- People list table -->
    <div v-if="localData.length > 0" class="space-y-2">
      <p class="text-sm text-gray-600 font-medium">
        {{ $t('schoolForm.peopleCount', { count: localData.length }) }}
      </p>
      <UTable
        :rows="localData"
        :columns="columns"
      >
        <template #actions-data="{ row }">
          <UButton
            icon="i-heroicons-trash"
            size="xs"
            color="error"
            variant="ghost"
            :ui="{ base: 'justify-center' }"
            @click="removePerson(row.id)"
          />
        </template>
      </UTable>
    </div>

    <div v-else class="text-center py-8 text-gray-500">
      <p>{{ $t('schoolForm.noPeople') }}</p>
    </div>
  </div>
</template>
