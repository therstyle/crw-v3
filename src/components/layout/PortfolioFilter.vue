<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  name: String,
  id: Number,
  selected: Set,
});

const emit = defineEmits(['update-selected']);

const active = computed(() => {
  return props.selected.has(props.id) || (props.selected.size === 0 && props.id === 0);
});

const updateSelected = () => {
  emit('update-selected', props.id);
};
</script>

<template>
  <button
    class="portfolio-filter"
    :class="{ active: active }"
    :id="`filter-${id}`"
    @click="updateSelected"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss">
.portfolio-filter {
  font-size: 1.3rem;
  font-weight: 600;
  padding: var(--space-half) var(--space-1);
  border: none;
  border-radius: 16px;
  background: #fff;
  transition: 0.3s all ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &.active {
    background: var(--red);
  }
}
</style>
