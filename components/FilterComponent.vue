<template>
  <div class="apartments-filter">
    <div class="apartments-filter__rooms">
      <ui-button
        v-for="room in roomsFilter"
        :key="room"
        rounded
        plain
        :active="selectedRooms.includes(room)"
        :disabled="!isRoomInRange(room)"
        @click="selectRoom(room)"
      >
        <span>{{ room }}к</span>
      </ui-button>
    </div>
    <div class="apartments-filter__price">
      <ui-range-selector
        v-if="priceRange.min !== Infinity"
        v-model="selectedPrice"
        title="Стоимость квартиры, ₽"
        :min="priceRange.min"
        :max="priceRange.max"
      />
    </div>
    <div class="apartments-filter__area">
      <ui-range-selector
        v-if="squareRange.min !== Infinity"
        v-model="selectedArea"
        title="Площадь, м²"
        :min="squareRange.min"
        :max="squareRange.max"
      />
    </div>
    <div class="apartments-filter__actions">
      <ui-button append-icon="cross" plain text @click="resetFilters"
        >Сбросить параметры</ui-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IRangeSelection } from '~/components/ui/RangeSelector';
const appartmentStore = useApartmentStore();

const { priceRange, roomsRange, squareRange } = storeToRefs(appartmentStore);

onMounted(() => {
  appartmentStore.getApartments();
});

const roomsFilter = ref<number[]>([1, 2, 3, 4]);

const isRoomInRange = (room: number) => {
  return roomsRange.value.min <= room && roomsRange.value.max >= room;
};

const selectedRooms = ref<number[]>([]);
const selectRoom = (room: number) => {
  if (selectedRooms.value.includes(room)) {
    selectedRooms.value.splice(selectedRooms.value.indexOf(room), 1);
  } else {
    selectedRooms.value.push(room);
  }
};
const selectedPrice = ref<IRangeSelection>();
const selectedArea = ref<IRangeSelection>();

const resetFilters = () => {
  selectedRooms.value = [];
  selectedPrice.value = undefined;
  selectedArea.value = undefined;
};
</script>

<style lang="scss">
.apartments-filter {
  width: 400px;
  padding: 40px;
  border-radius: 10px;
  background: linear-gradient(
    135deg,
    rgba(174, 228, 178, 0.3) 0%,
    rgba(149, 208, 161, 0.3) 100%
  );

  @media screen and (max-width: 960px) {
    width: 318px;
    padding: 20px;
  }

  display: flex;
  flex-direction: column;
  gap: 24px;

  &__rooms {
    display: flex;
    gap: 16px;
  }

  &__price,
  &__area {
    ui-range-selector {
      width: 100%;
    }
  }
}
</style>
