<template>
  <div>
    <ul>
      <li v-for="shopCode in AVAILABLE_SHOP_CODES" :key="shopCode">
        <NuxtLink :to="`/${shopCode}`">
          Shop: {{ shopCode }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
