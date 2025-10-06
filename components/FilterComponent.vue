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
        :step="0.1"
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

  // Initialize filters from query params
  if (route.query.rooms) {
    selectedRooms.value = String(route.query.rooms).split(',').map(Number);
  }

  if (route.query.priceMin && route.query.priceMax) {
    selectedPrice.value = [
      Number(route.query.priceMin),
      Number(route.query.priceMax),
    ];
  }

  if (route.query.areaMin && route.query.areaMax) {
    selectedArea.value = [
      Number(route.query.areaMin),
      Number(route.query.areaMax),
    ];
  }
});

const roomsFilter = ref<number[]>([1, 2, 3, 4]);

const isRoomInRange = (room: number) => {
  return roomsRange.value.min <= room && roomsRange.value.max >= room;
};

const route = useRoute();
const router = useRouter();

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

const updateQueryParams = () => {
  const query: Record<string, string> = {};

  if (selectedRooms.value.length > 0) {
    query.rooms = selectedRooms.value.join(',');
  }

  if (selectedPrice.value) {
    query.priceMin = selectedPrice.value[0].toString();
    query.priceMax = selectedPrice.value[1].toString();
  }

  if (selectedArea.value) {
    query.areaMin = selectedArea.value[0].toString();
    query.areaMax = selectedArea.value[1].toString();
  }

  router.push({ query });
};

watch(
  [selectedRooms, selectedPrice, selectedArea],
  () => {
    updateQueryParams();

    // Update store filters
    appartmentStore.setFilters({
      rooms: selectedRooms.value,
      priceRange: selectedPrice.value || null,
      areaRange: selectedArea.value || null,
    });
  },
  { deep: true }
);

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
