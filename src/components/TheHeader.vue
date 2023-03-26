<template>
  <header
    @click.self="newListEnabled = false"
  >
    <img
      alt="logo"
      class="logo"
      src="@/assets/tudu-text-logo-360x150.png"
      width="180"
      height="75"
    />

    <h1>tudu app</h1>

    <button
      type="button"
      class="btn rounded-pill px-3"
      :class="newListEnabled ? 'btn-secondary' : 'btn-success'"
      @click="toggleEnterTitle"
    >
      {{ btnText }}
    </button>

    <div
      v-if="newListEnabled"
      class="new-tudu row"
    >
      <input
        type="text"
        id="new-list-title"
        ref="listTitle"
        class="form-control col"
        v-model="newListTitle"
        maxlength="36"
        @keyup.enter="createNewList"
      >

      <button
        type="button"
        class="btn btn-success rounded-pill px-1 col mx-3"
        @click="createNewList"
      >
        +
      </button>

      <div
        v-if="showErrorMessage"
        class="text-danger col container"
      >
        Please enter a list title
      </div>
    </div>

    <the-filter-controls />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useListStore } from '../stores/lists'
import TheFilterControls from './TheFilterControls.vue'

const store = useListStore()

const newListEnabled = ref(false)
const btnText = ref('+ add list')
const newListTitle = ref('To do list')
const showErrorMessage = ref(false)

const listTitle = ref<HTMLInputElement | null>(null)

const toggleEnterTitle = () => {
  showErrorMessage.value = false
  newListEnabled.value = !newListEnabled.value
  listTitle.value?.focus()
  btnText.value = newListEnabled.value ? 'cancel' : '+ add list'
  newListTitle.value = newListEnabled.value ? 'To do list' : newListTitle.value
}

const createNewList = () => {
  if (newListTitle.value.length) {
    store.addList(newListTitle.value)
    toggleEnterTitle()
  } else {
    console.warn('missing title')
    showErrorMessage.value = true
  }
}
</script>

<style lang="scss" scoped>
header {
  display: flex;
  place-items: center;
  column-gap: 3rem;
  .logo {
    opacity: .7;
  }
  h1 {
    display: none;
  }
}
</style>
