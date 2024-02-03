<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FeaturedBrands from './FeaturedBrands.vue';
import Stats from './Stats.vue';
import EntryDetail from './EntryDetail.vue';
import JobTitle from './JobTitle.vue';
import animate from '../../helpers/animate';

const el = ref<null | HTMLElement>(null);
const viewed = ref(false);
const settings = { threshold: 0.5 };

import type { Entry } from '@/types/Entry';

const props = defineProps<Entry>();

onMounted(() => {
  animate(el.value, viewed, settings);
});
</script>

<template>
  <article
    ref="el"
    class="timeline--entry"
    :class="{ viewed: viewed }"
    :data-year="year"
  >
    <JobTitle :logo="logo" :company="company" :title="title"></JobTitle>

    <ul class="details">
      <EntryDetail
        v-for="(detail, index) in details"
        :key="index"
        :detail="detail.detail"
      ></EntryDetail>
    </ul>

    <FeaturedBrands v-if="featured_brands" :featuredBrands="featured_brands"></FeaturedBrands>

    <Stats v-if="Array.isArray(stats)" :stats="stats"></Stats>
  </article>
</template>
