<script setup>
	import { onMounted, ref, watch } from 'vue';
	import Heading from './layout/heading.vue';
	import PortfolioItem from './layout/portfolioItem.vue';
	import loadData from '../helpers/loadData';
	import waypoint from '../helpers/observer';

	const el = ref(null);
	const portfolio = ref({});
	const props = defineProps({
    viewed: Boolean
	});

	const initData = async () => {
		const data = await loadData('info.json');
		portfolio.value.portfolioItems = data.portfolio.entries;
		portfolio.value.portfolioIcons = data.portfolio.icons;
	};

	onMounted(() => {
		waypoint(el);
	});

	watch(() => props.viewed, (viewed, oldViewed) => {
		if (viewed) {
			initData();
		}
	});
</script>

<template>
  <section ref="el" id="portfolio" class="portfolio" :class="{viewed: viewed}">
		<a name="portfolio" class="jump-link"></a>
    <Heading title="Portfolio"></Heading>

    <div class="portfolio--content content">
      <PortfolioItem v-for="(portfolioItem, index) in portfolio.portfolioItems" 
        :count="index + 1"
        :key="index"
        :url="portfolioItem.url"
        :image="portfolioItem.image"
        :video="portfolioItem.video"
        :name="portfolioItem.name"
        :description="portfolioItem.description"
        :type="portfolioItem.type"
        :icons="portfolio.portfolioIcons"
        :source="portfolioItem.source"
      ></PortfolioItem>
    </div>
  </section>
</template>