import { ref } from 'vue';
import type { PageSections } from '@/types/PageSections';

const sections = ref<PageSections>({
  intro: {
    active: false,
    viewed: false,
    intersectionRatio: 0,
    threshold: 0,
  },
  resume: {
    active: false,
    viewed: false,
    intersectionRatio: 0,
    threshold: 0,
  },
  portfolio: {
    active: false,
    viewed: false,
    intersectionRatio: 0,
    threshold: 0,
  },
  contact: {
    active: false,
    viewed: false,
    intersectionRatio: 0,
    threshold: 0,
  },
});

export default sections;
