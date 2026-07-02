import { useCallback, useState, type Dispatch, type SetStateAction } from 'react'
import baseBookings from '../data/bookings.json'

export type DemoBooking = {
  id: string
  ref?: string
  stylistId: string
  stylistName: string
  serviceId: string
  serviceName: string
  date: string
  time: string
  price: number
  deposit: number
  status: 'confirmed' | 'pending' | 'cancelled'
  address: string
  notes?: string
  createdAt?: string
}

export type DemoFavorites = {
  hairstylistIds: string[]
  serviceIds: string[]
  hairstyleIds: string[]
}

export type DemoProfile = {
  name: string
  email: string
  phone: string
  avatar: string
  joinDate: string
  loyaltyPoints: number
  tier: string
  referralCode: string
  reviewsCount: number
  avgRating: number
}

type NotificationPreferences = {
  reminders: boolean
  offers: boolean
  sms: boolean
}

const STORAGE_KEYS = {
  bookings: 'hairly.demo.bookings.v1',
  favorites: 'hairly.demo.favorites.v1',
  profile: 'hairly.demo.profile.v1',
  notificationPreferences: 'hairly.demo.notificationPreferences.v1',
}

const DEFAULT_PROFILE: DemoProfile = {
  name: 'Sophia Laurent',
  email: 'sophia.laurent@email.com',
  phone: '+33 6 12 34 56 78',
  avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face',
  joinDate: 'Mars 2025',
  loyaltyPoints: 340,
  tier: 'Gold',
  referralCode: 'SOPHIA2026',
  reviewsCount: 3,
  avgRating: 4.8,
}

const DEFAULT_FAVORITES: DemoFavorites = {
  hairstylistIds: ['1', '2'],
  serviceIds: ['1'],
  hairstyleIds: ['1', '7'],
}

const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  reminders: true,
  offers: true,
  sms: true,
}

function isoFromToday(offset: number) {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  date.setHours(12, 0, 0, 0)
  return date.toISOString().slice(0, 10)
}

function createInitialBookings(): DemoBooking[] {
  return (baseBookings as DemoBooking[]).map((booking, index) => ({
    ...booking,
    date: index === 0 ? isoFromToday(7) : index === 1 ? isoFromToday(14) : booking.date,
  }))
}

function resolveInitialValue<T>(initialValue: T | (() => T)) {
  return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue
}

function readStoredValue<T>(key: string, initialValue: T | (() => T)) {
  const fallback = () => resolveInitialValue(initialValue)

  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback()
  } catch {
    return fallback()
  }
}

function writeStoredValue<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // The demo still works for the current session if storage is unavailable.
  }
}

export function useStoredState<T>(key: string, initialValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => readStoredValue(key, initialValue))

  const setStoredValue = useCallback<Dispatch<SetStateAction<T>>>(nextValue => {
    setValue(currentValue => {
      const resolvedValue = typeof nextValue === 'function'
        ? (nextValue as (currentValue: T) => T)(currentValue)
        : nextValue

      writeStoredValue(key, resolvedValue)
      return resolvedValue
    })
  }, [key])

  return [value, setStoredValue]
}

export function toggleId(ids: string[], id: string) {
  return ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id]
}

export function useDemoBookings() {
  return useStoredState<DemoBooking[]>(STORAGE_KEYS.bookings, createInitialBookings)
}

export function useDemoFavorites() {
  return useStoredState<DemoFavorites>(STORAGE_KEYS.favorites, DEFAULT_FAVORITES)
}

export function useDemoProfile() {
  return useStoredState<DemoProfile>(STORAGE_KEYS.profile, DEFAULT_PROFILE)
}

export function useNotificationPreferences() {
  return useStoredState<NotificationPreferences>(STORAGE_KEYS.notificationPreferences, DEFAULT_NOTIFICATION_PREFERENCES)
}
