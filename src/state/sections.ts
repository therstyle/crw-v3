import { ref } from 'vue';

const sections = ref({
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
