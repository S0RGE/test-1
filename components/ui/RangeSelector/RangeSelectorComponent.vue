<template>
  <div class="range-selection">
    <div v-if="title" class="range-selection__title">
      <span>{{ title }}</span>
    </div>
    <div class="range-selection__inputs">
      <label
        class="range-selection__input-label range-selection__input-label--start"
      >
        <span>От</span>
        <input
          v-model="minValue"
          class="range-selection__input"
          type="number"
          :min="min"
          :max="max"
          @input="updateRange"
        />
      </label>
      <label
        class="range-selection__input-label range-selection__input-label--end"
      >
        <span>До</span>
        <input
          v-model="maxValue"
          class="range-selection__input"
          type="number"
          :min="min"
          :max="max"
          @input="updateRange"
        />
      </label>
    </div>
    <div class="range-selection__slider-container">
      <div class="range-selection__track" />
      <div class="range-selection__range" :style="rangeStyle" />
      <input
        v-model.number="minValue"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        class="slider min-slider"
        @input="updateRange"
      />
      <input
        v-model.number="maxValue"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        class="slider max-slider"
        @input="updateRange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IRangeSelection } from '~/components/ui/RangeSelector/types';

interface IProps {
  min?: number;
  max?: number;
  modelValue?: IRangeSelection;
  title?: string;
  step?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  min: 0,
  max: 100,
  title: '',
  step: 1,
  modelValue: undefined,
});

const emit = defineEmits(['update:modelValue']);

const minValue = ref(Number(props.modelValue?.[0] ?? props.min));
const maxValue = ref(Number(props.modelValue?.[1] ?? props.max));

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      minValue.value = newValue[0];
      maxValue.value = newValue[1];
    } else {
      minValue.value = props.min;
      maxValue.value = props.max;
    }
  },
  { immediate: true }
);

const updateRange = () => {
  let min = Number(minValue.value);
  let max = Number(maxValue.value);

  if (min > max) {
    min = max;
    minValue.value = min;
  }

  if (max < min) {
    max = min;
    maxValue.value = max;
  }

  emit('update:modelValue', [min, max]);
};

const rangeStyle = computed(() => {
  const range = props.max - props.min;
  if (range === 0) return { left: '0%', width: '0%' };

  const minPercent = ((minValue.value - props.min) / range) * 100;
  const maxPercent = ((maxValue.value - props.min) / range) * 100;

  return {
    left: `${minPercent}%`,
    width: `${maxPercent - minPercent}%`,
  };
});
</script>

<style lang="scss">
.range-selection {
  &__title {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0px;
  }

  &__slider-container {
    position: relative;
    margin-bottom: 1rem;
    height: 20px;

    .slider {
      position: absolute;
      width: 100%;
      pointer-events: none;
      appearance: none;
      background: transparent;
      height: 16px;
      z-index: 1;
    }

    .max-slider {
      z-index: 2;
    }

    .slider::-webkit-slider-thumb {
      pointer-events: all;
      appearance: none;
      width: 14px;
      height: 14px;
      background: var(--primary-color);
      border-radius: 50%;
      cursor: pointer;
    }
  }

  &__track {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 3px;
    border-radius: 1.5px;
    background: var(--light-gray-color);
    transform: translateY(-50%);
  }

  &__range {
    position: absolute;
    top: 50%;
    height: 4px;
    background: var(--primary-color);
    transform: translateY(-50%);
  }

  &__inputs {
    display: flex;
    gap: 1rem;
    width: 100%;
  }
  &__input,
  &__input:active,
  &__input:hover,
  &__input:focus {
    width: max-content;
    min-width: 40px;
    border: none;
    outline: none;
    background-color: transparent;
    margin-left: 8px;

    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0px;
  }

  &__input-label {
    display: flex;
    align-items: center;
    flex: 1;
    color: var(--light-gray-color);
    font-size: 16px;

    &--start,
    &--end {
      justify-content: flex-start;
    }
  }
}
</style>
