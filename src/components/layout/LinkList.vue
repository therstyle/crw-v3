<script setup>
import {ref, onMounted} from 'vue';
import {animate, viewed} from '../../helpers/animate';

const el = ref(null);
const settings = ref({threshold: 1});

const props = defineProps({
	links: Object
});

onMounted(() => {
	animate(settings.value, el.value);
});
</script>

<template>
  <ul ref="el" class="info animate" :class="{ viewed : viewed }">
    <li v-for="(link, index) in links" :key="index">
      <img :src="link.icon" :alt="link.text">
      <a :href="link.source" target="_blank" class="link">{{ link.text }}</a>
    </li>
  </ul>
</template>