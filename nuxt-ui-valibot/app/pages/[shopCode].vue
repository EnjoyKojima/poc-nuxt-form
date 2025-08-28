<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const route = useRoute()
const shopCode = computed(() => route.params.shopCode as string)

const schema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(1, '商品名は必須です'),
    v.maxLength(50, '商品名は50文字以下です'),
    v.transform((input) => input.trim())
  ),
  price: v.pipe(
    v.number(),
    v.minValue(0.01, '価格は0.01以上である必要があります'),
    v.transform((val) => Math.round(val * 100) / 100)
  ),
  status: v.picklist(['active', 'inactive'], '販売中または販売停止を選択してください')
});

type Schema = v.InferOutput<typeof schema>

const state = reactive<Schema>({
  name: '',
  price: 0,
  status: 'inactive'
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ 
    title: '送信成功', 
    description: `Shop ${shopCode.value} の商品情報が送信されました`, 
    color: 'success' 
  })
  console.log('Submitted data:', event.data)
  console.log('Shop code:', shopCode.value)
}
</script>

<template>
  <div>
    <h2>
      Shop: {{ shopCode }}
    </h2>

    <UForm :schema="schema" :state="state" class="space-y-6 max-w-2xl mx-auto p-6" @submit="onSubmit">
      <UFormField label="商品名">
        <UInput v-model="state.name" placeholder="商品名を入力してください" type="text" />
      </UFormField>

      <UFormField label="価格">
        <UInput v-model="state.price" placeholder="価格を入力してください" type="number" />
      </UFormField>

      <UFormField label="ステータス">
        <USelect v-model="state.status" :items="['active', 'inactive']" />
      </UFormField>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </div>
</template>
