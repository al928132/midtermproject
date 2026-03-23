import { useState } from 'react'

const KEY = 'trips'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

function save(trips) {
  localStorage.setItem(KEY, JSON.stringify(trips))
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export function useTrips() {
  const [trips, setTrips] = useState(load)

  function createTrip({ name, description }) {
    setTrips(prev => {
      const next = [...prev, { id: generateId(), name: name.trim(), description: description.trim(), destinationIds: [] }]
      save(next)
      return next
    })
  }

  function deleteTrip(id) {
    setTrips(prev => {
      const next = prev.filter(t => t.id !== id)
      save(next)
      return next
    })
  }

  function addDestinationToTrip(tripId, destinationId) {
    setTrips(prev => {
      const next = prev.map(t => {
        if (t.id !== tripId || t.destinationIds.includes(destinationId)) return t
        return { ...t, destinationIds: [...t.destinationIds, destinationId] }
      })
      save(next)
      return next
    })
  }

  function removeDestinationFromTrip(tripId, destinationId) {
    setTrips(prev => {
      const next = prev.map(t =>
        t.id === tripId
          ? { ...t, destinationIds: t.destinationIds.filter(id => id !== destinationId) }
          : t
      )
      save(next)
      return next
    })
  }

  function reorderDestinations(tripId, newOrder) {
    setTrips(prev => {
      const next = prev.map(t =>
        t.id === tripId ? { ...t, destinationIds: newOrder } : t
      )
      save(next)
      return next
    })
  }

  return { trips, createTrip, deleteTrip, addDestinationToTrip, removeDestinationFromTrip, reorderDestinations }
}
