import type { FormError } from '@nuxt/ui'

type UserRole = 'admin' | 'user'

type ProductField = {
  label: string
  roles: UserRole[]
  type: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object'
  validation: (value: any) => FormError[]
}

export const productFields = new Map<string, ProductField>([
  ['productName', {
    label: '商品名',
    roles: ['admin', 'user'],
    type: 'string',
    validation: (value: string) => {
      const errors: FormError[] = []
      if (value.length === 0) {
        errors.push({
          name: 'productName',
          message: '商品名は必須です'
        })
      }
      return errors
    }
  }]
])
