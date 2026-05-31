import { io } from 'socket.io-client'

// Queue pages only (CLAUDE-code.md §7). Not auto-connected; mock layer simulates
// queue-updated events in the dev build (see hooks/queries/useQueue.ts).
export const socket = io(process.env.NEXT_PUBLIC_API_URL ?? '', { autoConnect: false })
