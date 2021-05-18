> 本教程基于 [从零搭建 React 项目开发环境](https://github.com/zhuanglong/react-template)。

[项目源码](https://github.com/zhuanglong/react-i18n-demo/tree/react-intl-demo)

[react-intl](https://github.com/formatjs/formatjs) 是雅虎的语言国际化开源项目 FormatJS 的一部分，通过其提供的组件和 API 可以与 ReactJS 绑定。

安装 `npm i react-intl`

**创建语言文件**

参考[源码](https://github.com/zhuanglong/react-i18n-demo/tree/react-intl-demo/src/i18n/locales)

**创建一个国际化管理组件**

src\i18n\index.js，内容如下：

```js
/* eslint-disable quote-props */
import React, { useContext, useState } from 'react';
import { IntlProvider, useIntl } from 'react-intl';

// 语言标签映射
const languageMap = {
  'en-us': require('./locales/en-us').default,
  'zh-cn': require('./locales/zh-cn').default,
  'zh-tw': require('./locales/zh-tw').default,
  'ja': require('./locales/ja').default
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
  const [language, setLanguage] = useState(getPrevLanguage());

  const chooseLanguage = (tag) => {
    setLanguage(tag);
    localStorage.setItem('language', tag);
  };

  return (
    <IntlProContext.Provider value={{ language, chooseLanguage }}>
      <IntlProContext.Consumer>
        {(props) => (
          <IntlProvider
            locale={props.language}
            defaultLocale={defaultLanguage}
            formats={languageMap[props.language].formats}
            messages={languageMap[props.language].messages}
          >
            {children(props)}
          </IntlProvider>
        )}
      </IntlProContext.Consumer>
    </IntlProContext.Provider>
  );
}
```

<IntlProvider /> 组件传递语言配置 props，这样子组件就能获得 react-intl 提供的接口以及语言配置；

自定义 Context 组件 <IntlProContext.Provider /> 添加共享状态，<IntlProContext.Consumer /> 获取共享状态，然后传递给 <IntlProvider /> 组件；

<ChooseLanguageButton/> 是语言切换组件，当然也可以放到其他子组件里面（因为已经做了共享状态）。

**修改 src\router\index.js**

```js
import React from 'react';
import {
  Router, Switch, Route, Link, Redirect
} from 'react-router-dom';

import history from '@/router/history';
import { IntlPro, ChooseLanguageButton } from '@/i18n/index.lazy';

import Home from '@/pages/Home';
import About from '@/pages/About';
import asyncComponent from './asyncComponent';

const CounterState = asyncComponent(() => import(/* webpackChunkName: "CounterState" */'@/pages/CounterState'));
const CounterHook = asyncComponent(() => import(/* webpackChunkName: "CounterHook" */'@/pages/CounterHook'));

function getRouter() {
  return (
    <IntlPro>
      {() => (
        <Router history={history}>
          <div>
            <ChooseLanguageButton />
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/counterState">CounterState</Link></li>
              <li><Link to="/counterHook">CounterHook</Link></li>
            </ul>
            <hr />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/counterState" component={CounterState} />
              <Route path="/counterHook" component={CounterHook} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>
      )}
    </IntlPro>
  );
}

export default getRouter;
```

**组件内国际化**

参考[源码](https://github.com/zhuanglong/react-i18n-demo/tree/react-intl-demo/src/pages/About)

部分代码：

```js
@injectIntl
class About extends React.Component {
  render() {
    const { intl } = this.props;
    console.log(
      intl.formatNumber(123456.78, {
        style: 'currency',
        currency: intl.formats.money.currency
      })
    );
    return (
      <FormattedMessage
        tagName="p"
        id="page.localeProvider.react"
        values={{
          name: 'React'
        }}
        defaultMessage="Hello, {name}!" // 如果 page.localeProvider.react 不存在或异常则使用默认信息
      />
    );
  }
}
```

**查看效果**

![](https://gitee.com/zloooong/image_store/raw/master/img/20210517222236.gif)

## 语言文件按需加载

> 假设语言文件较大，那么就不应该全部打包，这样会影响首次加载速度。应该是切换语言时才去加载对应的语言文件，和组件按需加载一样。

参考[源码](https://github.com/zhuanglong/react-i18n-demo/blob/react-intl-demo/src/i18n/index.lazy.js)

实现原理，通过 `import(/* webpackChunkName: "locale.en-us" */'./locales/en-us').then()` 拿到语言配置再 set 状态。

![](https://gitee.com/zloooong/image_store/raw/master/img/20210517223906.gif)

## 参考

- https://juejin.im/post/6844904015654813703

- https://blog.csdn.net/qq_20574857/article/details/103632923

- [React项目国际化(antd)多语言开发]( https://juejin.cn/post/6844903874172551182) 

  多种库比较

- [antd/antd-mobile 国际化方案](https://github.com/ant-design/intl-example/blob/master/docs/understanding-antd-i18n.md) 

  国际化资源文件自动化生成