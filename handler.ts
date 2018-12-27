import {
  gitHubMarkAllAsRead,
  gitHubMarkAsRead,
  gitHubNotifications,
} from './src/resolvers/github'
import {
  trelloMarkAllAsRead,
  trelloMarkAsRead,
  trelloNotifications,
} from './src/resolvers/trello'

import { ApolloServer } from 'apollo-server-lambda'
import { allNotifications } from './src/resolvers/notifications'
import { typeDefs } from './src/schema'

const resolvers = {
  Notifications: {
    __resolveType(obj) {
      if (obj.repository) {
        return 'GitHubNotification'
      }

      return 'TrelloNotification'
    },
  },
  Query: {
    allNotifications,
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
