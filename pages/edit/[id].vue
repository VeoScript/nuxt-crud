<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const bookId = route.params.id

const { data: book, pending } = useLazyFetch(() => `/api/books/${bookId}`, {
  key: 'book',
  pick: ['title', 'description', 'author'],
})

const title = ref('')
const description = ref('')
const author = ref('')
const titleError = ref('')
const descriptionError = ref('')
const authorError = ref('')

watch(pending, () => {
  title.value = String(book.value?.title ?? 'Loading...')
  description.value = String(book.value?.description ?? 'Loading...')
  author.value = String(book.value?.author ?? 'Loading...')
}, { deep: true, immediate: true })

// update book...
const handleUpdateBook = async (e: Event) => {
  e.preventDefault()

  if (!title.value) return titleError.value = 'Title is required'
  if (!description.value) return descriptionError.value = 'Description is required'
  if (!author.value) return authorError.value = 'Author is required'

  await useFetch(() => `/api/books/edit/${bookId}`, {
    method: 'PATCH',
    body: {
      title: title.value,
      description: description.value,
      author: author.value,
    }
  })

  router.back()
}

useHead({
  title: `Edit ${title.value}`
})
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full max-w-5xl h-full my-5 space-y-5">
    <div v-if="pending" class="flex flex-col items-center justify-center w-full h-screen">
      <p>Loading...</p>
    </div>
    <div v-else class="flex flex-col items-center w-full h-full space-y-10">
      <h1 class="font-bold text-3xl">Edit this book titled {{ book?.title }}</h1>
      <form v-on:submit="handleUpdateBook" class="flex flex-col items-center w-full space-y-3">
      <input 
        type="text"
        class="w-full p-3 outline-none rounded-md border border-neutral-300 focus:border-blue-500"
        placeholder="Enter book title..."
        v-model="title"
        v-on:input="() => titleError = ''"
      >
      <span v-if="titleError" class="w-full ml-3 text-left text-sm text-red-500">{{ titleError }}</span>
      <input 
        type="text"
        class="w-full p-3 outline-none rounded-md border border-neutral-300 focus:border-blue-500"
        placeholder="Enter book description..."
        v-model="description"
        v-on:input="() => descriptionError = ''"
      >
      <span v-if="descriptionError" class="w-full ml-3 text-left text-sm text-red-500">{{ descriptionError }}</span>
      <input 
        type="text"
        class="w-full p-3 outline-none rounded-md border border-neutral-300 focus:border-blue-500"
        placeholder="Enter book author..."
        v-model="author"
        v-on:input="() => authorError = ''"
      >
      <span v-if="authorError" class="w-full ml-3 text-left text-sm text-red-500">{{ authorError }}</span>
      <div class="flex flex-row justify-end w-full space-x-1">
        <NuxtLink
          title="Back"
          to="/"
          class="w-auto px-5 py-2 rounded-md text-white bg-neutral-500 hover:opacity-50"
        >
          Back
        </NuxtLink>
        <button
          type="submit"
          class="w-auto px-5 py-2 rounded-md text-white bg-green-500 hover:opacity-50"
        >
          Update
        </button>
      </div>
    </form>
    </div>
  </div>
</template>