<script setup>
	import { onMounted, ref } from 'vue';
	import Heading from './layout/heading.vue';
	import PorfolioItem from './layout/portfolioItem.vue';
	import {waypoint} from './helpers/observer.js';

	const i = ref(0);
	const props = defineProps({
		portfolioItems: Array,
    portfolioIcons: Object,
    viewed: Boolean
	});

	onMounted(() => {
		waypoint();
	});
</script>

<template>
  <section id="portfolio" class="portfolio" :class="{ viewed : viewed }">
    <Heading title="Portfolio"></Heading>

    <div class="portfolio--content content">
      <PorfolioItem v-for="(PortfolioItem, index) in PortfolioItems" 
        :count="index + 1"
        :key="index"
        :url="PortfolioItem.url"
        :image="PortfolioItem.image"
        :video="PortfolioItem.video"
        :name="PortfolioItem.name"
        :description="PortfolioItem.description"
        :type="PortfolioItem.type"
        :icons="portfolioIcons"
        :source="PortfolioItem.source"
      ></PorfolioItem>
    </div>
  </section>
</template>