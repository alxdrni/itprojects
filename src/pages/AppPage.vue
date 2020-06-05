<template>
  <div class="page">
    <slot />
    <app-alert />
  </div>
</template>

<script>
import AppAlert from './../components/AppAlert.vue'

export default {
  components: {
    AppAlert
  }
}
</script>

<style>
.page {
  flex: 1 1 0;
  padding-top: 60px;
}

.page__content {
  padding: 24px;
}

.page__content--single {
  display: flex;
  max-width: 448px;
  margin: 0 auto;

  & > * {
    flex: 1 1 0;
  }
}

.page__content--list {
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.page__content--full {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.page__text {
  font-size: 18px;
  line-height: 1.35;
  text-align: center;
}

.page__link {
  font-weight: 600;
  text-decoration: none;
  color: var(--vlack-color);

  &:hover {
    text-decoration: underline;
  }
}

@media (width < 640px) {
  .page {
    padding-bottom: 60px;
  }
}
</style>
