<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>

<template>
  <header class="heading">
    <h1>{{ title }}</h1>
    <div class="line-grid">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>

      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>

      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>

      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>

      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </header>
</template>

<style lang="scss">
@import '../../assets/css/vars';

header.heading {
  padding: 15px 20px 20px var(--space-4);
  transition: 0.3s all ease-in-out;
  margin-bottom: var(--space-8);
  position: relative;
  overflow: hidden;

  h1 {
    font-size: 8.8rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 0;
    opacity: 0;
    transform: translateX(-7vw);
  }

  .line-grid {
    display: flex;
    position: absolute;
    top: -20px;
    left: -4vw;

    span {
      min-height: 150px;
      width: 4px;
      margin-right: 8px;
      display: block;
      background: rgba(255, 255, 255, 0.1);
      transform: rotate(135deg);
      transition: 0.25s all;
      opacity: 0;
    }
  }
}

.viewed {
  header.heading {
    h1 {
      animation: headline-slide 1s cubic-bezier(0.28, 0.89, 0.76, 0.94);
      animation-fill-mode: both;
      animation-delay: 0.1s;
    }

    .line-grid {
      span {
        animation: span-line 0.1s ease-in-out;
        animation-fill-mode: both;

        @for $i from 1 through 50 {
          &:nth-child(#{$i}) {
            animation-delay: 0.01s * $i;
          }
        }
      }
    }
  }
}

@keyframes span-line {
  0% {
    opacity: 0;
    transform: rotate(135deg), translateX(-10px);
  }

  100% {
    opacity: 1;
    transform: rotate(135deg), translateX(0);
  }
}

@keyframes headline-slide {
  0% {
    opacity: 0;
    transform: translateX(-14vw);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@media only screen and (max-width: $md-tablet-breakpoint) {
  header.heading {
    h1 {
      font-size: 6.4rem;
    }

    .line-grid {
      left: -15vw;
    }
  }
}

@media only screen and (max-width: $tablet-breakpoint) {
  header.heading {
    h1 {
      font-size: 4.4rem;
    }

    .line-grid {
      left: -35vw;
    }
  }
}

@media only screen and (max-width: $phone-breakpoint) {
  header.heading {
    .line-grid {
      left: -50vw;
    }
  }
}

@media only screen and (max-width: $md-phone-breakpoint) {
  header.heading {
    padding-left: var(--space-2);

    .line-grid {
      left: -75vw;
    }
  }
}

@media only screen and (max-width: $xs-breakpoint) {
  header.heading {
    h1 {
      font-size: 3.6rem;
    }

    .line-grid {
      left: -95vw;
    }
  }
}
</style>
