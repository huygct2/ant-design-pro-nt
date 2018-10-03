import React, { PureComponent } from 'react';
import { formatMessage } from 'umi/locale';
import styles from './index.less';
import RightContent from './RightContent';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  render() {
    const { currentApp } = this.props;
    return (
      <div className={styles.header}>
        <span className={styles.title}>{formatMessage({ id: currentApp.locale })}</span>
        <RightContent {...this.props} />
      </div>
    );
  }
}
