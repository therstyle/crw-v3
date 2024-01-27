<script setup>
import { ref, onMounted } from 'vue';
import animate from '../../helpers/animate';
import Flickity from 'flickity';

const el = ref(null);
const carousel = ref(null);
const viewed = ref(false);
const carouselWidth = ref(0);
const brandWidth = ref(200);
const draggable = ref(false);
const settings = { threshold: 1 };

const props = defineProps({
  featuredBrands: Array,
});

const isDraggable = () => {
  carouselWidth.value = carousel.value.offsetWidth;
  let i = 0;

  props.featuredBrands.forEach(() => {
    i++;
  });

  const brands = i;
  const threshold = carouselWidth.value - 50;
  const width = brandWidth.value * brands;

  draggable.value = threshold < width;
};

const initCarousel = () => {
  new Flickity(carousel.value, {
    freeScroll: true,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    cellAlign: 'left',
  });

  isDraggable();
};

onMounted(() => {
  initCarousel();
  animate(el, settings, viewed);
});
</script>

<template>
  <footer ref="el" class="featured-brands animate" :class="{ viewed: viewed }">
    <h5>Brands I've Worked With</h5>

    <div
      ref="carousel"
      class="brand-carousel"
      :class="{ draggable: draggable }"
    >
      <div
        class="brand"
        v-for="(featuredBrand, index) in featuredBrands"
        :key="index"
      >
        <img :src="featuredBrand.logo" :alt="featuredBrand.name" />
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import '../../assets/css/vars';
@import '../../assets/css/flickity.min.css';

.featured-brands {
  margin-top: var(--space-2);
  outline: 0 !important;

  * {
    outline: 0 !important;
  }
}

h5 {
  font-size: 1.3rem;
  text-transform: uppercase;
}

.brand-carousel {
  overflow: hidden;
}

.draggable {
  position: relative;
  &:hover {
    cursor: grab;
  }

  &:after {
    content: '';
    width: 15px;
    height: 100%;
    top: 0;
    right: -15px;
    bottom: 0;
    box-shadow: -14px 0 18px rgba(0, 0, 0, 0.33);
    position: absolute;
    display: block;
    z-index: 5000;
  }
}

.brand {
  min-width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  border-left: 1px solid var(--light-gray);
  padding: 0 var(--space-2);

  &:last-child {
    border-right: 1px solid var(--light-gray);
  }
}

@media only screen and (max-width: $phone-breakpoint) {
  .featured-brands {
    h5 {
      font-size: 1rem;
    }
  }
}
</style>
