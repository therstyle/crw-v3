<script setup>
import {ref, onMounted} from 'vue';
import {animate, viewed} from '../../helpers/animate';
import Skill from './Skill.vue';

const el = ref(null);
const settings = ref({threshold: 0.33});

const props = defineProps({
	headline: String,
  skillset: Array,
});

onMounted(() => {
	animate(settings.value, el.value);
});
</script>

<template>
  <div ref="el" class="skillset animate" :class="{ viewed : viewed }">
    <h3>{{ headline }}</h3>
    <ul class="skills">
      <Skill v-for="(skill, index) in skillset" 
        :key="index"
        :logo="skill.logo"
        :name="skill.name"
        :startYear="skill.startYear"
      ></Skill>
    </ul>
  </div>
</template>