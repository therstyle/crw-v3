<script setup>
	import { onMounted, ref, watch, computed } from 'vue';
	import Heading from './layout/heading.vue';
	import PortfolioItem from './layout/portfolioItem.vue';
	import PortfolioFilter from './layout/PortfolioFilter.vue';
	import loadData from '../helpers/loadData';
	import waypoint from '../helpers/observer';
	import API_BASE_PATH from '../state/apiBasePath';

	const el = ref(null);
	const portfolio = ref({});
	const filters = ref([]);
	const currentPage = ref(1);
	const maxPages = ref(1);
	const results = ref(0);
	const selected = ref(new Set());
	const posts = ref([]);
	const loading = ref(false);

	const props = defineProps({
    viewed: Boolean
	});

	const portfolioTypeParam = computed(() => {
		const base = '&portfolio_type=';
		let string = '';

		if (selected.value.size > 0) {
			const arr = Array.from(selected.value);
			const value = arr.toString();
			string = base + value;
		}

		return string;
	});

	const initGlobalData = async () => {
		const data = await loadData(`${API_BASE_PATH}/wp-json/cr/global`);
		portfolio.value.headline = data.portfolio.headline;
		filters.value = data.portfolio.types;
	};

	const loadPortfolioData = async (loadType) => {
		loading.value = true;

		const url = `${API_BASE_PATH}/wp-json/wp/v2/portfolio?page=${currentPage.value}${portfolioTypeParam.value}&per_page=6&tax_relation=AND`;
		const response = await fetch(url);
		const data = await response.json();

		maxPages.value = parseInt(response.headers.get('X-WP-TotalPages'));
		results.value = parseInt(response.headers.get('X-WP-Total'));
		posts.value = loadType === 'more' ? [...posts.value, ...data] : data;
		loading.value = false;
	};

	const reset = () => {
		currentPage.value = 1;
	};

	const updateSelected = value => {
		if (value === 0) {
			selected.value.clear();
		}
		else if (selected.value.has(value)) {
			selected.value.delete(value);
		}
		else (selected.value.add(value));

		reset();
		loadPortfolioData();
	};

	const nextPage = () => {
		currentPage.value++;
		loadPortfolioData('more');
	};

	onMounted(() => {
		waypoint(el);
	});

	watch(() => props.viewed, (viewed, oldViewed) => {
		if (viewed) {
			initGlobalData();
			loadPortfolioData();
		}
	});
</script>

<template>
  <section ref="el" id="portfolio" class="portfolio" :class="{viewed: viewed}">
		<a name="portfolio" class="jump-link"></a>
    <Heading :title="portfolio.headline"></Heading>

		<div 
			class="portfolio--filters content" v-if="filters">
			<PortfolioFilter
				:id="0"
				:selected="selected"
				@update-selected="updateSelected"
			>
			All
			</PortfolioFilter>

			<PortfolioFilter 
				v-for="(filter, index) in filters"
				:id="filter.term_id"
				:selected="selected"
				@update-selected="updateSelected"
			>
			{{filter.name}}
			</PortfolioFilter>
		</div>

    <div class="portfolio--content content" :class="{loading: loading}" v-if="posts && posts.length > 0">
      <PortfolioItem v-for="(post, index) in posts" 
        :count="index + 1"
        :key="post.id"
        :url="post.custom.url"
        :image="post.custom.image"
        :video="post.custom.video"
        :name="post.title.rendered"
        :description="post.custom.description"
        :types="post.custom.types"
        :source="post.custom.source"
      >
			</PortfolioItem>
    </div>

		<div class="portfolio--pagination content" v-if="currentPage !== maxPages">
			<button 
				class="button ghost"
				:class="{disabled: currentPage === maxPages}" 
				@click="nextPage"
			>Load More</button>
		</div>
  </section>
</template>

<style lang="scss">
	.portfolio--filters {
		margin-bottom: var(--space-2);
		display: flex;
		gap: var(--space-1);
		overflow: auto;
	}

	.portfolio--content {
		transition: 0.3s all ease-in-out;

		&.loading {
			opacity: 0;
		}
	}

	.portfolio--pagination {
		text-align: center;
		margin-top: var(--space-4);
	}
</style>