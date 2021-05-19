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
    'antd': () => import(/* webpackChunkName: "antd.locale.en-us" */'antd/lib/locale/en_US'),
    'moment': () => null
  },
  'zh-cn': {
    // 对于第三方库，用 import() 并不能编译为懒加载，只有本项目的文件才可以，所以只能拷贝库的国际化文件过来修改
    'app': () => import(/* webpackChunkName: "locale.zh-cn" */'./locales/zh-cn'),
    'antd': () => import(/* webpackChunkName: "antd.locale.zh-cn" */'./antdLocales/zh_CN'), // 用自定义的
    'moment': () => import(/* webpackChunkName: "moment.locale.zh-cn" */'./momentLocales/zh-cn') // 用自定义的
  },
  'zh-tw': {
    'app': () => import(/* webpackChunkName: "locale.zh-tw" */'./locales/zh-tw'),
    'antd': () => import(/* webpackChunkName: "antd.locale.zh-tw" */'antd/lib/locale/zh_TW'),
    'moment': () => import(/* webpackChunkName: "moment.locale.zh-tw" */'moment/locale/zh-tw')
  },
  'ja': {
    'app': () => import(/* webpackChunkName: "locale.ja" */'./locales/ja'),
    'antd': () => import(/* webpackChunkName: "antd.locale.ja" */'antd/lib/locale/ja_JP'),
    'moment': () => import(/* webpackChunkName: "moment.locale.ja" */'moment/locale/ja')
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

export function IntlPro({ children }) {
  const [language, setLanguage] = useState(() => getPrevLanguage());
  const [languageFile, setLanguageFile] = useState();

  const chooseLanguage = async (tag) => {
    setLanguage(tag);
    localStorage.setItem('language', tag);

    // 下载语言包
    try {
      const file1 = await languageMap[tag]['app']();
      const file2 = await languageMap[tag]['antd']();
      await languageMap[tag]['moment']();
      moment.locale(tag);
      setLanguageFile({
        'app': file1.default,
        'antd': file2.default
      });
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('语言包加载失败');
    }
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
            formats={languageFile['app'].formats}
            messages={languageFile['app'].messages}
          >
            <ConfigProvider locale={languageFile['antd']}>
              {children(props)}
            </ConfigProvider>
          </IntlProvider>
        )}
      </IntlProContext.Consumer>
    </IntlProContext.Provider>
  ) : null;
}
