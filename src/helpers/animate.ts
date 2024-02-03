interface Settings {
  root?: HTMLElement;
  rootMargin?: string;
  threshold?: number;
}

interface Viewed {
  value: boolean;
}

const animate = (
  el: null | HTMLElement,
  viewed: Viewed,
  settings?: Settings,
) => {
  if (el === null) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        viewed.value = true;
        observer.unobserve(entry.target);
      }
    });
  }, settings);

  observer.observe(el);
};

export default animate;
