import { defineStore } from "pinia";
import { ref } from "vue";
import { getAllApartments, type IApartment } from "~/api";

export const useApartmentStore = defineStore("apartmentStore", () => {
  const apartments = ref<IApartment[]>([]);

  const getApartments = () => {
    apartments.value = getAllApartments();
  };

  return { apartments, getApartments };
});
