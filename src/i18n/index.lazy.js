// 懒加载版本
/* eslint-disable quote-props */
import React, { useContext, useState, useEffect } from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import { ConfigProvider } from 'antd';
import moment from 'moment';

// 语言标签映射
const languageMap = {
  'en-us': {
    'app': () => import(/* webpackChunkName: "locale.en-us" */'./locales/en-us'),
    'antd': require('antd/lib/locale/en_US').default
  },
  'zh-cn': {
    'app': () => import(/* webpackChunkName: "locale.zh-cn" */'./locales/zh-cn'),
    'antd': require('antd/lib/locale/zh_CN').default,
    'moment': require('moment/locale/zh-cn').default
  },
  'zh-tw': {
    'app': () => import(/* webpackChunkName: "locale.zh-tw" */'./locales/zh-tw'),
    'antd': require('antd/lib/locale/zh_TW').default,
    'moment': require('moment/locale/zh-tw').default
  },
  'ja': {
    'app': () => import(/* webpackChunkName: "locale.ja" */'./locales/ja'),
    'antd': require('antd/lib/locale/ja_JP').default,
    'moment': require('moment/locale/ja').default
  }
};

// 默认语言
const defaultLanguage = 'en-us';

// 支持使用的语言
const supportLanguages = [
  { title: 'en-US', tag: 'en-us' },
  { title: '中文简体', tag: 'zh-cn' },
  { title: '中文繁体', tag: 'zh-tw' },
  { title: '日本語', tag: 'ja' }
];

// 获取上一次使用的语言
const getPrevLanguage = () => {
  // 匹配出语言标签
  const matched = (tag) => (languageMap[tag] ? tag : '');

  // 浏览器设置的语言，需要兼容 "en", "en-US", "fr", "fr-FR", "en-us", "fr-fr" 等等
  // https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language
  const prefixLanguage = {
    'cn': 'en-us',
    'zh': 'zh-cn'
  };
  let browserLanguage = navigator.language.toLowerCase();
  const blArr = browserLanguage.split('-');
  if (blArr.length === 1 && prefixLanguage[blArr[0]]) {
    browserLanguage = prefixLanguage[blArr[0]];
  }

  // 缓存的 || 浏览器设置的语言 || 默认语言
  const language = matched(localStorage.getItem('language'))
    || matched(browserLanguage)
    || defaultLanguage;

  moment.locale(language);
  localStorage.setItem('language', language);
  console.log(123);

  return language;
};

// 状态共享
const IntlProContext = React.createContext({
  language: '',
  chooseLanguage: () => null
});

// 切换语言组件
export const ChooseLanguageButton = () => {
  const { chooseLanguage } = useContext(IntlProContext);
  const intl = useIntl();
  return (
    <div style={{ position: 'fixed', right: '10px' }}>
      <select defaultValue={intl.locale} onChange={(event) => chooseLanguage(event.target.value)}>
        {supportLanguages.map((item) => (
          <option key={item.tag} value={item.tag}>{item.title}</option>
        ))}
      </select>
    </div>
  );
};

const prevLanguage = getPrevLanguage();
export function IntlPro({ children }) {
  const [language, setLanguage] = useState(prevLanguage);
  const [languageFile, setLanguageFile] = useState();

  const chooseLanguage = (tag) => {
    setLanguage(tag);
    localStorage.setItem('language', tag);

    // 下载语言包
    languageMap[tag]['app']().then((file) => {
      moment.locale(tag);
      setLanguageFile(file.default);
    }).catch(() => {
      // eslint-disable-next-line no-alert
      alert('语言包加载失败');
    });
  };

  useEffect(() => {
    chooseLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return languageFile ? (
    <IntlProContext.Provider value={{ language, chooseLanguage }}>
      <IntlProContext.Consumer>
        {(props) => (
          <IntlProvider
            locale={props.language}
            defaultLocale={defaultLanguage}
            formats={languageFile.formats}
            messages={languageFile.messages}
          >
            <ConfigProvider locale={languageMap[props.language]['antd']}>
              {children(props)}
            </ConfigProvider>
          </IntlProvider>
        )}
      </IntlProContext.Consumer>
    </IntlProContext.Provider>
  ) : null;
}
