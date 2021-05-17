import React from 'react';
import styles from './styles.scss';

class About extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.title}>
          Hello
          <span className={styles.subTitle}> Sass</span>
        </div>
      </div>
    );
  }
}

export default About;
