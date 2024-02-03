<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import loadData from '../helpers/loadData';
import waypoint from '../helpers/observer';
import API_BASE_PATH from '../state/apiBasePath';

interface Props {
  viewed: boolean;
}

interface Intro {
  headline: string;
  sub_headline: string;
  text: string;
  scroll_text: string;
  video_mp4: string;
}

const el = ref<null | HTMLElement>(null);
const bgVideo = ref<null | HTMLVideoElement>(null);
const intro = ref<null | Intro>(null);
const props = defineProps<Props>();

const initData = async () => {
  const data = await loadData(`${API_BASE_PATH}/wp-json/cr/global`);
  intro.value = data.intro;
};

const loadVideo = () => {
  if (intro.value !== null && bgVideo.value !== null) {
    bgVideo.value.load();
  }
};

onMounted(() => {
  initData();
});

watch(
  () => props.viewed,
  (newVal) => {
    if (newVal) {
      loadVideo();
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
    v-if="intro !== null"
    id="intro"
    class="intro content"
    :class="{ viewed: viewed }"
  >
    <div class="intro--content">
      <h6 class="sub-heading">{{ intro.sub_headline }}</h6>
      <h1 class="heading" v-html="intro.headline"></h1>

      <div v-html="intro.text"></div>
    </div>

    <div class="scroll-down">
      <a href="#resume">
        <svg fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 0C9.787 0 4.733 5.134 4.733 11.444v9.113C4.733 26.867 9.787 32 16 32c6.212 0 11.267-5.118 11.267-11.408v-9.148C27.267 5.134 22.212 0 16 0zm9.148 20.592c0 5.122-4.104 9.289-9.148 9.289s-9.148-4.183-9.148-9.325v-9.112c0-5.142 4.104-9.325 9.148-9.325s9.148 4.183 9.148 9.325v9.148z"
            fill="#fff"
            fill-opacity=".5"
          />
          <path
            d="M16 8.76a1.06 1.06 0 0 0-1.06 1.06v3.708a1.06 1.06 0 0 0 2.12 0V9.819A1.06 1.06 0 0 0 16 8.76z"
            fill="#fff"
            fill-opacity=".5"
          />
        </svg>

        <span class="sub-heading">{{ intro.scroll_text }}</span>
      </a>
    </div>
  </section>

  <div class="bg-video" v-if="intro !== null">
    <video ref="bgVideo" preload="auto" autoplay muted loop class="full-height">
      <source :src="intro.video_mp4" type="video/mp4" />
    </video>
  </div>
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

.bg-video,
.bg-video:before,
.bg-video:after {
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
    background: -moz-linear-gradient(
      left,
      rgba(51, 51, 51, 1) 1%,
      rgba(51, 51, 51, 1) 45%,
      rgba(51, 51, 51, 0) 100%
    );
    background: -webkit-linear-gradient(
      left,
      rgba(51, 51, 51, 1) 1%,
      rgba(51, 51, 51, 1) 45%,
      rgba(51, 51, 51, 0) 100%
    );
    background: linear-gradient(
      to right,
      rgba(51, 51, 51, 1) 1%,
      rgba(51, 51, 51, 1) 45%,
      rgba(51, 51, 51, 0) 100%
    );
  }

  &:after {
    background: -moz-linear-gradient(
      top,
      rgba(51, 51, 51, 0) 75%,
      rgba(51, 51, 51, 0.99) 99%,
      rgba(51, 51, 51, 1) 100%
    );
    background: -webkit-linear-gradient(
      top,
      rgba(51, 51, 51, 0) 75%,
      rgba(51, 51, 51, 0.99) 99%,
      rgba(51, 51, 51, 1) 100%
    );
    background: linear-gradient(
      to bottom,
      rgba(51, 51, 51, 0) 75%,
      rgba(51, 51, 51, 0.99) 99%,
      rgba(51, 51, 51, 1) 100%
    );
  }

  video {
    width: 100%;
    min-height: 100vh;
    object-fit: cover;
    margin-left: 15vw;
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
