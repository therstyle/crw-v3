<script setup lang="ts">
import { ref, onMounted } from 'vue';
import animate from '../../helpers/animate';

interface Props {
  logo: string;
  company: string;
  title: string;
}

const el = ref<null | HTMLElement>(null);
const viewed = ref(false);
const settings = { threshold: 1 };
const props = defineProps<Props>();

onMounted(() => {
  animate(el.value, viewed, settings);
});
</script>

<template>
  <header ref="el" class="animate" :class="{ viewed: viewed }">
    <img :src="logo" :alt="company" width="28" height="28" loading="lazy" />
    <div class="company-info">
      <h3>{{ company }}</h3>
      <small>{{ title }}</small>
    </div>
  </header>
</template>
