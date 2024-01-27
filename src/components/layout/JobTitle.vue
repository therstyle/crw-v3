<script setup>
import { ref, onMounted } from 'vue';
import animate from '../../helpers/animate';

const el = ref(null);
const viewed = ref(false);
const settings = { threshold: 1 };
const props = defineProps({
  logo: String,
  company: String,
  title: String,
});

onMounted(() => {
  animate(el, settings, viewed);
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
