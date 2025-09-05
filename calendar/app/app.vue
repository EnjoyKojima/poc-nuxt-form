<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'

const df = new DateFormatter('ja-JP', { dateStyle: 'long' })

const selectedDate = shallowRef<CalendarDate | undefined>(undefined)

const schema = v.object({
  selectedDate: v.undefinedable(v.pipe(
    v.string(),
    v.isoDate()
  )),
})

type Schema = v.InferOutput<typeof schema>

const state = reactive<Schema>({
  selectedDate: undefined,
})

watch(selectedDate, (newVal) => {
  console.log('watch')
  if (newVal === undefined) {
    state.selectedDate = undefined
  } else {
    console.debug('selectedDate のクラス名:', newVal)
    state.selectedDate = newVal.toString()
  }
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<v.InferOutput<typeof schema>>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <UForm
    :state="state"
    :schema="schema"
    class="gap-4 flex flex-col w-60"
    @submit="onSubmit"
  >

    {{ state.selectedDate }}
    {{ state.selectedDate === undefined }}
  
    <UFormField
      label="日付選択"
      name="selectedDate"
    >
      <UPopover>
        <UButton
          color="neutral"
          variant="subtle"
          icon="i-lucide-calendar"
          class="justify-start font-normal"
        >
          {{ selectedDate ? df.format(selectedDate.toDate(getLocalTimeZone())) : '日付を選択' }}
        </UButton>

        <template #content>
          <UCalendar
            v-model="selectedDate"
            class="p-2"
          />
        </template>
      </UPopover>
    </UFormField>

    <UButton
      type="submit"
      color="primary"
    >
      送信
    </UButton>
  </UForm>
</template>
