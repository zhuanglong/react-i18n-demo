module.exports = {
  // 继承规则集
  extends: [
    'stylelint-config-standard',
    'stylelint-config-rational-order'
  ],

  // 自定义规则
  rules: {
    'no-duplicate-selectors': null, // 禁止样式表中的重复选择器
    'declaration-empty-line-before': null, // 声明前要求或禁止空行
    'at-rule-empty-line-before': null, // 规则前要求或禁止使用空行
    'at-rule-no-unknown': null, // 禁止使用未知规则
    'selector-pseudo-class-no-unknown': null, // 禁止未知的伪类选择器
    'property-no-unknown': null // 禁止未知属性
  }
};
