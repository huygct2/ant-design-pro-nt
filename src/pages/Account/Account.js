import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage } from 'umi/locale';
import { Row, Col, Icon, Card, Form, Button, Divider, Avatar, Pagination } from 'antd';
import StandardTable from '@/components/StandardTable';
import AccountDetails from './AccountDetails';

import styles from './Account.less';

const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/* eslint react/no-multi-comp:0 */
@connect(aaa => {
  const { account, loading } = aaa;
  console.log('aaa ', aaa);
  return {
    account,
    loading: loading.models.account,
  };
})
@Form.create()
class AccountList extends PureComponent {
  state = {
    selectedRows: [],
  };

  columns = [
    {
      title: 'USER NAME',
      dataIndex: 'name',
      sorter: true,
      render: (text, record) => (
        <div onClick={() => this.toggleView(record)} className={styles.usernameCol}>
          <Avatar icon="user" />
          <Divider type="vertical" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: 'PHONE',
      dataIndex: 'phone',
      sorter: true,
    },
    {
      title: 'RECENT ACTIVITY',
      dataIndex: 'activity',
      sorter: true,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/fetch',
    });
  }

  toggleView = item => {
    const { dispatch } = this.props;
    dispatch({
      type: 'account/toggleView',
      payload: item,
    });
  };

  handleRefresh = () => {
    this.handleStandardTableChange({ current: 1, pageSize: 10 }, {}, {});
  };

  handleChangePagination = (page = 1, pageSize = 10) => {
    this.handleStandardTableChange({ current: page, pageSize }, {}, {});
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'account/fetch',
      payload: params,
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  renderCard() {
    const {
      account: { data, view, currentUser, VIEWS },
      loading,
    } = this.props;
    const { selectedRows } = this.state;
    if (view.key === VIEWS.list.key) {
      return (
        <Card bordered={false}>
          <div className={styles.list}>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
      );
    }
    return (
      <Card bordered={false}>
        <AccountDetails currentUser={currentUser} />
      </Card>
    );
  }

  render() {
    const {
      account: { data },
      route,
    } = this.props;
    return (
      <Row className={styles.account}>
        <Row className={styles.header}>
          <Col className={styles.contentsLeft}>
            <span>
              <Icon className={styles.icon} type={route.icon} />
              <span className={styles.title}>Users</span>
            </span>
          </Col>
          <Col className={styles.contentsRight}>
            <Button className={styles.button} icon="reload" onClick={this.handleRefresh} />
            <Button className={styles.button} icon="download" />
            <Pagination
              size="small"
              simple
              onChange={this.handleChangePagination}
              {...data.pagination}
            />
          </Col>
        </Row>
        <Row>{this.renderCard()}</Row>
      </Row>
    );
  }
}

export default AccountList;
