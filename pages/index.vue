<script setup lang="ts">
const title = ref('')
const description = ref('')
const author = ref('')
const titleError = ref('')
const descriptionError = ref('')
const authorError = ref('')

const { data: books, pending, refresh } = useLazyFetch(() => "/api/books", {
  key: "books"
})

// create book...
const handleCreateBook = async (e: Event) => {
  e.preventDefault()

  if (!title.value) return titleError.value = 'Title is required'
  if (!description.value) return descriptionError.value = 'Description is required'
  if (!author.value) return authorError.value = 'Author is required'

  await useFetch(() => "/api/books/create", {
    method: 'POST',
    body: {
      title: title.value,
      description: description.value,
      author: author.value,
    }
  })
  
  handleDefaultValues()
  refresh()
}

// delete book...
const handleDeleteBook = async (id: string) => {
  await useFetch(() => `/api/books/delete/${id}`, {
    method: 'DELETE',
    body: {
      title,
      description,
      author,
    }
  })
  
  handleDefaultValues()
  refresh()
}

// default ref values...
const handleDefaultValues = () => {
  title.value = ''
  description.value = ''
  author.value = ''
  titleError.value = ''
  descriptionError.value = ''
  authorError.value = ''
}

useHead({
  title: "Home"
})
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full max-w-5xl h-full my-5 space-y-5">
    <div class="flex flex-col items-center w-full space-y-1">
      <h1 class="font-bold text-3xl">Book Library</h1>
      <h2 class="font-normal text-base">Using Nuxt 3 and TailwindCSS</h2>
    </div>
    <form v-on:submit="handleCreateBook" class="flex flex-col items-center w-full space-y-3">
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
      <div class="flex flex-row justify-end w-full">
        <button
          type="submit"
          class="w-auto px-5 py-2 rounded-md text-white bg-blue-500 hover:opacity-50"
        >
          Create
        </button>
      </div>
    </form>
    <div v-if="pending" class="flex flex-col items-center justify-center w-full h-screen">
      <p>Loading...</p>
    </div>
    <div v-else class="flex flex-col items-center w-full space-y-5">
      <div
        v-if="books?.length === 0"
        class="flex flex-col items-center w-full"
      >
        <p>No books in the list.</p>
      </div>
      <div
        v-for="book in books"
        :key="book.id"
        class="flex flex-col items-center w-full"
      >
        <div class="flex flex-row items-start w-full p-5 space-x-1 rounded-md border border-neutral-300">
          <div class="flex flex-col w-full space-y-3">
            <h3 class="font-bold text-xl">{{ book.title }}</h3>
            <p class="font-light text-base">{{ book.description }}</p>
            <h4 class="font-medium text-base">{{ book.author }}</h4>
          </div>
          <div class="flex flex-row items-center justify-end w-full space-x-3">
            <NuxtLink title="Edit" :to="`/edit/${book.id}`">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-green-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </NuxtLink>
            <button
              title="Delete"
              type="button"
              v-on:click="() => handleDeleteBook(book.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>