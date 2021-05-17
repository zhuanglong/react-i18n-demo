/* eslint-disable react/style-prop-object */
import React from 'react';
import {
  injectIntl,
  FormattedMessage,
  FormattedDate,
  FormattedTime,
  FormattedRelativeTime,
  FormattedNumber,
  FormattedPlural
} from 'react-intl';

import styles from './styles.scss';

const Row = ({ title, children }) => (
  <>
    <div
      style={{
        padding: '10px',
        backgroundColor: '#ccc',
        color: '#333',
        fontWeight: 'bold'
      }}
    >
      {title}
    </div>
    <div style={{ padding: '20px' }}>
      {children}
    </div>
  </>
);

const Segmentation = ({ title }) => (
  <div
    style={{
      padding: '5px',
      backgroundColor: '#eee',
      color: '#555'
    }}
  >
    {title}
  </div>
);

@injectIntl
class About extends React.Component {
  render() {
    const { intl } = this.props;
    // console.log(intl);
    // console.log(
    //   intl.formatNumber(123456.78, {
    //     style: 'currency',
    //     currency: intl.formats.money.currency
    //   })
    // );
    return (
      <div className={styles.bgColor}>
        <Row title="字符串">
          <FormattedMessage
            tagName="p"
            id="page.localeProvider.react"
            values={{
              name: 'React'
            }}
            defaultMessage="Hello, {name}!" // 如果 page.localeProvider.react 不存在或异常则使用默认信息
          />
        </Row>
        <Row title="字符串 - HTML标签">
          {/* <Segmentation title="展示标签" />
          <FormattedMessage // 这里报错，因为没有替换掉标签，不知咋搞
            tagName="p"
            id="page.localeProvider.react.html"
            values={{
              name: 'React'
            }}
          /> */}
          <Segmentation title="替换标签" />
          <FormattedMessage
            tagName="div"
            id="page.localeProvider.react.html"
            values={{
              p: (chunks) => <b>{chunks}</b>,
              name: 'React'
            }}
          />
        </Row>

        <Row title="日期时间">
          <p>
            <FormattedMessage
              id="page.localeProvider.title.date"
            />
            <FormattedDate
              value={Date.now()}
            />
          </p>
          <p>
            <FormattedMessage
              id="page.localeProvider.title.time"
            />
            <FormattedTime
              value={Date.now()}
            />
          </p>
          <p>
            <FormattedMessage
              id="page.localeProvider.title.relative"
            />
            <FormattedRelativeTime
              value={Date.now()}
            />
          </p>
        </Row>

        <Row title="数字量词">
          <p>
            <FormattedMessage
              id="page.localeProvider.unreadCount"
              values={{
                unreadCount: (
                  <strong
                    style={{
                      color: '#f30',
                      fontWeight: 'normal'
                    }}
                  >
                    <FormattedNumber
                      value={2}
                    />
                  </strong>
                ),
                notifications: (
                  <FormattedPlural
                    value={2}
                    one="notification"
                    other="notifications"
                  />
                )
              }}
            />
          </p>
        </Row>

        <Row title="货币、百分比">
          <p>
            <FormattedMessage
              id="page.localeProvider.title.number"
            />
            <FormattedNumber
              value={10000}
            />
          </p>
          <p>
            <FormattedMessage
              id="page.localeProvider.title.price"
            />
            <FormattedNumber
              value={123456.78}
              style="currency"
              currency={intl.formats.money.currency}
            />
          </p>
          <p>
            <FormattedMessage
              id="page.localeProvider.title.percent"
            />
            <FormattedNumber
              value={0.5}
              style="percent"
            />
          </p>
        </Row>
      </div>
    );
  }
}

export default About;
