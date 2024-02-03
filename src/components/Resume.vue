<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Heading from '../components/layout/Heading.vue';
import TimelineEntry from '../components/layout/TimelineEntry.vue';
import ProfilePhoto from './layout/ProfilePhoto.vue';
import LinkList from './layout/LinkList.vue';
import SkillSet from './layout/SkillSet.vue';
import loadData from '../helpers/loadData';
import waypoint from '../helpers/observer';
import API_BASE_PATH from '../state/apiBasePath';

import type { DevSkill } from '@/types/DevSkill';
import type { DesignSkill } from '@/types/DesignSkill';
import type { LinkListing } from '@/types/LinkListing';
import type { Entry } from '@/types/Entry';

interface Props {
  viewed: boolean;
}

interface Resume {
  headline: string;
  image: string;
  sig_text: string;
  link_list: LinkListing[];
  entries: Entry[];
  dev_skills_headline: string;
  dev_skills: DevSkill[];
  design_skills_headline: string;
  design_skills: DesignSkill[];
}

const el = ref<null | HTMLElement>(null);
const resume = ref<null | Resume>(null);
const props = defineProps<Props>();
const initData = async () => {
  try {
    const data = await loadData(`${API_BASE_PATH}/wp-json/cr/global`);
    resume.value = data.resume;
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  initData();
});

watch(el, (newVal) => {
  if (newVal) {
    waypoint(el.value);
  }
});
</script>

<template>
  <section
    v-if="resume !== null"
    ref="el"
    id="resume"
    class="resume"
    :class="{ viewed: viewed }"
  >
    <Heading>Resume</Heading>

    <div class="resume--content content">
      <div class="timeline">
        <TimelineEntry
          v-for="(entry, index) in resume.entries"
          :key="index"
          :year="entry.year"
          :logo="entry.logo"
          :company="entry.company"
          :title="entry.title"
          :details="entry.details"
          :featuredBrands="entry.featured_brands"
          :stats="entry.stats"
        ></TimelineEntry>
      </div>

      <aside class="skill-tree">
        <ProfilePhoto
          v-if="resume.image"
          :image="resume.image"
          :name="resume.sig_text"
        ></ProfilePhoto>

        <LinkList :links="resume.link_list"></LinkList>

        <SkillSet
          :headline="resume.dev_skills_headline"
          :skillset="resume.dev_skills"
        ></SkillSet>

        <SkillSet
          :headline="resume.design_skills_headline"
          :skillset="resume.design_skills"
        ></SkillSet>
      </aside>
    </div>
  </section>
</template>

<style lang="scss">
@import '../assets/css/vars';

.resume--content {
  display: flex;
}

.timeline {
  position: relative;
  margin: 0 7vw;
  max-width: 60vw;

  article:first-child {
    padding-top: 0;
  }

  article:last-child {
    border-color: transparent;
  }

  &:before {
    content: '';
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background: var(--light-gray);
  }
}

.timeline--entry {
  padding: var(--space-3);
  border-bottom: 1px solid var(--light-gray);
  position: relative;

  &:before {
    content: '';
    position: absolute;
    display: block;
    border-radius: 100%;
    top: 6.1vw;
    left: calc((var(--space-3) - var(--space-6)) - 24px);
    margin-left: calc(var(--space-3) + 12px);
    width: 24px;
    height: 24px;
    border: 5px solid var(--red);
    background: var(--body-bg);
  }

  &:after {
    content: attr(data-year);
    font-weight: 600;
    color: var(--red);
    font-size: 4.1vw;
    writing-mode: vertical-rl;
    text-orientation: sideways;
    transform: rotate(180deg);
    position: absolute;
    left: -7vw;
    top: 2.1vw;
    display: inline-block;
  }

  header {
    display: flex;
    align-items: center;
    margin-bottom: var(--space-2);

    img {
      margin-right: calc(var(--space-1) + var(--space-half));
      max-width: 42px;
      padding: 7px;
      background: var(--white);
    }

    .company-info {
      line-height: 90%;

      > :first-child {
        margin-bottom: 0;
        line-height: 1;
      }
    }
  }
}

.details {
  padding-left: 0;
  margin-bottom: 0;

  > li {
    font-size: 1.6rem;
    line-height: 1.5;
    list-style: none;
    position: relative;
    margin-left: 30px;
    margin-bottom: var(--space-2);

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 5px;
      left: -30px;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      background: var(--red);
      margin-right: 10px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.skill-tree {
  max-width: 40vw;
  min-width: 244px;

  .sig {
    text-transform: none;
  }

  h3 {
    text-align: center;
    text-transform: uppercase;
    font-size: 2.4rem;
  }
}

.photo {
  position: relative;
  margin-bottom: var(--space-4);

  .skill-tree--photo,
  img {
    display: block;
    width: auto;
    height: auto;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.66);
    margin-bottom: var(--space-2);
  }
}

.sig {
  font-family: var(--sig-font);
  text-align: center;
  font-weight: normal;
  margin-bottom: 0;
  position: absolute;
  width: 100%;
  bottom: -18px;
}

.info {
  margin: 0 auto var(--space-7) auto;
  padding: 0;
  font-size: 14px;

  > li {
    list-style: none;
    display: block;
    margin-bottom: var(--space-half);

    img {
      max-width: 16px;
      display: inline-block;
      margin-right: var(--space-1);
    }
  }
}

.skills {
  margin-bottom: var(--space-4);
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  max-width: 244px;
  margin-left: auto;
  margin-right: auto;

  > li {
    list-style: none;
    background: var(--dark-gray-alpha);
    width: 50%;
    border: 0.5px solid var(--light-gray);
    max-width: 122px;
    height: 122px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s all;

    &:hover {
      transform: scale(1.1);
      background: var(--dark-gray);
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.33);
    }

    > div {
      text-align: center;
    }

    img {
      display: block;
      margin: 0 auto 10px;
    }

    h6 {
      font-size: 14px;
      line-height: 1.2;
      margin: 0;
    }

    small {
      font-size: 11px;
      display: block;
    }

    &:first-child,
    &:nth-child(2) {
      border-top: 1px solid var(--light-gray);
    }

    &:last-child,
    &:nth-last-child(2) {
      border-bottom: 1px solid var(--light-gray);
    }
  }
}

@media only screen and (min-width: $max-breakpoint) {
  .timeline--entry {
    &:before {
      top: 9rem;
    }

    &:after {
      font-size: 5.9rem;
      left: -10.2rem;
      top: 3.1rem;
    }
  }
}

@media only screen and (max-width: $md-tablet-breakpoint) {
  .resume--content {
    flex-wrap: wrap;
  }

  .timeline {
    max-width: none;
    margin-bottom: var(--space-8);
  }

  .timeline--entry {
    padding-right: 0;
  }

  .skill-tree {
    margin-left: auto;
    margin-right: auto;
  }
}

@media only screen and (max-width: $tablet-breakpoint) {
  .timeline--entry {
    &:before {
      left: calc(-4.1vw - 18px);
      margin-left: calc(4.1vw + 9px);
      width: 18px;
      height: 18px;
      border: 4px solid var(--red);
      background: var(--body-bg);
    }
  }
}

@media only screen and (max-width: $md-phone-breakpoint) {
  .timeline--entry {
    h3 {
      font-size: 1.5rem;
    }
  }
}

@media only screen and (max-width: $phone-breakpoint) {
  .timeline--entry {
    &:after {
      font-size: 5vw;
      left: -10vw;
      top: 2.1vw;
    }

    header {
      flex-direction: column;
      align-items: flex-start;

      img {
        margin-bottom: calc(var(--space-1) + var(--space-half));
        max-width: 30px;
        max-height: 30px;
      }
    }
  }

  .details {
    > li {
      font-size: 1.3rem;
      margin-left: 20px;

      &:before {
        width: 8px;
        height: 8px;
        left: -20px;
      }
    }
  }
}

@media only screen and (max-width: $sm-phone-breakpoint) {
  .timeline--entry {
    &:before {
      left: calc(-4.1vw - 14px);
      margin-left: calc(4.1vw + 7px);
      width: 14px;
      height: 14px;
      border: 3px solid var(--red);
      background: var(--body-bg);
    }
  }
}
</style>
