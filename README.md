> 基于项目 [react-intl 多语言切换](https://github.com/zhuanglong/react-i18n-demo/tree/react-intl-demo)，修改为可映射语言标签到地址栏。

[项目地址](https://github.com/zhuanglong/react-i18n-demo/tree/react-intl-demo2)

## 实现原理

路由路径匹配语言标签，

```js
<Route path="(en-us|zh-cn|zh-tw|ja)" component={xxPage} />
```

首次进入拿到 URL 中的语言标签，这样就能加载对应的语言包，

```js
const languageTagOfURL = window.location.hash.split('/')[1];
```

切换语言时更改 URL 中的语言标签。

```js
// 更改 URL 中的语言标签
// 如 http://localhost:8080/#/en-us => http://localhost:8080/#/zh-cn
const hashArray = window.location.hash.split('/');
hashArray.shift();
hashArray[0] = tag;
history.replace(`/${hashArray.join('/')}`);
```

效果演示：

![](https://gitee.com/zloooong/image_store/raw/master/img/20210518174010.gif)
