import { ref } from 'vue';
import type { PageSections } from '@/types/PageSections';

const sections = ref<PageSections>({
  intro: {
    active: false,
    viewed: false,
  },
  resume: {
    active: false,
    viewed: false,
  },
  portfolio: {
    active: false,
    viewed: false,
  },
  contact: {
    active: false,
    viewed: false,
  },
});

export default sections;
