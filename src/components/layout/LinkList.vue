<script setup lang="ts">
import { ref, onMounted } from 'vue';
import animate from '../../helpers/animate';

const el = ref<null | HTMLElement>(null);
const viewed = ref(false);
const settings = { threshold: 1 };

const props = defineProps({
  links: Object
});

onMounted(() => {
  animate(el.value, viewed, settings);
});
</script>

<template>
  <ul ref="el" class="info animate" :class="{ viewed: viewed }">
    <li v-for="(link, index) in links" :key="index">
      <img
        :src="link.icon"
        :alt="link.text"
        width="16"
        height="16"
        loading="lazy"
      />
      <a :href="link.source" target="_blank" class="link">{{ link.text }}</a>
    </li>
  </ul>
</template>
