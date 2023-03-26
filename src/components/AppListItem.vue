<template>
  <div
    v-if="displayThisItem"
    class="tudu-item py-1 my-1"
    :class="[
      {
        'is-done': props.item.isDone,
        'is-subitem': isSubItem
      }, 
      isSubItem ? 'ms-4' : 'px-3 ps-4'
    ]"
  >
    <div
      class="tudu-item-title"
      :class="{'done': props.item.isDone}"
      :title="props.item.subtitle?.toString()"
      @click="emit('toggleItemOverlay')"
    >
      {{ props.item.title }}
    </div>

    <app-item-controls
      :allow-done="!props.item.isDone"
      :allow-add="!isSubItem && !props.item.isDone"
      @markDone="emit('markDone')"
      @addSubItem="emit('addSubItem', 'do this')"
      @deleteItem="emit('deleteItem')"
    />

    <section
      v-if="!isSubItem && props.item.subItems"
      class="tudu-item-subitems"
    >
      <app-list-item
        v-for="(subitem, subitemIndex) in props.item.subItems"
        :key="subitemIndex"
        class="subitem"
        :item="subitem"
        is-sub-item
        @markDone="emit('markDone', subitemIndex)"
        @deleteItem="emit('deleteItem', subitemIndex)"
        @toggleItemOverlay="emit('toggleItemOverlay', subitemIndex)"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ListItem } from '../models/interface'
import { storeToRefs } from 'pinia'
import { useFilterStore } from '../stores/filter'
import AppItemControls from './AppItemControls.vue'

interface Props {
  item?: ListItem,
  isSubItem?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  item: () => {
    return {
      title: 'do this',
      subtitle: 'hover tooltip',
      subItems: [],
      isDone: false
    }
  },
  isSubItem: false
})

const emit = defineEmits([
  'deleteItem',
  'addSubItem',
  'markDone',
  'doTheDance',
  'toggleItemOverlay'
])

const store = useFilterStore()
const { showActive, showDone } = storeToRefs(store)

const displayThisItem = computed(() =>
    showActive.value && !props.item.isDone ||
    showDone.value && props.item.isDone
)
</script>

<style lang="scss" scoped>
@import "../assets/list-item.scss";
</style>
