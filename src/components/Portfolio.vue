<script setup>
	import { onMounted, ref } from 'vue';
	import Heading from './layout/heading.vue';
	import PortfolioItem from './layout/portfolioItem.vue';
	//import {waypoint} from './helpers/observer';

	const i = ref(0);
	const props = defineProps({
		portfolioItems: Array,
    portfolioIcons: Object,
    viewed: Boolean
	});

	onMounted(() => {
		//waypoint();
	});
</script>

<template>
  <section id="portfolio" class="portfolio">
    <Heading title="Portfolio"></Heading>

    <div class="portfolio--content content">
      <PortfolioItem v-for="(portfolioItem, index) in portfolioItems" 
        :count="index + 1"
        :key="index"
        :url="portfolioItem.url"
        :image="portfolioItem.image"
        :video="portfolioItem.video"
        :name="portfolioItem.name"
        :description="portfolioItem.description"
        :type="portfolioItem.type"
        :icons="portfolioIcons"
        :source="portfolioItem.source"
      ></PortfolioItem>
    </div>
  </section>
</template>