<script setup>
import {ref, onMounted} from 'vue';
import animate from '../../helpers/animate';

const el = ref(null);
const viewed = ref(false);
const settings = {threshold: 0.5};

const props = defineProps({
	image: String,
  name: String
});

onMounted(() => {
	animate(el, settings, viewed);
});
</script>

<template>
	<div ref="el" class="photo animate" :class="{viewed: viewed}">
    <picture v-html="image">
    </picture>

    <h3 class="sig">{{ name }}</h3>
  </div>
</template>

<style lang="scss">
	picture {
		img {
			max-width: 244px;
		}
	}
</style>
