<template>
  <article class="tudu-list">
    <h3 class="tudu-list-header mb-4">
      {{ list.title }}
    </h3>

    <section class="tudu-list-controls hover-opacity">
      <div
        class="tudu-list-controls-btn btn btn-danger rounded-pill px-3"
        @click="discardList"
      >
        discard list
      </div>
    </section>

    <section class="tudu-list-adding-item">
      <div
        v-if="!enableTyping"
        class="tudu-list-toggle-add-item hover-opacity my-2 mb-3"
        @click="showTitleInput"
      >
        + add item
      </div>

      <div
        v-else
        class="tudu-list-items-new my-2 mb-3 d-flex"
      >
        <input
          type="text"
          id="new-item-title"
          ref="titleInput"
          class="tudu-list-adding-item-input form-control col me-3"
          maxlength="36"
          focus
          v-model="newItemTitle"
          @keyup.enter="addItem()"
        >

        <button
          type="button"
          class="btn btn-success rounded-pill px-3 me-3"
          @click="addItem()"
        >
          +
        </button>
        <button
          type="button"
          class="btn btn-secondary rounded-pill px-3"
          @click="enableTyping = false"
        >
          cancel
        </button>
      </div>
    </section>

    <section
      v-if="list.items?.length"
      class="tudu-list-items"
    >
      <app-list-item
        v-for="(item, itemIndex) in list.items"
        :key="itemIndex"
        :item="item"
        @deleteItem="(subItemIndex: number | null) => emit('deleteItem', itemIndex, subItemIndex)"
        @addSubItem="(subItemTitle: string) => addItem(subItemTitle, itemIndex)"
        @markDone="(subItemIndex: number | null) => emit('markDone', itemIndex, subItemIndex)"
        @doTheDance="emit('doTheDance')"
        @toggleItemOverlay="(subitemIndex: number | null = null) => emit('toggleItemOverlay', itemIndex, subitemIndex)"
      />
    </section>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { List } from '../models/interface'
import AppListItem from './AppListItem.vue'

defineProps<{
  list: List
}>()

let enableTyping = ref(false)

const emit = defineEmits([
  'discardList',
  'addItem',
  'deleteItem',
  'markDone',
  'doTheDance',
  'toggleItemOverlay'
])

const discardList = () => {
  emit('discardList')
}

const newItemTitle = ref('do this')
const titleInput = ref<HTMLInputElement | null>(null)

const showTitleInput = () => {
  enableTyping.value = true
  titleInput.value?.focus()
}

const addItem = (subItemTitle: string = '', itemIndex: number | null = null) => {
  emit('addItem', newItemTitle.value ?? subItemTitle, itemIndex)
  newItemTitle.value = 'do this'
  enableTyping.value = false
}
</script>

<style lang="scss" scoped>
.tudu-list {
  width: 32rem;
  padding: 1rem;
  border: 1px solid var(--color-border);

  &:hover {
    border-color: var(--color-border-hover);
  }

  &-controls {
    position: absolute;
    top: .75rem;
    right: 1rem;
  }

  &-toggle-add-item {
    cursor: text;
  }

  &-adding-item {
    width: 30rem;
    &-input {
      max-width: 20rem;
    }
  }
}
</style>
