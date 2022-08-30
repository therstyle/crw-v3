<script setup>
import {ref, onMounted} from 'vue';
import {animate, viewed} from '../../helpers/animate';

const el = ref(null);
const settings = ref({threshold: 1});
const props = defineProps({
	logo: String,
	company: String,
	title: String
});

onMounted(() => {
	animate(settings.value, el.value);
});
</script>

<template>
  <header ref="el" class="animate" :class="{ viewed : viewed }">
    <img :src="logo" :alt="company">
    <div class="company-info">
      <h3>{{ company }}</h3>
      <small>{{ title }}</small>
    </div>
  </header>
</template>