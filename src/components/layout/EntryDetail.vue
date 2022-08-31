<script setup>
import {ref, onMounted} from 'vue';
import animate from '../../helpers/animate';

const el = ref(null);
const viewed = ref(false);
const settings = {threshold: 1};

const props = defineProps({
	detail: String
});

onMounted(() => {
	animate(el, settings, viewed);
});
</script>

<template>
  <li ref="el" class="animate" :class="{viewed: viewed}">{{ detail }}</li>
</template>