<script setup lang="ts">
import { ref, onMounted } from 'vue';
import animate from '../../helpers/animate';
import Skill from './Skill.vue';

import type { DevSkill } from '@/types/DevSkill';
import type { DesignSkill } from '@/types/DesignSkill';

const el = ref(null);
const viewed = ref(false);
const settings = { threshold: 0.33 };

interface Props {
  headline: string;
  skillset: DevSkill[] | DesignSkill[];
}

const props = defineProps<Props>();

onMounted(() => {
  animate(el, settings, viewed);
});
</script>

<template>
  <div ref="el" class="skillset animate" :class="{ viewed: viewed }">
    <h3>{{ headline }}</h3>
    <ul class="skills">
      <Skill
        v-for="(skill, index) in skillset"
        :key="index"
        :logo="skill.logo"
        :name="skill.name"
        :start_year="skill.start_year"
      ></Skill>
    </ul>
  </div>
</template>
