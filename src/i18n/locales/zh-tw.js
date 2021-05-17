/* eslint-disable quote-props */

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
    currency: 'HKD'
  }
};

const messages = {
  'hello': '妳好！',
  'page.localeProvider.react': '{ name }，是一個用於構建用戶界面的 JAVASCRIPT 庫。',
  'page.localeProvider.react.html': '<p>{ name } 用於無痛創建交互式 UI。為您的應用程序中的每個狀態設計簡單的視圖，並且當你的數據更改時，{ name } 將有效地更新和渲染正確的組件。</p><p>聲明式視圖使您的代碼更可預測，更易於調試。</p>',
  'page.localeProvider.unreadCount': '你有{ unreadCount }條新信息',
  'page.localeProvider.title.date': '當前日期：',
  'page.localeProvider.title.time': '當前時間：',
  'page.localeProvider.title.relative': '相對當前時間：',
  'page.localeProvider.title.number': '數字格式化：',
  'page.localeProvider.title.price': '價格：',
  'page.localeProvider.title.percent': '百分比：'
};

export default {
  formats,
  messages
};
