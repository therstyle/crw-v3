import { ref } from 'vue';

interface Section {
  active: boolean,
  viewed: boolean,
  intersectionRatio: number,
  threshold: number
}

interface Sections {
  [key: string]: Section;
}

const sections = ref<Sections>({
  intro: {
    active: false,
    viewed: false,
    intersectionRatio: 0,
    threshold: 0
  },
  resume: {
    active: false,
    viewed: false,
    intersectionRatio: 0,
    threshold: 0
  },
  portfolio: {
    active: false,
    viewed: false,
    intersectionRatio: 0,
    threshold: 0
  },
  contact: {
    active: false,
    viewed: false,
    intersectionRatio: 0,
    threshold: 0
  }
});

export default sections;
