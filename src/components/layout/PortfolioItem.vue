<script setup>
import {ref, onMounted} from 'vue';
//import {animate, viewed} from '../../helpers/animate';

const el = ref(null);
const videoPlayer = ref(null);
const settings = ref({threshold: 0.25});

const props = defineProps({
	url: String,
	image: Object,
	video: String,
	name: String,
	description: String,
	type: Array,
	icons: Object,
	count: Number,
	source: String
});

const loadVideos = () => {
	videoPlayer.value.load();
	videoPlayer.value.pause();
};

const startVideo = () => {
	videoPlayer.value.play();
};

const endVideo = () => {
	videoPlayer.value.pause();
}

onMounted(() => {
	loadVideos();
	//animate(settings.value, el.value);
});
</script>

<template>
	<article class="portfolio--content-entry animate" v-on:mouseover="startVideo" v-on:mouseout="endVideo">
    <a :href="url" target="_blank">
      <header>
        <video v-if="video" ref="videoPlayer" muted autoplay loop :poster="image.image_2x">
          <source :src="video" type="video/mp4">
        </video>
      </header>
    </a>

    <div class="description">
      <h3>{{ name }}</h3>
      <p v-html="description"></p>
      <div class="project-details">
        <div v-if="url" class="view-source"><a :href="url" target="_blank">View Project</a></div>
        
        <div class="project-type">
          <img v-for="(projectType, index) in type" :src="`${icons[projectType]}`" :alt="projectType" :key="index">
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss">
	@import '../../assets/css/vars';
	
	.portfolio--content {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: calc(var(--space-1) + var(--space-half));
		
		&.content {
			overflow: visible;
		}
	}
	
	.portfolio--content-entry {
		box-shadow: 0 0 30px rgba(0,0,0,0.1);
		transition: 0.3s all ease-in-out !important;
		display: flex;
		flex-direction: column;
	
		&:hover {
			transform: translateY(-0.3vw);
			box-shadow: 0 15px 30px rgba(0,0,0,0.33);
	
			header {
				filter: grayscale(0);
			}
		}
	
		> a {
			color: var(--white);
		}
	
		header {
			filter: grayscale(1);
			transition: 1s filter ease-in-out;
	
			video {
				width: 100%;
				height: auto;
				display: block;
			}
		}
	
		.description {
			font-size: 1.4rem;
			padding: var(--space-2);
			background: var(--med-gray-alpha);
			flex: 1;
			display: flex;
			flex-direction: column;
	
			> h3 {
				margin-bottom: var(--space);
			}
	
			> p {
				margin-bottom: var(--space-2);
				flex: 1;
			}
	
			small {
				display: block;
				margin-top: var(--space-1);
	
				a {
					display: inline-block;
					margin-top: 8px;
				}
			}
		}
	
		.project-details {
			display: flex;
			align-items: center;
		}
	
		.view-source {
			margin-right: var(--space-1);
	
			> a {
				display: inline-block;
				border-radius: 30px;
				padding: var(--space-half) var(--space-1);
				background: var(--white);
				color: var(--med-gray);
				font-weight: 600;
				font-size: 1.3rem;
			}
		}
	
		.project-type {
			text-align: right;
			flex: 1;
	
			> * {
				margin-left: var(--space-1);
			}
		}
	}
	
	@media only screen and (max-width: $lg-tablet-breakpoint) {
		.portfolio--content {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	
	@media only screen and (max-width: $tablet-breakpoint) {
		.portfolio--content {
			grid-template-columns: repeat(1, 1fr);
		}
	}
	</style>