import sections from '../state/sections';

const threshold = 0;
const settings = {
  threshold: threshold,
  rootMargin: '-50% 0% -50% 0%',
};

const waypoint = (el) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const keyName = entry.target.id;

      if (!keyName) {
        return;
      }

      sections.value[keyName].threshold = threshold;
      sections.value[keyName].intersectionRatio = entry.intersectionRatio;

      if (entry.isIntersecting) {
        sections.value[keyName].viewed = true;
        sections.value[keyName].active = true;
      } else {
        sections.value[keyName].active = false;
      }
    });
  }, settings);

  observer.observe(el.value);
};

export default waypoint;
