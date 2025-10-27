import type { UserSession, Ticket } from '@/types'

const SESSION_KEY = 'ticketapp_session'
const TICKETS_KEY = 'ticketapp_tickets'

export function saveSession(session: UserSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export function getSession(): UserSession | null {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as UserSession
  } catch {
    return null
  }
}

export function isAuthenticated(): boolean {
  return !!getSession()
}

export async function mockRegister(
  email: string,
  password: string,
  name = '',
): Promise<UserSession> {
  await new Promise((r) => setTimeout(r, 400))
  const usersRaw = localStorage.getItem('ticketapp_users') || '[]'
  const users = JSON.parse(usersRaw) as Array<{ email: string; password: string; name?: string }>
  if (users.find((u) => u.email === email)) {
    throw new Error('Email already registered')
  }
  users.push({ email, password, name })
  localStorage.setItem('ticketapp_users', JSON.stringify(users))
  const session: UserSession = {
    token: btoa(email + ':' + Date.now()),
    email,
    name,
  }
  saveSession(session)
  return session
}

export async function mockLogin(email: string, password: string): Promise<UserSession> {
  await new Promise((r) => setTimeout(r, 350))
  const usersRaw = localStorage.getItem('ticketapp_users') || '[]'
  const users = JSON.parse(usersRaw) as Array<{ email: string; password: string; name?: string }>
  const found = users.find((u) => u.email === email && u.password === password)
  if (!found) throw new Error('Invalid email or password')
  const session: UserSession = {
    token: btoa(email + ':' + Date.now()),
    email,
    name: found.name || '',
  }
  saveSession(session)
  return session
}

export function loadTickets(): Ticket[] {
  const raw = localStorage.getItem(TICKETS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Ticket[]
  } catch {
    return []
  }
}

export function saveTickets(tickets: Ticket[]): void {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
}

export function createTicket(payload: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>): Ticket {
  const tickets = loadTickets()
  const newTicket: Ticket = {
    ...payload,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  tickets.unshift(newTicket)
  saveTickets(tickets)
  return newTicket
}

export function updateTicket(updatedTicket: Ticket): void {
  const tickets = loadTickets()
  const index = tickets.findIndex(t => t.id === updatedTicket.id)
  if (index === -1) throw new Error('Ticket not found')
  tickets[index] = { ...updatedTicket, updatedAt: new Date().toISOString() }
  saveTickets(tickets)
}

export function deleteTicket(id: string): void {
  const tickets = loadTickets()
  const filtered = tickets.filter(t => t.id !== id)
  if (filtered.length === tickets.length) throw new Error('Ticket not found')
  saveTickets(filtered)
}
