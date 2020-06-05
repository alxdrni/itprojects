<template>
  <component
    :is="tag"
    ref="el"
    :href="href"
    :class="{
      'button--small': small,
      'button--tiny': tiny,
      'button--round': round,
      'button--borderless': borderless,
      'button--paddingless': paddingless,
      'button--inverse': inverse
    }"
    :disabled="disabled"
    class="button"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    tiny: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    borderless: {
      type: Boolean,
      default: false
    },
    paddingless: {
      type: Boolean,
      default: false
    },
    inverse: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      deafult: false
    },
    href: {
      type: String,
      default: ''
    }
  },
  computed: {
    tag () {
      return this.href ? 'a' : 'button'
    }
  },
  mounted () {
    if (this.autofocus) this.$refs.el.focus()
  }
}
</script>

<style>
.button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--dark-gray-color);
  border-radius: 6px;
  margin: 0;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  color: var(--black-color);
  background-color: var(--white-color);
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;

  &:focus,
  &:hover {
    border-color: var(--black-color);
    color: var(--black-color);
    background-color: var(--white-color);

    & svg path,
    & svg polygon {
      fill: var(--black-color);
    }

    & > span {
      border-color: var(--black-color);
    }
  }

  & svg path,
  & svg polygon {
    fill: var(--dark-gray-color);
    transition: fill 0.2s;
  }

  & > span {
    position: absolute;
    top: 0;
    left: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 16px;
    padding: 0 4px;
    border: 1px solid var(--dark-gray-color);
    border-radius: 8px;
    font-size: 11px;
    line-height: 11px;
    background-color: var(--white-color);
    transform: translate(-50%, -50%);
    transition: all 0.2s;
  }

  &[disabled] {
    border-color: var(--gray-color);
    color: var(--gray-color);
    background-color: var(--white-color);
    cursor: default;

    &:focus,
    &:hover {
      border-color: var(--gray-color);
      color: var(--gray-color);
      background-color: var(--white-color);
    }

    & svg path,
    & svg polygon {
      fill: var(--gray-color);
    }

    & > span {
      border-color: var(--gray-color);
    }
  }
}

.button--inverse {
  position: relative;
  border-color: var(--black-color);
  color: var(--gray-color);
  background-color: var(--black-color);

  & svg path,
  & svg polygon {
    fill: var(--gray-color);
  }

  &:focus,
  &:hover {
    border-color: var(--black-color);
    color: var(--white-color);
    background-color: var(--black-color);

    & svg path,
    & svg polygon {
      fill: var(--white-color);
    }
  }

  &[disabled] {
    border-color: var(--gray-color);
    color: var(--white-color);
    background-color: var(--gray-color);

    & svg path,
    & svg polygon {
      fill: var(--white-color);
    }

    &:focus,
    &:hover {
      border-color: var(--gray-color);
      color: var(--white-color);
      background-color: var(--gray-color);

      & svg path,
      & svg polygon {
        fill: var(--white-color);
      }
    }
  }
}

.button--small {
  height: 28px;
}

.button--tiny {
  height: 18px;
}

.button--round {
  border-radius: 50%;
}

.button--borderless {
  border: none;
}

.button--paddingless {
  padding: 0;
}
</style>
