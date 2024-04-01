import { ref, computed } from 'vue'

export const usePagination = () => {
  const itemsPerPage = ref(10)
  let currentPage = ref(1)
  let totalItemsCount = ref(0)

  const pagesCount = computed(() => {
    return Math.ceil(totalItemsCount.value / itemsPerPage.value)
  })

  function setupPagination(newTotalItemsCount, itemsPerPageOverride = null) {
    currentPage.value = 1
    totalItemsCount.value = newTotalItemsCount
    itemsPerPage.value = itemsPerPageOverride || itemsPerPage.value
  }

  return {
    currentPage,
    itemsPerPage,
    totalItemsCount,
    pagesCount,
    setupPagination
  }
}
