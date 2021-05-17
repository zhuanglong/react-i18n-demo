/* eslint-disable quote-props */

// 自定义 formates
const formats = {
  date: {
    normal: {
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }
  },
  money: {
    currency: 'USD'
  }
};

const messages = {
  'hello': 'Hello!',
  'page.localeProvider.react': '{ name }, a JavaScript library for building user interfaces.',
  'page.localeProvider.react.html': '<p>{ name } makes it painless to create interactive UIs. Design simple views for each state in your application, and { name } will efficiently update and render just the right components when your data changes.</p><p>Declarative views make your code more predictable and easier to debug.</p>',
  'page.localeProvider.unreadCount': 'You have {unreadCount} new {notifications}',
  'page.localeProvider.title.date': 'Current date: ',
  'page.localeProvider.title.time': 'Current time: ',
  'page.localeProvider.title.relative': 'Relative current time: ',
  'page.localeProvider.title.number': 'Comma number: ',
  'page.localeProvider.title.price': 'Price: ',
  'page.localeProvider.title.percent': 'Percent: '
};

export default {
  formats,
  messages
};
