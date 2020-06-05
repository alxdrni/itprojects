<template>
  <div class="header">
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style>
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  padding: 0 24px;
  background-color: var(--white-color);
  box-shadow: 0 0 24px color(var(--dark-gray-color) alpha(0.25));

  & > * {
    flex: 0 0 auto;
    order: 3;

    &:not(:last-child) {
      margin-right: 12px;
    }
  }

  &::after {
    content: '';
    flex: 1 1 0;
    order: 2;
    width: 100%;
  }
}

.header__logo {
  order: 1;
  font-weight: 600;
  font-size: 24px;
  line-height: 48px;
  text-decoration: none;
  color: var(--black-color);
}

.header__logo--link {
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
