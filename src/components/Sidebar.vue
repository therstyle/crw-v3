<script setup>
import { ref, onMounted } from 'vue';
import loadData from '../helpers/loadData';
import sections from '../state/sections';
import API_BASE_PATH from '../state/apiBasePath';

const sidebar = ref({});
const props = defineProps({
  sections: Object,
});

const initData = async () => {
  const data = await loadData(`${API_BASE_PATH}/wp-json/cr/global`);
  sidebar.value = data.sidebar;
};

const isActive = (key) => {
  return sections.value[key].active;
};

onMounted(() => {
  initData();
});
</script>

<template>
  <nav class="main-nav">
    <div
      v-if="sidebar?.logo?.image && sidebar?.logo?.url"
      class="main-nav--logo"
    >
      <a :href="sidebar.logo.url" v-html="sidebar.logo.image"></a>
    </div>

    <ul class="main-nav--internal" v-if="sidebar?.internal">
      <li
        v-for="(link, index) in sidebar.internal"
        :key="index"
        :class="{ active: isActive(link.id) }"
        :id="`menu-${link.id}`"
      >
        <a :href="link.url">
          <span v-html="link.icon"></span>
          <span class="menu-title">{{ link.text }}</span>
        </a>
      </li>
    </ul>

    <ul class="main-nav--external">
      <li v-for="(link, index) in sidebar.external" :key="index">
        <a
          :href="link.url"
          v-html="link.icon"
          :id="link.id"
          target="_blank"
        ></a>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@import '../assets/css/vars';

@keyframes fade-in-out {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

nav.main-nav {
  width: var(--sidebar-width);
  max-height: 460px;
  background: var(--black);
  min-height: 100vh;
  height: -webkit-fill-available;
  height: fill-available;
  padding: var(--space-4) 0;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  transition: 0.3s all;

  > * {
    background: var(--black); //Hide Active Element drop shadow
  }

  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  li {
    display: flex;

    &.active {
      > a {
        svg {
          opacity: 1;
        }
      }
    }

    > a {
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      flex: 1;

      &:hover {
        svg {
          opacity: 1;
        }
      }
    }
  }
}

.main-nav--logo {
  min-height: 20vh;

  a {
    display: flex;
    padding: 0 1rem;
    align-items: center;
    justify-content: center;
  }
}

.main-nav--internal {
  min-height: 40vh;
  flex: 2;

  li {
    flex: 1;
    align-items: center;
    background: #000;
    transition: 0.3s all;

    &.active {
      position: relative;

      svg {
        fill: var(--red);
        fill-opacity: 1;
        transition: 0.3s all;

        path,
        g {
          fill: var(--red);
          fill-opacity: 1;
          transition: 0.3s all;
        }
      }

      .menu-title {
        opacity: 1;
        color: var(--red);
      }

      &:before {
        content: '';
        box-shadow: 0 0 75px var(--red);
        opacity: 0.5;
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
        animation: fade-in-out ease-in-out infinite 3s;
      }

      a {
        &:before {
          background: var(--red);
          animation: fade-in-out ease-in-out infinite 3s;
        }
      }
    }

    a {
      padding: 1rem;
      position: relative;
      flex-direction: column;
      color: rgba(255, 255, 255, 0.66);

      &:before {
        content: '';
        display: block;
        width: 2px;
        height: 100%;
        position: absolute;
        z-index: 99;
        right: 0;
      }

      &:hover {
        .menu-title {
          opacity: 1;
        }
      }
    }
  }

  svg {
    max-width: 40px;
    max-height: 40px;
    opacity: 0.5;
    transition: 0.3s ease-in-out;
  }
}

.menu-title {
  margin-top: 4px;
  display: block;
  font-size: 1.2rem;
  opacity: 0;
  transition: 0.3s all;
}

.main-nav--external {
  display: flex;
  min-height: 20vh;
  justify-items: flex-end;
  flex-direction: column;

  ul {
    justify-items: flex-end;
  }

  li {
    align-items: flex-end;

    &:first-child {
      flex: 1;
    }

    a {
      padding: 1rem;
    }
  }

  svg {
    max-width: 20px;
    max-height: 20px;
    opacity: 0.5;
    transition: 0.3s ease-in-out;
  }
}

@media only screen and (max-width: $phone-breakpoint) {
  .main-nav--internal {
    min-height: 0;

    li {
      a {
        padding: 1rem 0.5rem;
      }
    }

    svg {
      max-width: 24px;
      max-height: 24px;
    }
  }

  .main-nav--external {
    svg {
      max-width: 16px;
      max-width: 16px;
    }
  }

  .menu-title {
    font-size: 1rem;
  }
}

@media only screen and (max-width: $md-phone-breakpoint) {
  nav.main-nav {
    padding: var(--space-2) 0;
  }
}

@media only screen and (min-width: $md-phone-breakpoint) and (max-height: 650px) {
  nav.main-nav {
    padding: var(--space-2) 0;
  }

  .main-nav--internal {
    min-height: 0;

    li {
      a {
        padding: 1rem 0.5rem;
      }
    }

    svg {
      max-width: 24px;
      max-height: 24px;
    }
  }

  .main-nav--external {
    svg {
      max-width: 16px;
      max-width: 16px;
    }
  }

  .menu-title {
    font-size: 1rem;
  }
}
</style>
