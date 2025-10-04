<template>
    <svg
        v-if="name === 'arrow-up'"
        class="app-icon"
        width="10"
        height="15"
        viewBox="0 0 10 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M5 14.0032L5 2.00317M5 2.00317L9.00063 6.00317M5 2.00317L0.999365 6.00317"
            :stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
        />
    </svg>

    <svg
        v-if="name === 'cross'"
        class="app-icon"
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.99996 5.22223L1.37727 7.84492C1.12213 8.10007 0.641687 8.0333 0.304183 7.6958C-0.0333213 7.35829 -0.100086 6.87786 0.15506 6.62271L2.77775 4.00002L0.155017 1.37729C-0.100129 1.12214 -0.0333644 0.641701 0.30414 0.304197C0.641644 -0.0333071 1.12208 -0.100072 1.37723 0.155074L3.99996 2.77781L6.62282 0.154956C6.87796 -0.10019 7.3584 -0.0334256 7.6959 0.304079C8.03341 0.641583 8.10017 1.12202 7.84503 1.37717L5.22217 4.00002L7.84498 6.62283C8.10013 6.87797 8.03336 7.35841 7.69586 7.69592C7.35836 8.03342 6.87792 8.10019 6.62277 7.84504L3.99996 5.22223Z"
            :fill="currentColor"
        />
    </svg>
</template>

<script setup lang="ts">
import type { TButtonTypes } from "~/components/ui/Buttons/AppButton.vue";
import type { TIconName } from "~/components/ui/Icons/types";

interface IProps {
    type?: TButtonTypes;
    name: TIconName;
    active?: boolean;
    color?: string;
    activeColor?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    color: "#0B1739",
});

const currentColor = computed(() => {
    return props.active ? props.activeColor : props.color;
});
</script>

<style lang="scss">
.app-icon {
    path {
        stroke: v-bind(currentColor);
    }
}
</style>
