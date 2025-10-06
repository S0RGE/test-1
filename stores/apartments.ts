import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAllApartments, type IApartment } from '~/api';

export const useApartmentStore = defineStore('apartmentStore', () => {
  const apartments = ref<IApartment[]>([]);
  const filters = ref({
    rooms: [] as number[],
    priceRange: null as [number, number] | null,
    areaRange: null as [number, number] | null,
  });

  const currentPage = ref(1);
  const itemsPerPage = ref(5);

  const displayedApartments = computed(() => {
    return filteredApartments.value.slice(
      0,
      currentPage.value * itemsPerPage.value
    );
  });

  const hasMore = computed(() => {
    return displayedApartments.value.length < filteredApartments.value.length;
  });

  const getApartments = () => {
    apartments.value = getAllApartments();
  };

  const setFilters = (newFilters: typeof filters.value) => {
    filters.value = newFilters;
  };

  const priceRange = computed(() => {
    const prices = apartments.value.map((apartment) => apartment.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  });

  const roomsRange = computed(() => {
    const rooms = apartments.value.map((apartment) => apartment.rooms);
    return {
      min: Math.min(...rooms),
      max: Math.max(...rooms),
    };
  });

  const squareRange = computed(() => {
    const squares = apartments.value.map((apartment) => apartment.square);
    return {
      min: Math.min(...squares),
      max: Math.max(...squares),
    };
  });

  const filteredApartments = computed(() => {
    return apartments.value.filter((apartment) => {
      // Room filter
      if (
        filters.value.rooms.length > 0 &&
        !filters.value.rooms.includes(apartment.rooms)
      ) {
        return false;
      }

      // Price filter
      if (filters.value.priceRange) {
        const [minPrice, maxPrice] = filters.value.priceRange;
        if (apartment.price < minPrice || apartment.price > maxPrice) {
          return false;
        }
      }

      // Area filter
      if (filters.value.areaRange) {
        const [minArea, maxArea] = filters.value.areaRange;
        if (apartment.square < minArea || apartment.square > maxArea) {
          return false;
        }
      }

      return true;
    });
  });

  return {
    getApartments,
    setFilters,
    currentPage,
    displayedApartments,
    filters,
    hasMore,
    priceRange,
    roomsRange,
    squareRange,
  };
});
