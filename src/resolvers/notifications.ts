import { gitHubNotifications } from './github'
import { trelloNotifications } from './trello'

export const allNotifications = async (_, _args, ctx) => {
  const git = await gitHubNotifications(null, null, ctx)
  const trello = await trelloNotifications(null, null, ctx)

  return [...git, ...trello]
}
