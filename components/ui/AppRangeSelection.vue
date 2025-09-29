<template>
  <div class="range-selection">
    <div class="range-selection__inputs">
      <label class="range-selection__input-label">
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
      <label>
        <span class="range-selection__input-label">До</span>
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
      <div class="range-selection__track"></div>
      <div class="range-selection__range" :style="rangeStyle"></div>
      <input
        v-model="minValue"
        type="range"
        :min="min"
        :max="max"
        @input="updateRange"
        class="slider min-slider"
      />
      <input
        v-model="maxValue"
        type="range"
        :min="min"
        :max="max"
        @input="updateRange"
        class="slider max-slider"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
export type IRangeSelection = [number, number];

interface IProps {
  min: number;
  max: number;
  modelValue: IRangeSelection;
}

const props = withDefaults(defineProps<IProps>(), {
  min: 0,
  max: 100,
  modelValue: () => [20, 60],
});

const emit = defineEmits(["update:modelValue"]);

const minValue = ref(props.modelValue[0]);
const maxValue = ref(props.modelValue[1]);

const updateRange = () => {
  emit("update:modelValue", [minValue.value, maxValue.value]);
};

const rangeStyle = computed(() => {
  const minPercent =
    ((minValue.value - props.min) / (props.max - props.min)) * 100;
  const maxPercent =
    ((maxValue.value - props.min) / (props.max - props.min)) * 100;
  return {
    left: `${minPercent}%`,
    width: `${maxPercent - minPercent}%`,
  };
});
</script>

<style lang="scss">
.range-selection {
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
  }
  &__input,
  &__input:active,
  &__input:hover,
  &__input:focus {
    width: 80px;
    border: none;
    outline: none;
    background-color: transparent;
    margin-left: 8px;
  }

  &__input-label {
    color: var(--light-gray-color);

    font-size: 16px;
  }
}
</style>
