<script setup>
import {defineAsyncComponent} from 'vue';
import Sidebar from './components/Sidebar.vue';
import sections from './state/sections';

const Intro = defineAsyncComponent(() => import('./components/Intro.vue'));
const Resume = defineAsyncComponent(() => import('./components/Resume.vue'));
const Portfolio = defineAsyncComponent(() => import('./components/Portfolio.vue'));
const Contact = defineAsyncComponent(() => import('./components/Contact.vue'));
const AppFooter = defineAsyncComponent(() => import('./components/AppFooter.vue'));
</script>

<template>
	<Sidebar :sections="sections"></Sidebar>
	<Intro :viewed="sections.intro.viewed"></Intro>
	<Resume :viewed="sections.resume.viewed"></Resume>
	<Portfolio :viewed="sections.portfolio.viewed"></Portfolio>
	<Contact :viewed="sections.contact.viewed"></Contact>
	<AppFooter></AppFooter>
</template>

<style lang="scss">
@import 'assets/css/vars';
@import 'assets/css/reboot';
@import 'assets/css/fonts';
@import 'assets/css/buttons';

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
	height: fill-available;
	height: -webkit-fill-available;
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

		&.contact {
			min-height: auto;
			scroll-padding-top: 56px;
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