<script setup>
	const props = defineProps({
		amount: Number,
   	viewed: Boolean,
   	index: Number 
	});
</script>

<template>
  <div>
    <svg width="64" height="64" viewBox="0 0 36 36" class="circular-chart">
      <path class="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path class="circle" :class="{viewed : viewed}"
        :stroke-dasharray="`${amount}, 100`"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" class="percentage">{{ amount }}%</text>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
	@keyframes progress {
		0% {
			stroke-dasharray: 0 100;
		}
	}
	
	.circle.viewed {
		animation: progress 2s ease-in-out;
		animation-fill-mode: forwards;
	}
	</style>