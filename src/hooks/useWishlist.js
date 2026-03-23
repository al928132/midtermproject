import { useState } from 'react'

const KEY = 'wishlist'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState(load)

  function addToWishlist(destination) {
    setWishlist(prev => {
      const next = { ...prev, [destination.id]: destination }
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }

  function removeFromWishlist(id) {
    setWishlist(prev => {
      const next = { ...prev }
      delete next[id]
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }

  function isWishlisted(id) {
    return !!wishlist[id]
  }

  function toggleWishlist(destination) {
    if (isWishlisted(destination.id)) {
      removeFromWishlist(destination.id)
    } else {
      addToWishlist(destination)
    }
  }

  function updateWishlistItem(id, updates) {
    setWishlist(prev => {
      if (!prev[id]) return prev
      const next = { ...prev, [id]: { ...prev[id], ...updates } }
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }

  const items = Object.values(wishlist)

  return { items, wishlist, addToWishlist, removeFromWishlist, isWishlisted, toggleWishlist, updateWishlistItem }
}
