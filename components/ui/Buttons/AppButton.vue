<template>
  <button :class="buttonClasses">
    <slot>
      <span v-if="icon" class="app-button__icon">
        <AppIcons :name="icon" />
      </span>
    </slot>
    <span v-if="appendIcon" class="app-button__icon app-button__icon--append">
      <AppIcons :name="appendIcon" />
    </span>
  </button>
</template>

<script setup lang="ts">
import AppIcons, { type TIconName } from "~/components/ui/Icons/AppIcons.vue";

export type TButtonTypes = "primary";

interface IProps {
  type?: TButtonTypes;
  rounded?: boolean;
  plain?: boolean;
  icon?: TIconName;
  appendIcon?: TIconName;
  active?: boolean;
  classes?: string | string[];
}

const props = defineProps<IProps>();

const buttonClasses = computed(() => {
  const classes = ["app-button"];

  if (typeof props.classes === "string") {
    classes.push(props.classes);
  } else if (Array.isArray(props.classes)) {
    classes.push(...props.classes);
  }

  if (props.active) {
    classes.push("app-button--active");
  }

  if (props.type) {
    classes.push(`app-button--${props.type}`);
  }

  if (props.rounded) {
    classes.push("app-button--rounded");
  }

  if (props.plain) {
    classes.push("app-button--plain");
  }

  return classes.concat(" ");
});
</script>

<style lang="scss">
.app-button {
  cursor: pointer;
  background-color: var(--base-bg-color);
  color: var(--main-font-color);

  border: 1px solid #0b173933;
  border-radius: 25px;
  padding: 8px 24px;

  transition: all 0.1s ease-in-out;

  &--active {
    background-color: var(--primary-color);
    color: var(--light-font-color);
  }

  &--primary {
    background-color: var(--primary-color);
    color: var(--light-font-color);

    svg {
      path {
        stroke: var(--light-font-color);
      }
    }
  }

  &--primary.app-button--active {
    background-color: var(--base-bg-color);
    color: var(--main-font-color);

    svg {
      path {
        stroke: var(--main-font-color);
      }
    }
  }

  // Round
  &--rounded {
    border-radius: 50%;
    padding: 10px 12px;

    width: 40px;
    height: 40px;
  }

  // Plain
  &--plain {
    border: none;
  }

  // Icon
  &__icon--append {
    margin-left: 8px;
  }
}
</style>
