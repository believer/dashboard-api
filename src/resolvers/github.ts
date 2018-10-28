import axios from 'axios'

export const gitHubNotifications = async (_, _args, ctx) => {
  if (!ctx.gitHubToken) {
    return []
  }

  const { data } = await axios.get('https://api.github.com/notifications', {
    headers: {
      Authorization: `Token ${ctx.gitHubToken}`,
      'If-None-Match': '',
    },
  })

  return data.map(notification => ({
    ...notification,
    date: notification.updated_at,
    subject: {
      ...notification.subject,
      type_: notification.subject.type,
    },
  }))
}

export const gitHubMarkAsRead = async (_, { id }, ctx) => {
  if (!ctx.gitHubToken) {
    return false
  }

  await axios.patch(
    `https://api.github.com/notifications/threads/${id}`,
    null,
    {
      headers: {
        Authorization: `Token ${ctx.gitHubToken}`,
      },
    }
  )

  return true
}

export const gitHubMarkAllAsRead = async (_, _args, ctx) => {
  if (!ctx.gitHubToken) {
    return false
  }

  await axios.put(`https://api.github.com/notifications`, null, {
    headers: {
      Authorization: `Token ${ctx.gitHubToken}`,
    },
  })

  return true
}
