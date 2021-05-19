> 本教程基于 [react-intl 多语言切换](https://github.com/zhuanglong/react-i18n-demo/tree/react-intl-demo) 项目，添加 antd、moment.js 国际化。

[项目源码](https://github.com/zhuanglong/react-i18n-demo/tree/react-intl-antd-demo)

## 效果演示

![](https://gitee.com/zloooong/image_store/raw/master/img/20210520001216.gif)

## 实现

### antd

[文档](https://ant.design/components/config-provider-cn/)

主要通过 ConfigProvider 组件来加载国际化

```js
import { ConfigProvider, DatePicker } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

<ConfigProvider locale={zhCN}>
    <DatePicker />
</ConfigProvider>
```

### moment.js

```js
import moment from 'moment';
import moment/locale/zh-cn;
moment.locale('zh-cn');

moment().format('MMM ddd dddd');
moment().fromNow();
```

moment.js 会把所有的语言文件都打包，合理的情况是只打包用到的语言文件。

解决方法：

webpack\webpack.common.js 添加 IgnorePlugin 插件

```js
plugins: [
    ...
    // 忽略没有用到的 moment.js 的本地化内容
    // https://webpack.docschina.org/plugins/ignore-plugin/#example-of-ignoring-moment-locales
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    })
]
```
