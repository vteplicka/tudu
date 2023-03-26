<template>
  <div
    class="item-overlay-wrapper"
    @click.self="emit('toggleItemOverlay')"
  >
    <div class="item-overlay text-center px-4 py-3">
      <label
        for="item-title"
        class="text-left"
      >
        Item title
      </label>
      <input
        type="text"
        id="item-title"
        class="form-control mb-3"
        maxlength="36"
        v-model="title"
      >
      
      <label
        for="item-title"
        class=""
      >
        Item subtitle
      </label>
      <input
        type="text"
        id="item-subtitle"
        class="form-control mb-5"
        maxlength="56"
        v-model="subtitle"
      >

      <button
        type="button"
        class="btn btn-secondary rounded-pill px-3 col mx-3"
        @click="saveItem"
      >
        save item
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { useListStore } from '../stores/lists'
import type { ListItem } from '../models/interface'

interface Props {
  listIndex: number | null
  itemIndex: number | null
  subitemIndex: number | null
}

const props = withDefaults(defineProps<Props>(), {
  listIndex: null,
  itemIndex: null,
  subitemIndex: null
})

const emit = defineEmits(['toggleItemOverlay', 'saveItem'])

const item: Ref<ListItem> = ref({
  title: '',
  subtitle: '',
  isDone: false,
  subItems: []
})
const title: Ref<string> = ref('')
const subtitle: Ref<string> = ref('')

const store = useListStore()

onMounted(() => {
  const itemTemp = store.lists[props.listIndex ?? 0].items[props.itemIndex ?? 0]
  if (props.subitemIndex !== null) {
    item.value = itemTemp.subItems[props.subitemIndex]
  } else {
    item.value = itemTemp
  }

  title.value = item.value.title ?? ''
  subtitle.value = item.value.subtitle ?? ''
})

const saveItem = () => {
  if (!title.value) {
    return
  }

  const editedItem: ListItem = {
    title: title.value,
    subtitle: subtitle.value,
    subItems: item.value.subItems,
    isDone: item.value.isDone
  }

  store.editItem(props.listIndex ?? 0, props.itemIndex ?? 0, props.subitemIndex, editedItem)
  emit('toggleItemOverlay')
}
</script>

<style lang="scss" scoped>
.item-overlay {
  width: 50vw;
  height: 40vh;
  background: var(--color-background-soft);

  &-wrapper {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
