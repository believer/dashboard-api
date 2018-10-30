import axios from 'axios'
import { url } from 'inspector'

const typeOfAttachement = text => {
  switch (text.substr(-3)) {
    case 'png':
    case 'jpg':
    case 'gif':
    case 'jpeg':
      return 'image'
    default:
      return ''
  }
}

export const trelloNotifications = async (_, _args, ctx) => {
  if (!ctx.trelloToken) {
    return []
  }

  const { data } = await axios.get(
    `https://api.trello.com/1/members/${
      ctx.trelloUsername
    }/notifications/?key=${ctx.trelloKey}&token=${
      ctx.trelloToken
    }&filter=all&read_filter=unread&fields=all&limit=50&page=0&memberCreator=true&memberCreator_fields=avatarHash%2CfullName%2Cinitials%2Cusername`
  )

  return data.map(notification => ({
    ...notification,
    type_: notification.type,
    data: {
      ...notification.data,
      attachment: notification.data.attachment
        ? {
            attachmentType: typeOfAttachement(notification.data.attachment.url),
            url: notification.data.attachment.url,
          }
        : null,
    },
  }))
}

export const trelloMarkAsRead = async (_, { id }, ctx) => {
  if (!ctx.trelloToken) {
    return false
  }

  await axios.put(
    `https://api.trello.com/1/notifications/${id}?key=${ctx.trelloKey}&token=${
      ctx.trelloToken
    }`,
    {
      unread: false,
    }
  )

  return true
}

export const trelloMarkAllAsRead = async (_, _args, ctx) => {
  if (!ctx.trelloToken) {
    return false
  }

  await axios.post(
    `https://api.trello.com/1/notifications/all/read?key=${
      ctx.trelloKey
    }&token=${ctx.trelloToken}`
  )

  return true
}
