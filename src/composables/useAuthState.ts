import { ref } from 'vue'
import { getSession } from '@/lib/auth'
import type { UserSession } from '@/types'

const session = ref<UserSession | null>(getSession())

export function useAuthState() {
  const updateSession = () => {
    session.value = getSession()
  }

  const clearAuthSession = () => {
    session.value = null
  }

  return {
    session,
    updateSession,
    clearAuthSession
  }
}