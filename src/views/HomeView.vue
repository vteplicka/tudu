<template>
  <the-header />

  <main class="row">
    <app-list
      v-for="(list, listIndex) in lists"
      :key="listIndex"
      :list="list"
      @discardList="store.discardList(listIndex)"
      @addItem="(itemTitle: string, itemIndex: number | null) => store.addItem(listIndex, itemTitle, itemIndex)"
      @deleteItem="(itemIndex: number, subItemIndex: number | null) => store.deleteItem(listIndex, itemIndex, subItemIndex)"
      @markDone="(itemIndex: number, subItemIndex: number | null) => markDone(listIndex, itemIndex, subItemIndex)"
      @doTheDance="doTheDance"
      @toggleItemOverlay="(
          itemIndex: number | null = null,
          subitemIndex: number | null = null
        ) => toggleItemOverlay(listIndex, itemIndex, subitemIndex)"
    />
  </main>

  <the-item-overlay
    v-if="showItemOverlay"
    :list-index="editListIndex"
    :item-index="editItemIndex"
    :subitem-index="editSubitemIndex"
    @toggleItemOverlay="toggleItemOverlay"
  />

  <the-confetti v-if="hurrah" />
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useListStore } from '../stores/lists'
import { storeToRefs } from 'pinia'
import TheHeader from '../components/TheHeader.vue'
import TheItemOverlay from '../components/TheItemOverlay.vue'
import TheConfetti from '../components/TheConfetti.vue'
import AppList from '../components/AppList.vue'

const store = useListStore()
const { lists } = storeToRefs(store)

const markDone = (listIndex: number, itemIndex: number, subItemIndex: number | null) => {
  store.markAsDone(listIndex, itemIndex, subItemIndex)
  doTheDance()
}

const hurrah = ref(false)
const doTheDance = () => {
  hurrah.value = true
  setTimeout(() => {
    hurrah.value = false
  }, 1000);
}

const showItemOverlay = ref(false)
const editListIndex: Ref<number | null> = ref(null)
const editItemIndex: Ref<number | null> = ref(null)
const editSubitemIndex: Ref<number | null> = ref(null)

const toggleItemOverlay = (
  listIndex: number | null = null,
  itemIndex: number | null = null,
  subitemIndex: number | null = null
) => {
  if (listIndex === null || itemIndex === null) {
    editListIndex.value = null
    editItemIndex.value = null
    editSubitemIndex.value = null
    showItemOverlay.value = false
    return
  }

  editListIndex.value = listIndex
  editItemIndex.value = itemIndex
  editSubitemIndex.value = subitemIndex
  showItemOverlay.value = true
}
</script>

<style scoped lang="scss">
main {
  margin: 40px 0 0 0;
  padding: 0;
  column-gap: 1rem;
  row-gap: 2rem;
  flex-wrap: wrap;
}
</style>
