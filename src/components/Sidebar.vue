<script setup>
	import scrollRequest from '../helpers/scrollRequest';

	const props = defineProps({
		sections: Object,
    github: String,
    linkedin: String
	});
</script>

<template>
	<nav class="main-nav">
    <div class="main-nav--logo">
      <a href="#" v-on:click.prevent="scrollRequest('intro')">
        <svg width="71" height="43" viewBox="0 0 71 43" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60.2001 28C65.6001 25.8 69.1001 20.9 69.1001 14.8C69.1001 6.30005 62.4001 0.300049 53.2001 0.300049H33.7001L40.5001 9.90005H52.2001C55.8001 9.90005 58.4001 11.9 58.4001 14.8C58.4001 17.7 55.8001 19.7001 52.2001 19.7001H33.6001V42.5H44.0001V29.3H49.1001L58.5001 42.5H70.3001L60.2001 28Z" fill="#CC0000"/>
        <path d="M10.7999 21C10.7999 17 13.9999 9.90005 20.6999 9.90005H36.1999L29.1999 0.300049C25.6999 0.300049 23.4999 0.300049 19.1999 0.300049C11.4999 0.300049 6.79989 3.50005 3.59989 8.50005C-0.100111 14.4 -0.800111 25 1.69989 31.4C4.89989 39.7 11.6999 42.5 19.1999 42.5C23.9999 42.5 30.2999 42.5 30.2999 42.5V32.9001C30.2999 32.9001 23.4999 32.9001 20.6999 32.9001C13.9999 32.9001 10.7999 30.2 10.7999 21Z" fill="#CC0000"/>
        </svg>
      </a>
    </div>

    <ul class="main-nav--internal">
      <li class="menu-home" :class="{ active : sections.intro.active }">
        <a href="#" v-on:click.prevent="scrollRequest('intro')">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
          <path d="M33.4063 19.6243C32.7567 19.6243 32.2535 20.1251 32.2535 20.7779V36.5365H24.0787V30.1016C24.0787 29.498 23.5756 28.9703 22.9674 28.9703H17.0566C16.4064 28.9703 15.8827 29.4979 15.8827 30.1016V36.5365H7.72845V21.3011C7.72845 20.6929 7.22583 20.1877 6.57563 20.1877C5.96792 20.1877 5.46484 20.6929 5.46484 21.3011V37.6902C5.46484 38.2984 5.96792 38.8037 6.57563 38.8037H17.0566C17.6643 38.8037 18.1674 38.2984 18.1674 37.6902V31.2553H21.8145V37.6902C21.8145 38.2984 22.3176 38.8037 22.9674 38.8037H33.4063C34.0141 38.8037 34.5171 38.2984 34.5171 37.6902V20.778C34.5171 20.1252 34.0141 19.6243 33.4063 19.6243Z"  fill="white" fill-opacity="0.5"/>
          <path d="M39.6735 20.5231L30.5765 11.3873V5.15808C30.5765 4.50965 30.0524 4.00886 29.4026 4.00886C28.7945 4.00886 28.2915 4.50972 28.2915 5.15808V9.10221L20.7874 1.55382C20.5574 1.32127 20.2843 1.19604 20.012 1.19604C19.6976 1.19604 19.4248 1.32572 19.1945 1.55382L0.350385 20.3979C-0.101708 20.8495 -0.131643 21.574 0.350385 21.9898C0.769406 22.4728 1.49117 22.4415 1.94327 21.9898L20.012 3.96409L38.0386 22.1598C38.2264 22.3476 38.4997 22.4549 38.8561 22.4549C39.1704 22.4549 39.4427 22.3476 39.6735 22.1598C40.0929 21.7394 40.1242 20.9792 39.6735 20.5231Z"  fill="white" fill-opacity="0.5"/>
          </g>
          <defs>
          <clipPath id="clip0">
          <rect width="39.9999" height="40"  fill="white" fill-opacity="0.5" />
          </clipPath>
          </defs>
          </svg>

          <span class="menu-title">Home</span>
        </a>
      </li>

      <li class="menu-resume" :class="{ active : sections.resume.active }">
        <a href="#" v-on:click.prevent="scrollRequest('resume')">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.0204 20.9508C29.4713 20.3525 28.5368 20.3115 27.9385 20.8607C27.3401 21.4098 27.2991 22.3443 27.8483 22.9426C29.6598 24.918 30.6598 27.4836 30.6598 30.1639V36.5C30.6598 36.7951 30.4139 37.041 30.1188 37.041H9.86471C9.56963 37.041 9.32373 36.7951 9.32373 36.5V30.1639C9.32373 24.2787 14.1106 19.5 19.9877 19.5C25.3647 19.5 29.7418 15.123 29.7418 9.7459C29.7418 4.36885 25.3729 0 19.9959 0C14.6188 0 10.2418 4.37705 10.2418 9.7541C10.2418 11.3607 10.6434 12.959 11.3975 14.3689C11.7827 15.0902 12.6762 15.3525 13.3975 14.9672C14.1188 14.582 14.3811 13.6885 13.9959 12.9672C13.4713 11.9836 13.1926 10.877 13.1926 9.7541C13.1926 6 16.2418 2.95082 19.9959 2.95082C23.75 2.95082 26.7991 6 26.7991 9.7541C26.7991 13.5082 23.75 16.5574 19.9959 16.5574C12.4877 16.5574 6.3811 22.6639 6.3811 30.1721V36.5082C6.3811 38.4344 7.94668 40 9.87291 40H30.127C32.0532 40 33.6188 38.4344 33.6188 36.5082V30.1721C33.6188 26.7459 32.3401 23.4754 30.0204 20.9508Z" fill="white" fill-opacity="0.5"/>
          </svg>

          <span class="menu-title">Resume</span>
        </a>
      </li>

      <li class="menu-portfolio" :class="{ active : sections.portfolio.active }">
        <a href="#" v-on:click.prevent="scrollRequest('portfolio')">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0V40H40V0H0ZM37.6562 27.4219H27.4478V2.34375H37.6562V27.4219ZM25.1041 18.8281H14.8959V2.34375H25.1044V18.8281H25.1041ZM12.5522 27.4219H2.34375V12.5781H12.5522V27.4219ZM14.8959 21.1719H25.1044V37.6562H14.8959V21.1719ZM12.5522 2.34375V10.2344H2.34375V2.34375H12.5522ZM2.34375 29.7656H12.5522V37.6562H2.34375V29.7656ZM27.4478 37.6562V29.7656H37.6562V37.6562H27.4478Z" fill="white" fill-opacity="0.5"/>
          </svg>

          <span class="menu-title">Portfolio</span>
        </a>
      </li>

      <li class="menu-contact" :class="{ active : sections.contact.active }">
        <a href="#" v-on:click.prevent="scrollRequest('contact')">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M34.1393 5.86066C30.3607 2.08197 25.3443 0 20 0C14.6557 0 9.63934 2.08197 5.86066 5.86066C2.08197 9.63934 0 14.6557 0 20C0 25.3443 2.08197 30.3607 5.86066 34.1393C9.63934 37.918 14.6557 40 20 40C23.2541 40 26.4754 39.2049 29.3361 37.6885C30.0574 37.3115 30.3279 36.418 29.9508 35.6967C29.5738 34.9754 28.6803 34.7049 27.959 35.082C25.5246 36.3689 22.7787 37.0492 20 37.0492C10.5984 37.0492 2.95082 29.4016 2.95082 20C2.95082 10.5984 10.5984 2.95082 20 2.95082C29.4016 2.95082 37.0492 10.5984 37.0492 20C37.0492 23.1639 36.1639 24.9672 35.418 25.918C34.623 26.9426 33.5574 27.5246 32.4918 27.5246C31.0082 27.5246 29.5082 26.3443 29.5082 23.7049V12.2213C29.5082 11.4098 28.8443 10.7459 28.0328 10.7459C27.2213 10.7459 26.5574 11.4098 26.5574 12.2213V12.8689C24.7213 11.0246 22.1885 9.88525 19.3852 9.88525C13.8033 9.87705 9.26229 14.418 9.26229 20C9.26229 25.582 13.8033 30.1229 19.3852 30.1229C20.377 30.1229 21.3525 29.9836 22.2869 29.6967C23.0656 29.4672 23.5082 28.6393 23.2787 27.8607C23.0492 27.082 22.2213 26.6393 21.4426 26.8689C20.7787 27.0656 20.082 27.1721 19.3852 27.1721C15.4344 27.1721 12.2131 23.959 12.2131 20C12.2131 16.0492 15.4262 12.8279 19.3852 12.8279C23.3443 12.8279 26.5574 16.041 26.5574 20V23.7049C26.5574 28.1475 29.541 30.4754 32.4918 30.4754C34.4672 30.4754 36.3852 29.4754 37.7459 27.7295C39.2213 25.8361 40 23.1639 40 20C40 14.6557 37.918 9.63934 34.1393 5.86066Z" fill="white" fill-opacity="0.5"/>
          </svg>

          <span class="menu-title">Contact</span>
        </a>
      </li>
    </ul>

    <ul class="main-nav--external">
      <li>
        <a :href="github" class="menu-github" target="_blank">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0C4.475 0 0 4.475 0 10C0 14.425 2.8625 18.1625 6.8375 19.4875C7.3375 19.575 7.525 19.275 7.525 19.0125C7.525 18.775 7.5125 17.9875 7.5125 17.15C5 17.6125 4.35 16.5375 4.15 15.975C4.0375 15.6875 3.55 14.8 3.125 14.5625C2.775 14.375 2.275 13.9125 3.1125 13.9C3.9 13.8875 4.4625 14.625 4.65 14.925C5.55 16.4375 6.9875 16.0125 7.5625 15.75C7.65 15.1 7.9125 14.6625 8.2 14.4125C5.975 14.1625 3.65 13.3 3.65 9.475C3.65 8.3875 4.0375 7.4875 4.675 6.7875C4.575 6.5375 4.225 5.5125 4.775 4.1375C4.775 4.1375 5.6125 3.875 7.525 5.1625C8.325 4.9375 9.175 4.825 10.025 4.825C10.875 4.825 11.725 4.9375 12.525 5.1625C14.4375 3.8625 15.275 4.1375 15.275 4.1375C15.825 5.5125 15.475 6.5375 15.375 6.7875C16.0125 7.4875 16.4 8.375 16.4 9.475C16.4 13.3125 14.0625 14.1625 11.8375 14.4125C12.2 14.725 12.5125 15.325 12.5125 16.2625C12.5125 17.6 12.5 18.675 12.5 19.0125C12.5 19.275 12.6875 19.5875 13.1875 19.4875C17.1375 18.1625 20 14.4125 20 10C20 4.475 15.525 0 10 0Z" fill="white" fill-opacity="0.5"/>
          </svg>
        </a>
      </li>

      <li>
        <a :href="linkedin" class="menu-linkedin" target="_blank">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 12.1614V19.5555H15.7134V12.6566C15.7134 10.9235 15.0933 9.74078 13.5417 9.74078C12.3572 9.74078 11.6524 10.5379 11.3423 11.3089C11.2292 11.5846 11.2001 11.9682 11.2001 12.3541V19.5555H6.91198C6.91198 19.5555 6.96973 7.87101 6.91198 6.66041H11.1997V8.48824C11.191 8.50191 11.1797 8.51665 11.1715 8.5299H11.1997V8.48824C11.7693 7.61085 12.7867 6.35747 15.0638 6.35747C17.885 6.35743 20 8.2005 20 12.1614ZM2.42646 0.444336C0.959506 0.444336 0 1.40654 0 2.67187C0 3.90963 0.931746 4.90103 2.36954 4.90103H2.39818C3.89355 4.90103 4.82352 3.90981 4.82352 2.67187C4.79535 1.40654 3.89355 0.444336 2.42646 0.444336ZM0.254675 19.5555H4.54114V6.66041H0.254675V19.5555Z" fill="#7F7F7F"/>
          </svg>
        </a>
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
  padding: var(--space-4) 0;
  box-shadow: 0 15px 30px rgba(0,0,0,0.25);
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
        opacity: .5;
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
      color: rgba(255,255,255,0.66);

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
      //margin-bottom: 20px;
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