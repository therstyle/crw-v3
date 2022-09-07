<script setup>
import {ref, onMounted} from 'vue';
import FeaturedBrands from './FeaturedBrands.vue';
import Stats from './Stats.vue';
import EntryDetail from './EntryDetail.vue';
import JobTitle from './JobTitle.vue';
import animate from '../../helpers/animate';

const el = ref(null);
const viewed = ref(false);
const settings = {threshold: 0.5};

const props = defineProps({
	year: String,
	logo: String,
	company: String,
	title: String,
	details: Array,
	featuredBrands: Array,
	stats: [Array, Boolean]
});

onMounted(() => {
	animate(el, settings, viewed);
});
</script>

<template>
  <article ref="el" class="timeline--entry" :class="{viewed: viewed}" :data-year="year">
    <JobTitle 
      :logo="logo"
      :company="company"
      :title="title"
    ></JobTitle>

    <ul class="details">
      <EntryDetail v-for="(detail, index) in details" 
        :key="index"
        :detail="detail.detail"
        ></EntryDetail>
    </ul>

    <template v-if="featuredBrands">
      <FeaturedBrands :featuredBrands="featuredBrands"></FeaturedBrands>
    </template>

    <template v-if="stats">
      <Stats :stats="stats"></Stats>
    </template>
  </article>
</template>