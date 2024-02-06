<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
import Heading from './layout/Heading.vue';
import PortfolioItem from './layout/PortfolioItem.vue';
import PortfolioFilter from './layout/PortfolioFilter.vue';
import loadData from '../helpers/loadData';
import waypoint from '../helpers/observer';
import API_BASE_PATH from '../state/apiBasePath';
import Portfolio from '@/components/Portfolio.vue';

interface Props {
  viewed: Boolean;
}

interface Portfolio {
  headline: string;
  types: Filters[];
}

interface Filters {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
  term_order: string;
}

interface PortfolioPost {
  id: number;
  count: number;
  title: {
    rendered: string;
  };
  custom: {
    video: string;
    description: string;
    url: string;
    credit?: string;
    image: string;
    types: string[];
  };
}

const el = ref<null | HTMLElement>(null);
const portfolio = ref<null | Portfolio>(null);
const currentPage = ref(1);
const maxPages = ref<null | number>(null);
const results = ref<null | number>(null);
const selected = ref<Set<number>>(new Set<number>());
const posts = ref<[] | PortfolioPost[]>([]);
const loading = ref(false);
const props = defineProps<Props>();

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
  try {
    const data = await loadData(`${API_BASE_PATH}/wp-json/cr/global`);
    portfolio.value = data.portfolio;
  } catch (e) {
    console.error(e);
  }
};

const loadPortfolioData = async (loadType?: string) => {
  try {
    loading.value = true;
    const url = `${API_BASE_PATH}/wp-json/wp/v2/portfolio?page=${currentPage.value}${portfolioTypeParam.value}&per_page=6&tax_relation=AND`;
    const response = await fetch(url);
    const data = await response.json();
    const totalPagesHeader = response.headers.get('X-WP-TotalPages');
    const totalResultsHeader = response.headers.get('X-WP-Total');

    maxPages.value = totalPagesHeader !== null ? parseInt(totalPagesHeader) : 1;
    results.value =
      totalResultsHeader !== null ? parseInt(totalResultsHeader) : 0;
    posts.value = loadType === 'more' ? [...posts.value, ...data] : data;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const reset = () => {
  currentPage.value = 1;
};

const updateSelected = (value: number) => {
  if (value === 0) {
    selected.value.clear();
  } else if (selected.value.has(value)) {
    selected.value.delete(value);
  } else selected.value.add(value);

  reset();
  loadPortfolioData();
};

const nextPage = () => {
  currentPage.value++;
  loadPortfolioData('more');
};

watch(
  () => props.viewed,
  (newVal) => {
    if (newVal) {
      initGlobalData();
      loadPortfolioData();
    }
  },
);

watch(el, (newVal) => {
  if (newVal) {
    waypoint(el.value);
  }
});
</script>

<template>
  <section
    ref="el"
    id="portfolio"
    class="portfolio"
    :class="{ viewed: viewed }"
  >
    <template v-if="portfolio !== null">
      <Heading>{{ portfolio.headline }}</Heading>

      <div class="portfolio--filters content" v-if="portfolio.types">
        <PortfolioFilter
          :id="0"
          :selected="selected"
          @update-selected="updateSelected"
        >
          All
        </PortfolioFilter>

        <PortfolioFilter
          v-for="(filter, index) in portfolio.types"
          :key="index"
          :id="filter.term_id"
          :selected="selected"
          @update-selected="updateSelected"
        >
          {{ filter.name }}
        </PortfolioFilter>
      </div>

      <div
        class="portfolio--content content"
        :class="{ loading: loading }"
        v-if="posts && posts.length > 0"
      >
        <PortfolioItem
          v-for="post in posts"
          :key="post.id"
          :url="post.custom.url"
          :image="post.custom.image"
          :video="post.custom.video"
          :name="post.title.rendered"
          :description="post.custom.description"
          :types="post.custom.types"
        >
        </PortfolioItem>
      </div>

      <div
        class="portfolio--pagination content"
        v-if="currentPage !== maxPages"
      >
        <button
          class="button ghost"
          :class="{ disabled: currentPage === maxPages }"
          @click="nextPage"
        >
          Load More
        </button>
      </div>
    </template>
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
