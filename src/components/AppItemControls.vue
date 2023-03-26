<template>
  <div class="tudu-item-controls text-center">
    <div
      v-if="allowDone"
      class="tudu-item-controls-action done text-success"
      title="mark as done"
      @click="emit('markDone')"
    >
      ✓
    </div>

    <div
      v-if="allowAdd"
      class="tudu-item-controls-action add"
      title="add sub-item"
      @click="emit('addSubItem')"
    >
      +
    </div>

    <div
      class="tudu-item-controls-action remove text-danger"
      title="delete this item"
      @click="emit('deleteItem')"
    >
      -
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  allowAdd?: boolean,
  allowDone?: boolean
}

withDefaults(defineProps<Props>(), {
  allowDone: true,
  allowAdd: true
})

const emit = defineEmits(['markDone', 'addSubItem', 'deleteItem'])
</script>

<style lang="scss" scoped>
.tudu-item-controls {
  width: 3rem;
  position: absolute;
  top: -0.25rem;
  right: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 1rem;

  &-action {
    width: 1rem;
    transition: transform .2s;
    transform-origin: center;
    padding: 0;

    &:hover {
      transform: scale(1.75);
    }
    &:active {
      transform: scale(1.25);
    }

    &.remove {
      font-size: 1.5rem;
    }
  }
}
</style>
