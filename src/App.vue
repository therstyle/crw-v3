<script setup>
import {ref, computed, onMounted} from 'vue';
import Sidebar from './components/Sidebar.vue';
import Intro from './components/Intro.vue';
import Resume from './components/Resume.vue';
import Portfolio from './components/Portfolio.vue';
import Contact from './components/Contact.vue';
import sections from './state/sections';

const bgVideo = ref(null);
const intro = ref(null);
const resume = ref(null);
const portfolio = ref(null);
const contact = ref(null);

const github = ref('');
const linkedin = ref('');
const introHeadline = ref('');
const introSubHeadline = ref('');
const introText = ref('');
const scrollText = ref('');
const introVideo = ref({});
const resumeEntries = ref([]);
const resumePhoto = ref({});
const sigText = ref('');
const linkList = ref({});
const devSkillsHeadline = ref('');
const devSkills = ref([]);
const designSkillsHeadline = ref('');
const designSkills = ref([]);
const portfolioItems = ref([]);
const portfolioIcons = ref({});
const contactHeadline = ref('');
const contactPhoto = ref({});
const contactButtonText = ref('');
const loaderImg = ref('');
const formErrorMessage = ref('');

const loadVideo = () => {
	bgVideo.value.load();
};

const loadData = async () => {
	const response = await fetch('info.json');
	const info = await response.json();
	await loadVideo();

	if (!response.ok) {return};
	github.value = info.nav.github;
	linkedin.value = info.nav.linkedin;
	introHeadline.value = info.intro.headline;
	introSubHeadline.value = info.intro.introSubHeadline;
	introText.value = info.intro.introText;
	scrollText.value = info.intro.scrollText;
	introVideo.value = info.intro.video;
	resumeEntries.value = info.resume.entries;
	resumePhoto.value = info.resume.image;
	sigText.value = info.resume.sigText;
	linkList.value = info.resume.linkList;
	devSkillsHeadline.value = info.resume.skills.dev.headline;
	devSkills.value = info.resume.skills.dev.skillset;
	designSkillsHeadline.value = info.resume.skills.design.headline;
	designSkills.value = info.resume.skills.design.skillset;
	portfolioItems.value = info.portfolio.entries;
	portfolioIcons.value = info.portfolio.icons;
	contactHeadline.value = info.contact.headline;
	contactPhoto.value = info.contact.image;
	contactButtonText.value = info.contact.buttonText;
	formErrorMessage.value = info.contact.formErrorMessage;
	loaderImg.value = info.contact.loaderImg;
};

onMounted(() => {
	loadData();
});
</script>

<template>
	<Sidebar
		:github="github"
		:linkedin="linkedin"
		:sections="sections"
	>
	</Sidebar>

	<Intro
		ref="intro"
		:introHeadline="introHeadline" 
		:introSubHeadline="introSubHeadline" 
		:introText="introText"
		:scrollText="scrollText"
		:viewed="sections.intro.viewed"
	>
	</Intro>

	<Resume
		ref="resume"
		:entries="resumeEntries"
		:image="resumePhoto"
		:devSkillsHeadline="devSkillsHeadline"
		:devSkills="devSkills"
		:designSkillsHeadline="designSkillsHeadline"
		:designSkills="designSkills"
		:sigText="sigText"
		:linkList="linkList"
		:viewed="sections.resume.viewed"
  >
	</Resume>

	<Portfolio
		ref="portfolio"
		:portfolioItems="portfolioItems"
		:portfolioIcons="portfolioIcons"
		:viewed="sections.portfolio.viewed"
  >
	</Portfolio>

	<Contact
		ref="contact" 
		:headline="contactHeadline"
		:image="contactPhoto"
		:buttonText="contactButtonText"
		:formErrorMessage="formErrorMessage"
		:loaderImg="loaderImg"
		:viewed="sections.contact.viewed"
	>
	</Contact>
	
	<div class="bg-video">
		<video ref="bgVideo" preload="auto" autoplay muted loop class="full-height"> 
			<source :src="introVideo.video_mp4" type="video/mp4"> 
		</video>
	</div>
</template>

<style lang="scss">
@import 'assets/css/vars';
@import 'assets/css/reboot';
@import 'assets/css/fonts';

*,
*:after,
*:after {
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
}

html {
  font-size: 62.5%;
	scroll-behavior: smooth;
}

body {
  background: var(--body-bg);
  color: var(--white);
  font-family: var(--main-font);
  font-size: var(--font-size);
  line-height: var(--line-height);
}

#app {
  display: flex;
  padding-left: var(--sidebar-width);
  position: relative;
  flex-direction: column;

  > section {
    min-height: 100vh;

    &:not(.intro) {
      .content {
        padding-top: 0;
        padding-bottom: 0;
        max-width: 1440px;
        margin-left: auto;
        margin-right: auto;
      }
    }

    &:not(.contact) {
      margin-bottom: var(--space-8); //Keep out of viewport for observer
    }
  }
}

img {
  max-width: 100%;
}

.heading {
  font-size: 8.8rem;
  text-transform: uppercase;
}

.sub-heading {
  font-family: var(--accent-font);
  font-weight: normal;
  text-transform: uppercase;
}

a {
  text-decoration: none;

  &.link {
    color: var(--white);
    background-image: linear-gradient(120deg, var(--red) 0%, var(--red) 100%);
    background-repeat: no-repeat;
    background-size: 100% 0.3rem;
    background-position: 0 115%;
    padding-bottom: 0.3rem;
    transition: 0.3s all;

    &:hover {
      background-image: linear-gradient(120deg, var(--dark-red) 0%, var(--dark-red) 100%);
    }
  }
}

p {
  &:last-child {
    margin-bottom: 0;
  }
}

.content {
  padding: var(--space-4);
  overflow: hidden;
}

.bg-video,
.bg-video:before,
.bg-video:after  {
  content: '';
  position: fixed;
  width: 100%;
  min-height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.bg-video {
  z-index: -1;

  &:before {
    background: -moz-linear-gradient(left,  rgba(51,51,51,1) 1%, rgba(51,51,51,1) 45%, rgba(51,51,51,0) 100%);
    background: -webkit-linear-gradient(left,  rgba(51,51,51,1) 1%,rgba(51,51,51,1) 45%,rgba(51,51,51,0) 100%);
    background: linear-gradient(to right,  rgba(51,51,51,1) 1%,rgba(51,51,51,1) 45%,rgba(51,51,51,0) 100%);
  }

  &:after {
    background: -moz-linear-gradient(top,  rgba(51,51,51,0) 75%, rgba(51,51,51,0.99) 99%, rgba(51,51,51,1) 100%);
    background: -webkit-linear-gradient(top,  rgba(51,51,51,0) 75%,rgba(51,51,51,0.99) 99%,rgba(51,51,51,1) 100%);
    background: linear-gradient(to bottom,  rgba(51,51,51,0) 75%,rgba(51,51,51,0.99) 99%,rgba(51,51,51,1) 100%);
  }

  video {
    width: 100%;
    min-height: 100vh;
    object-fit: fill;
    margin-left: 15vw;
  }
}

.animate {
  transform: translateY(var(--space-2));
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;

  &.portfolio--content-entry {
    transform: translateY(var(--space-4));
  }

  &.viewed {
    transform: translateY(0);
    opacity: 1;
  }
}

@media only screen and (max-width: $md-phone-breakpoint) {
  .content {
    padding: var(--space-2);
  }
}
</style>
