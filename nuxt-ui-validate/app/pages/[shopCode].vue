<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const route = useRoute()
const shopCode = computed(() => route.params.shopCode as string)

const state = reactive({
  name: '',
  price: 0,
  status: 'inactive'
})

function validate(state: any): FormError[] {
  const errors: FormError[] = []
  if (state.name.length === 0) {
    errors.push({
      name: 'name',
      message: '商品名は必須です'
    })
  }

  if (state.price <= 0) {
    errors.push({
      name: 'price',
      message: '価格は1円以上である必要があります'
    })
  }

  if (state.status !== 'active' && state.status !== 'inactive') {

    errors.push({
      name: 'status',
      message: '販売中または販売停止を選択してください'
    })
  }

  return errors
}

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<any>) {
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

    {{ state }}

    <UForm :validate :state @submit="onSubmit">
      <UFormField label="商品名" name="name">
        <UInput v-model="state.name" placeholder="商品名を入力してください" type="text" />
      </UFormField>

      <UFormField label="価格" name="price">
        <UInput v-model="state.price" placeholder="価格を入力してください" type="number" />
      </UFormField>

      <UFormField label="ステータス" name="status">
        <USelect v-model="state.status" :items="['active', 'inactive']" />
      </UFormField>

      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </div>
</template>
