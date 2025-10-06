import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getAllApartments, type IApartment } from '~/api';

export const useApartmentStore = defineStore('apartmentStore', () => {
  const apartments = ref<IApartment[]>([]);

  const getApartments = () => {
    apartments.value = getAllApartments();
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

  return {
    getApartments,
    apartments,
    priceRange,
    roomsRange,
    squareRange,
  };
});
