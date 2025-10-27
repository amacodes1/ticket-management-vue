import { computed } from 'vue'
import { getSession, clearSession } from '@/lib/auth'

export function useAuth() {
  return {
    session: computed(() => getSession()),
    logout: () => {
      clearSession()
    },
  }
}
