<script setup>
const props = defineProps({
  logo: String,
  name: String,
  startYear: Number,
});

const experience = (startYear) => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const years = currentYear - startYear;
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
      <small>{{ experience(startYear) }}</small>
    </div>
  </li>
</template>
