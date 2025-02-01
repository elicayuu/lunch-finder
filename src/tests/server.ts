import { setupServer } from 'msw/node'

export * from 'msw'
export const server = setupServer()
