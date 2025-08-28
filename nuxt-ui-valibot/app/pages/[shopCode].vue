<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const route = useRoute()
const shopCode = computed(() => route.params.shopCode as string)

const userRole = useState<'admin' | 'user'>('userRole')

const schema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(1, '商品名は必須です'),
    v.maxLength(50, '商品名は50文字以下です'),
    v.transform((input) => input.trim())
  ),
  price: v.pipe(
    v.number(),
    v.minValue(1, '価格は1円以上である必要があります'),
    v.transform((val) => Math.round(val * 100) / 100)
  ),
  status: v.picklist(['active', 'inactive'], '販売中または販売停止を選択してください')
})

type Schema = v.InferOutput<typeof schema>

type AdminStrictSchema = v.InferOutput<typeof schema>
type UserStrictSchema = Omit<AdminStrictSchema, 'status'>
type StrictSchema = AdminStrictSchema | UserStrictSchema

const strictSchema = computed(() => {
  const pickList = userRole.value === 'admin'
    ? ['name', 'price', 'status'] as const
    : ['name', 'price'] as const

  return v.pick(schema, pickList)
})

const state = reactive<StrictSchema>({
  name: '',
  price: 0,
  ...(userRole.value === 'admin' ? { status: 'inactive' as const } : {})
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ 
    title: '送信成功', 
    description: `Shop ${shopCode.value} の商品情報が送信されました`, 
    color: 'success' 
  })
  console.log('Submitted data:', event.data.value)
}
</script>

<template>
  <div>
    <h2>
      Shop: {{ shopCode }}
    </h2>

    <UForm :schema="strictSchema" :state="state" @submit="onSubmit">
      <UFormField label="商品名" name="name">
        <UInput v-model="state.name" placeholder="商品名を入力してください" type="text" />
      </UFormField>

      <UFormField label="価格" name="price">
        <UInput v-model="state.price" placeholder="価格を入力してください" type="number" />
      </UFormField>

      <UFormField v-if="state.status && userRole === 'admin'" label="ステータス" name="status">
        <USelect v-model="state.status" :items="['active', 'inactive']" />
      </UFormField>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </div>
</template>
