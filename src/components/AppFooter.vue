<template>
  <footer id="footer">
    <span>Proudly built with</span>

    <a href="https://vuejs.org/" target="_blank">
      <img
        src="/images/icon-vuejs-green.svg"
        width="24"
        height="24"
        alt="Vue.js"
        loading="lazy"
      />
    </a>

    +

    <a href="https://wordpress.org/" target="_blank">
      <img
        src="/images/icon-wordpress-white.svg"
        width="24"
        height="24"
        alt="WordPress"
        loading="lazy"
      />
    </a>
  </footer>
</template>

<style lang="scss" scoped>
@import '../assets/css/vars';

footer {
  padding: var(--space-1) var(--space-4);
  background: rgba(0, 0, 0, 0.25);
  font-size: 14px;
  text-align: center;
  display: flex;
  gap: var(--space-1);
  justify-content: center;
  align-items: center;
}
</style>
