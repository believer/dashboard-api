import { gql } from 'apollo-server-lambda'

export const typeDefs = gql`
  type GitHubRepository {
    name: String!
  }

  type GitHubSubject {
    title: String!
    url: String!
    type_: String!
    latestCommentUrl: String
  }

  type GitHubNotification {
    date: String!
    id: String!
    reason: String!
    repository: GitHubRepository!
    subject: GitHubSubject!
    unread: Boolean!
  }

  type TrelloList {
    name: String!
  }

  type TrelloCard {
    closed: Boolean
    due: String
    shortLink: String!
    name: String!
  }

  type TrelloAttachment {
    attachmentType: String
    url: String
  }

  type TrelloData {
    attachment: TrelloAttachment
    board: TrelloList
    card: TrelloCard
    listAfter: TrelloList
    listBefore: TrelloList
    text: String
  }

  type TrelloCreator {
    fullName: String!
  }

  type TrelloNotification {
    creator: TrelloCreator
    data: TrelloData!
    date: String!
    id: String!
    type_: String!
    unread: Boolean!
  }

  union Notifications = GitHubNotification | TrelloNotification

  type Query {
    allNotifications: [Notifications]!
    gitHubNotifications: [GitHubNotification!]!
    trelloNotifications: [TrelloNotification!]!
  }

  type Mutation {
    gitHubMarkAllAsRead: Boolean!
    gitHubMarkAsRead(id: ID!): Boolean!

    trelloMarkAllAsRead: Boolean!
    trelloMarkAsRead(id: ID!): Boolean!
  }
`
