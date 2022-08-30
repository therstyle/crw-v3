<script setup>
import {ref, onMounted} from 'vue';
import {animate, viewed} from '../../helpers/animate';

const el = ref(null);
const settings = ref({threshold: 1});

const props = defineProps({
	detail: String
});

onMounted(() => {
	animate(settings.value, el.value);
});
</script>

<template>
  <li ref="el" class="animate" :class="{ viewed : viewed }">{{ detail }}</li>
</template>