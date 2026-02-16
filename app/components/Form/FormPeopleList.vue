<script setup lang="ts">
import * as XLSX from 'xlsx'
import type { Person } from '@/types/school-form'

const props = defineProps<{
  modelValue: Person[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Person[]]
}>()

const newPersonName = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const toast = useToast()
const { t } = useI18n()

const addPerson = () => {
  if (!newPersonName.value.trim()) return
  const newPerson: Person = {
    id: crypto.randomUUID(),
    fullName: newPersonName.value.trim()
  }
  emit('update:modelValue', [...props.modelValue, newPerson])
  newPersonName.value = ''
  toast.add({ title: t('schoolForm.personAdded'), color: 'success' })
}

const removePerson = (id: string) => {
  emit('update:modelValue', props.modelValue.filter(p => p.id !== id))
  toast.add({ title: t('schoolForm.personRemoved'), color: 'success' })
}

const clearAll = () => {
  emit('update:modelValue', [])
}

const exportCsv = () => {
  if (!props.modelValue.length) return
  const content = props.modelValue.map(p => p.fullName).join('\n')
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'people.csv'
  link.click()
  URL.revokeObjectURL(url)
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  const ext = file.name.split('.').pop()?.toLowerCase()

  reader.onload = (e) => {
    const content = e.target?.result
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

  target.value = ''
}

const parseCsv = (content: string) => {
  const lines = content.split('\n').map(l => l.trim()).filter(Boolean)
  const imported: Person[] = lines.map(line => ({ id: crypto.randomUUID(), fullName: line }))
  emit('update:modelValue', [...props.modelValue, ...imported])
  toast.add({
    title: t('schoolForm.fileImported'),
    description: t('schoolForm.peopleImported', { count: imported.length }),
    color: 'success'
  })
}

const parseExcel = (content: string) => {
  try {
    const workbook = XLSX.read(content, { type: 'binary' })
    const firstSheetName = workbook.SheetNames[0]
    if (!firstSheetName) throw new Error('No sheets found')
    const worksheet = workbook.Sheets[firstSheetName]
    if (!worksheet) throw new Error('Sheet not found')

    const data = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 })
    const names: string[] = data
      .filter(row => row && row.length > 0)
      .map(row => String(row[0] || '').trim())
      .filter(Boolean)

    const imported: Person[] = names.map(name => ({ id: crypto.randomUUID(), fullName: name }))
    emit('update:modelValue', [...props.modelValue, ...imported])
    toast.add({
      title: t('schoolForm.fileImported'),
      description: t('schoolForm.peopleImported', { count: imported.length }),
      color: 'success'
    })
  } catch {
    toast.add({
      title: t('schoolForm.errorParsingExcel'),
      description: t('schoolForm.errorParsingExcelMessage'),
      color: 'error'
    })
  }
}

const sortedPeople = computed(() =>
  [...props.modelValue].sort((a, b) => a.fullName.localeCompare(b.fullName))
)

const columns = [
  { id: 'index', header: '#' },
  { accessorKey: 'fullName', id: 'fullName', header: () => t('schoolForm.fullName') },
  { id: 'actions', header: '' }
]
</script>

<template>
  <div class="flex flex-col gap-5">
    <!-- Section header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-1 h-6 bg-primary rounded-full"></div>
        <h3 class="text-lg font-semibold">{{ $t('schoolForm.peopleList') }}</h3>
        <UBadge v-if="modelValue.length > 0" :label="String(modelValue.length)" color="primary" variant="soft" size="sm"></UBadge>
      </div>
      <UButton
        v-if="modelValue.length > 0"
        icon="i-heroicons-trash"
        size="xs"
        color="error"
        variant="ghost"
        @click="clearAll"
      >
        {{ $t('schoolForm.clearAll') }}
      </UButton>
    </div>

    <!-- Add person row -->
    <UFieldGroup class="w-full">
      <UInput
        v-model="newPersonName"
        :placeholder="$t('schoolForm.addPersonManually')"
        size="lg"
        icon="i-heroicons-user-plus"
        class="flex-1"
        @keyup.enter="addPerson"
      ></UInput>
      <UButton
        icon="i-heroicons-plus"
        size="lg"
        color="primary"
        @click="addPerson"
      ></UButton>
    </UFieldGroup>

    <!-- File actions row -->
    <div class="flex flex-wrap gap-2 items-center">
      <input
        ref="fileInput"
        type="file"
        accept=".csv,.xlsx"
        class="hidden"
        @change="handleFileUpload"
      />
      <UButton
        icon="i-heroicons-arrow-up-tray"
        size="sm"
        color="neutral"
        variant="outline"
        @click="fileInput?.click()"
      >
        {{ $t('schoolForm.uploadFile') }}
      </UButton>
      <UButton
        icon="i-heroicons-arrow-down-tray"
        size="sm"
        color="neutral"
        variant="outline"
        :disabled="!modelValue.length"
        @click="exportCsv"
      >
        {{ $t('schoolForm.exportFile') }}
      </UButton>
      <p class="text-xs text-gray-400 dark:text-gray-500 ml-1">
        {{ $t('schoolForm.uploadFileDescription') }}
      </p>
    </div>

    <!-- People table -->
    <div v-if="modelValue.length > 0">
      <UTable
        :key="`table-${modelValue.length}`"
        :data="sortedPeople"
        :columns="(columns as any)"
        class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
      >
        <template #index-cell="{ row }">
          <span class="text-xs text-gray-400 dark:text-gray-500 tabular-nums w-6 text-right block">
            {{ row.index + 1 }}
          </span>
        </template>

        <template #fullName-cell="{ row }">
          <span class="font-medium text-gray-900 dark:text-gray-100">{{ row.original.fullName }}</span>
        </template>

        <template #actions-cell="{ row }">
          <div class="flex justify-end">
            <UButton
              icon="i-heroicons-trash"
              size="xs"
              color="error"
              variant="ghost"
              @click="removePerson(row.original.id)"
            ></UButton>
          </div>
        </template>
      </UTable>
    </div>

    <!-- Empty state -->
    <div v-else class="flex flex-col items-center justify-center py-12 text-center border border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
      <UIcon name="i-heroicons-users" class="w-10 h-10 text-gray-300 dark:text-gray-600 mb-3"></UIcon>
      <p class="text-sm font-medium text-gray-400 dark:text-gray-500">{{ $t('schoolForm.noPeople') }}</p>
      <p class="text-xs text-gray-300 dark:text-gray-600 mt-1">{{ $t('schoolForm.uploadFileDescription') }}</p>
    </div>
  </div>
</template>
