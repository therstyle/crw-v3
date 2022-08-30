<script setup>
import {ref, onMounted} from 'vue';
import {animate, viewed} from '../../helpers/animate';
import FeaturedBrands from './FeaturedBrands.vue';
import Stats from './Stats.vue';
import EntryDetail from './EntryDetail.vue';
import JobTitle from './JobTitle.vue';

const el = ref(null);
const settings = ref({threshold: 0.5});

const props = defineProps({
	year: Number,
	logo: String,
	company: String,
	title: String,
	details: Array,
	featuredBrands: Array,
	stats: Array
});

onMounted(() => {
	animate(settings.value, el.value);
});
</script>

<template>
  <article ref="el" class="timeline--entry" :class="{ viewed : viewed }" :data-year="year">
    <JobTitle 
      :logo="logo"
      :company="company"
      :title="title"
    ></JobTitle>

    <ul class="details">
      <EntryDetail v-for="(detail, index) in details" 
        :key="index"
        :detail="detail"
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