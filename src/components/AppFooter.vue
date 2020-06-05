<template>
  <div class="footer">
    <slot />
  </div>
</template>

<script>
export default {
}
</script>

<style>
.footer {
  position: relative;
  z-index: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 24px;
  margin-top: 24px;

  & > * {
    flex: 0 0 auto;

    &:not(:last-child) {
      margin-right: 24px;
    }
  }
}

@media (width < 640px) {
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 60px;
    padding: 0 24px;
    margin-top: 0;
    background-color: var(--white-color);
    box-shadow: 0 0 24px color(var(--dark-gray-color) alpha(0.25));
  }
}
</style>
