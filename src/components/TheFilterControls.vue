<template>
  <section class="filter-controls">
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="showActive"
        :checked="store.showActive"
        @click="store.toggleActive"
      />
      <label
        class="form-check-label"
        for="showActive"
        @click.prevent="store.toggleActive"
      >
        Show active
      </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        id="showDone"
        :checked="store.showDone"
        @click="store.toggleDone"
      />
      <label
        class="form-check-label"
        for="showDone"
        @click.prevent="store.toggleDone"
      >
        Show done
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useFilterStore } from '../stores/filter'

const store = useFilterStore()
</script>

<style lang="scss" scoped>
.filter-controls {
  position: absolute;
  top: 0;
  right: 0;

  input,
  label {
    cursor: pointer;
  }
}
</style>
