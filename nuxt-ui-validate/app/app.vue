<script setup lang="ts">
const userRole = useState<string>('userRole', () => 'admin')
const userRoles = ref(['admin', 'user'])
</script>

<template>
  <UApp>
    <header class="border-b mb-4">
      <h1>Nuxt Form (valibot)</h1>
      <UChip :color="userRole === 'admin' ? 'primary' : 'neutral'">
        <USelect v-model="userRole" :items="userRoles" class="w-48" />
      </UChip>
    </header>
    <main>
      <NuxtLink to="/">ホーム</NuxtLink>
      <NuxtPage />
    </main>
  </UApp>
</template>
