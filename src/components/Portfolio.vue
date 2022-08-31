<script setup>
	import { onMounted, ref } from 'vue';
	import Heading from './layout/heading.vue';
	import PortfolioItem from './layout/portfolioItem.vue';
	import waypoint from '../helpers/observer';

	const el = ref(null);
	const props = defineProps({
		portfolioItems: Array,
    portfolioIcons: Object,
    viewed: Boolean
	});

	onMounted(() => {
		waypoint(el.value);
	});
</script>

<template>
  <section ref="el" id="portfolio" class="portfolio" :class="{viewed: viewed}">
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