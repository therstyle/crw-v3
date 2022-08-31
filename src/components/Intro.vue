<script setup>
	import {ref, onMounted} from 'vue';
	import waypoint from '../helpers/observer';

	const el = ref(null);
	const viewed = ref(false);

	const props = defineProps({
		introHeadline: String,
    introSubHeadline: String,
    introText: String,
    scrollText: String,
    video: String
	});

	onMounted(() => {
		waypoint(el);
	});
</script>

<template>
	<section ref="el" id="intro" class="intro content" :class="{viewed: viewed}">
		<a name="intro" class="jump-link"></a>
    <div class="intro--content">
      <h6 class="sub-heading">{{ introSubHeadline }}</h6>
      <h1 class="heading" v-html="introHeadline"></h1>

      <div v-html="introText"></div>
    </div>

    <div class="scroll-down">
      <a href="#resume">
        <svg fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 0C9.787 0 4.733 5.134 4.733 11.444v9.113C4.733 26.867 9.787 32 16 32c6.212 0 11.267-5.118 11.267-11.408v-9.148C27.267 5.134 22.212 0 16 0zm9.148 20.592c0 5.122-4.104 9.289-9.148 9.289s-9.148-4.183-9.148-9.325v-9.112c0-5.142 4.104-9.325 9.148-9.325s9.148 4.183 9.148 9.325v9.148z" fill="#fff" fill-opacity=".5"/><path d="M16 8.76a1.06 1.06 0 0 0-1.06 1.06v3.708a1.06 1.06 0 0 0 2.12 0V9.819A1.06 1.06 0 0 0 16 8.76z" fill="#fff" fill-opacity=".5"/></svg>

        <span class="sub-heading">{{ scrollText }}</span>
      </a>
    </div>
  </section>
</template>

<style lang="scss">
	@import '../assets/css/vars';
	
	.intro {
		position: relative;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	
	.intro--content {
		max-width: 40vw;
		margin-bottom: var(--space-2);
	
		.heading {
			font-size: 9.6rem;
			font-weight: 800;
			line-height: 0.85;
			margin-bottom: var(--space-2); 
		}
	
		.sub-heading {
			color: var(--red);
			font-size: 1.6rem;
			margin-bottom: var(--space-1);
		}
	}
	
	.scroll-down {
		display: flex;
		flex: 1;
		width: 100%;
		color: var(--white);
		font-size: 1rem;
		justify-content: center;
		align-items: flex-end;
		text-align: center;
	
		a {
			display: block;
			color: var(--white);
	
			&:hover {
				cursor: pointer;
			}
		}
	
		svg {
			max-width: 32px;
			max-height: 32px;
			display: block;
			margin-bottom: 12px;
			animation: scroll-down linear 1.5s infinite;
		}
	
		span {
			display: block;
		}
	}
	
	@keyframes scroll-down {
		0% {
			transform: translateY(0);
		}
	
		50% {
			transform: translateY(-1rem);
		}
	
		100% {
			transform: translateY(0);
		}
	}
	
	@media only screen and (max-width: $md-tablet-breakpoint) {
		.intro--content {
			max-width: none;
		}
	}
	
	@media only screen and (max-width: $tablet-breakpoint) {
		.intro--content {
			.heading {
				font-size: 8.4rem;
			}
		}
	}
	
	@media only screen and (max-width: $phone-breakpoint) {
		.intro--content {
			flex: 1;
			
			.heading {
				font-size: 5rem;
			}
	
			.sub-heading {
				font-size: 1.4rem;
			}
		}
	
		.scroll-down {
			align-items: center;
		}
	}
	
	@media only screen and (max-width: $xs-breakpoint) {
		.intro--content {
			.heading {
				font-size: 4.5rem;
			}
	
			.sub-heading {
				font-size: 1.2rem;
			}
		}
	}
	</style>