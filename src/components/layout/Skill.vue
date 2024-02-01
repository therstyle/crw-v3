<script setup lang="ts">
import type { DevSkill } from '@/types/DevSkill';
import type { DesignSkill } from '@/types/DesignSkill';

const props = defineProps<DevSkill | DesignSkill>();

const experience = (startYear: string) => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const years = currentYear - parseInt(startYear);
  const yearString = years > 15 ? '15+' : years;
  const label = years > 1 ? 'Years' : 'Year';
  return `${yearString} ${label}`;
};
</script>

<template>
  <li>
    <div>
      <img :src="logo" :alt="name" loading="lazy" />
      <h6>{{ name }}</h6>
      <small>{{ experience(start_year) }}</small>
    </div>
  </li>
</template>
