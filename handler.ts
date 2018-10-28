import { ApolloServer } from 'apollo-server-lambda'
import {
  gitHubNotifications,
  gitHubMarkAsRead,
  gitHubMarkAllAsRead,
} from './src/resolvers/github'
import { typeDefs } from './src/schema'
import {
  trelloNotifications,
  trelloMarkAsRead,
  trelloMarkAllAsRead,
} from './src/resolvers/trello'

const resolvers = {
  Query: {
    gitHubNotifications,
    trelloNotifications,
  },
  Mutation: {
    gitHubMarkAllAsRead,
    gitHubMarkAsRead,
    trelloMarkAllAsRead,
    trelloMarkAsRead,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event }) => {
    return {
      gitHubToken: event.headers['x-github-token'],
      trelloKey: event.headers['x-trello-key'],
      trelloToken: event.headers['x-trello-token'],
      trelloUsername: event.headers['x-trello-username'],
    }
  },
})

export const graphql = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
})
