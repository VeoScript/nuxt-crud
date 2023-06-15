<script setup lang="ts">
  useHead({
    title: "Home"
  })
  const { data: books } = useFetch(() => "/api/books", { key: "books"}) 
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="font-bold text-3xl">Nuxt 3</h1>
    <div v-for="book in books" :key="book.id">
      <h3>{{ book.title }}</h3>
    </div>
  </div>
</template>