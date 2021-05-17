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
    currency: 'JPY'
  }
};

const messages = {
  'hello': 'こんにちは!',
  'page.localeProvider.react': '{ name },はユーザーインタフェースを構築するためのjavascriptライブラリである。',
  'page.localeProvider.react.html': '<p>{ name } インタラクティブなuiを作るのに使いますアプリケーション内の各状態のシンプルなビューを設計し、データが変更されたときに、{ name }が効果的に正しいコンポーネントを更新してレンダリングします。</p><p>宣言ビューはコードをより予測可能にし、デバッグを容易にします。</p>',
  'page.localeProvider.unreadCount': '{ unreadCount }という新しい情報があります',
  'page.localeProvider.title.date': '現在の日付:',
  'page.localeProvider.title.time': '現在時間:',
  'page.localeProvider.title.relative': '現在の時間に対して:',
  'page.localeProvider.title.number': 'デジタルフォーマット:',
  'page.localeProvider.title.price': '価格:',
  'page.localeProvider.title.percent': 'パーセント:'
};

export default {
  formats,
  messages
};
