> 本教程基于 [从零搭建 React 项目开发环境](https://github.com/zhuanglong/react-template)。

[我的项目实例](https://github.com/zhuanglong/react-template/tree/react-refresh)

什么是 React Fast Refresh？

> 快速刷新（Fast Refresh）是 React 官方为 React Native 开发的模块热替换（HMR）方案，由于其核心实现与平台无关，同时也适用于 Web。

[react-refresh github ](https://github.com/pmmmwh/react-refresh-webpack-plugin)

## 删除 `react-hot-loader` 相关代码

> 我的项目之前用的是 `react-hot-loader`，所以现在要把 `react-hot-loader` 相关代码删除。

删除依赖库

`npm uni @hot-loader/react-dom react-hot-loader`

.babelrc，删除

`"react-hot-loader/babel"`

webpack\webpack.dev.js，删除

```js
resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
```

src\index.js，修改

```js
import React from 'react';
import ReactDom from 'react-dom';

import getRouter from '@/router';

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <div>
      {RootElement}
    </div>,
    document.getElementById('app')
  );
}

renderWithHotReload(getRouter());
```

## 开始 React Fast Refresh


安装 `npm i -D @pmmmwh/react-refresh-webpack-plugin react-refresh`

.babelrc，新增

```
"env": {
    "development": {
      "plugins": ["react-refresh/babel"]
    }
  }
```

webpack\webpack.dev.js，新增

```js
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

plugins: [
    ...
    new ReactRefreshPlugin()
  ],
```

**限制**

有些情况下，维持状态并不是预期，所以为了可靠起见，Fast Refresh 遇到以下情况一概不保留状态（remount）：

- Class 类组件一律重刷（remount），状态会被重置，包括高阶组件返回的 Class 组件
- 不纯组件模块，所编辑的模块除导出 React 组件外，还导出了其它模块
- 匿名箭头函数如 export default () => <div />; 会导致状态丢失
- 特殊的，还可以通过 // @refresh reset 指令（在源码文件中任意位置加上这行注释）强制重刷（remount），最大限度地保证可用性

**测试**

Class 组件

可以看到，修改 Class 组件并不能保存 state 状态

![](https://gitee.com/zloooong/image_store/raw/master/img/20210114145344.gif)

Hook 组件能保存 state 状态

![](https://gitee.com/zloooong/image_store/raw/master/img/20210114150223.gif)

## 参考

- [一分钟用上热更新 React Fast Refresh（react-refresh）](https://zhuanlan.zhihu.com/p/172066527)
