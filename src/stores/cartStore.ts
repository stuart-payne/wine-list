import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Wine } from '../types'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<(Wine & { id: number })[]>([])
  const id = ref(0)

  function addToCart(wine: Wine) {
    cart.value.push({ ...wine, id: id.value })
    id.value++
  }

  function removeFromCart(id: number) {
    cart.value.filter((w) => w.id !== id)
  }
  function clear() {
    cart.value = []
  }

  const total = computed(() => cart.value.reduce((acc, w) => acc + w.price, 0))
  return { cart, removeFromCart, addToCart, total, clear }
})
