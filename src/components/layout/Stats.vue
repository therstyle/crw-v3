<script setup>
import {ref, onMounted} from 'vue';
import {animate, viewed} from '../../helpers/animate';
import Percentage from './Percentage.vue';

const el = ref(null);
const settings = ref({threshold: 1});

const props = defineProps({
	stats: Array
});

onMounted(() => {
	animate(settings.value, el.value);
});
</script>

<template>
  <footer ref="el" class="stats">
    <div class="stat animate" :class="{viewed : viewed}" v-for="(stat, index) in stats" :key="index">
      <div class="stat--focal">
        <div class="single-chart">
          <Percentage 
            :amount="stat.percent"
            :viewed="viewed"
            :index="index"
          ></Percentage>
        </div>
      </div>

      <div class="stat--summary">
        {{ stat.summary }}
      </div>
    </div>
  </footer>  
</template>

<style lang="scss">
	@import '../../assets/css/vars';
	
	.stats {
		margin-top: var(--space-2);
		display: flex;
		justify-content: space-between;
	}
	
	.stat {
		display: flex;
		width: calc(50% - var(--space-1));
		align-items: center;
	
		svg {
			text {
				font-family: var(--main-font);
				font-weight: 600;
			}
		}
	}
	
	.stat--focal {
		margin-right: var(--space-1);
		display: flex;
		align-items: center;
	}
	
	.stat--summary {
		font-size: 1.1rem;
		line-height: 1.5;
	}
	
	.flex-wrapper {
		display: flex;
		flex-flow: row nowrap;
	}
	
	.circular-chart {
		display: block;
		margin: 10px auto;
	}
	
	.circle-bg {
		fill: none;
		stroke: #c4c4c4;
		stroke-width: 2;
	}
	
	.circle {
		fill: none;
		stroke-width: 2;
		stroke-linecap: round;
		stroke: var(--red);
		transition: 0.3s all ease-in-out;
	}
	
	.percentage {
		fill: var(--red);
		font-size: .9rem;
		text-anchor: middle;
	}
	
	@media only screen and (max-width: $tablet-breakpoint) {
		.stats {
			flex-direction: column;
		}
	
		.stat {
			width: 100%;
			margin-right: 0;
			margin-bottom: var(--space-1);
		}
	}
	</style>