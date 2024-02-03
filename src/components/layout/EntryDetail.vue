<script setup lang="ts">
import { ref, onMounted } from 'vue';
import animate from '../../helpers/animate';

interface Props {
  detail: string;
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
  <li ref="el" class="animate" :class="{ viewed: viewed }">{{ detail }}</li>
</template>
