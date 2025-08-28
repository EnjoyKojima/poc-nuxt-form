export default defineNuxtRouteMiddleware((to) => {
  const toShopCode = to.params.shopCode as string | undefined

  const shopCode = useState<string | undefined>('shopCode')

  if (!toShopCode) {
    shopCode.value = undefined
    return
  }

  if (!AVAILABLE_SHOP_CODES.includes(toShopCode)) {
    shopCode.value = undefined
    return navigateTo('/')
  }

  shopCode.value = toShopCode

  return
})
