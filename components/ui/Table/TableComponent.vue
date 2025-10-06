<template>
  <div class="table-wrapper">
    <h2 v-if="title" class="table-title">{{ title }}</h2>
    <table class="table">
      <thead class="table__head">
        <tr>
          <th v-for="column in columns" :key="column.key" class="table__header">
            <button
              v-if="column.sortable"
              class="table__sort-button"
              @click="toggleSort(column.key)"
            >
              {{ column.label }}
              <span class="table__sort-icon">
                {{ getSortIcon(column.key) }}
              </span>
            </button>
            <span v-else>{{ column.label }}</span>
          </th>
        </tr>
      </thead>
      <tbody class="table__body">
        <tr v-for="item in sortedData" :key="item.id" class="table__row">
          <td v-for="column in columns" :key="column.key" class="table__cell">
            <img
              v-if="column.key === 'imageLink'"
              :src="item[column.key]"
              :alt="item.name || 'Image'"
              class="table__image"
            />
            <span v-else>{{ item[column.key] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface IColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

interface IProps {
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>[];
  columns: IColumn[];
}

const props = defineProps<IProps>();

const sortKey = ref<string>('');
const sortOrder = ref<'asc' | 'desc'>('asc');

const toggleSort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

const getSortIcon = (key: string) => {
  if (sortKey.value !== key) return '↕';
  return sortOrder.value === 'asc' ? '↑' : '↓';
};

const sortedData = computed(() => {
  if (!sortKey.value) return props.data;

  return [...props.data].sort((a, b) => {
    const aVal = a[sortKey.value];
    const bVal = b[sortKey.value];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder.value === 'asc' ? aVal - bVal : bVal - aVal;
    }

    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();

    if (sortOrder.value === 'asc') {
      return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
    } else {
      return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
    }
  });
});
</script>

<style lang="scss">
.table-wrapper {
  width: 100%;
}

.table-title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary, #1a1a1a);
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;

  &__head {
    // background: var(--bg-secondary, #f8f9fa);
  }

  &__header {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: var(--text-secondary, #6b7280);
    border-bottom: 1px solid var(--border-color, #e5e7eb);
  }

  &__sort-button {
    background: none;
    border: none;
    font-weight: 600;
    color: var(--text-secondary, #6b7280);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: var(--text-primary, #1a1a1a);
    }
  }

  &__sort-icon {
    font-size: 0.8rem;
    opacity: 0.7;
  }

  &__row {
    &:hover {
      background: var(--bg-hover, #f9fafb);
    }

    &:not(:last-child) {
      border-bottom: 1px solid var(--border-color, #e5e7eb);
    }
  }

  &__cell {
    padding: 1rem;
    color: var(--text-primary, #1a1a1a);
  }

  &__image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
  }
}
</style>
