import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Upload, Select, Button } from 'antd';
import styles from './Account.less';

const FormItem = Form.Item;
const { Option } = Select;

const AvatarView = ({ avatar }) => (
  <Fragment>
    <div className={styles.avatarBox}>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload fileList={[]}>
        <div className={styles.button_view}>
          <Button icon="upload">
            <FormattedMessage id="app.settings.basic.avatar" defaultMessage="Change avatar" />
          </Button>
        </div>
      </Upload>
    </div>
  </Fragment>
);

@Form.create()
class AccountDetails extends Component {
  componentDidMount() {
    this.setBaseInfo();
  }

  setBaseInfo = () => {
    const { currentUser, form } = this.props;
    console.log('currentUser ', currentUser);
    Object.keys(form.getFieldsValue()).forEach(key => {
      const obj = {};
      obj[key] = currentUser[key] || null;
      form.setFieldsValue(obj);
    });
  };

  getAvatarURL() {
    const { currentUser } = this.props;
    if (currentUser.avatar) {
      return currentUser.avatar;
    }
    const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    return url;
  }

  getViewDom = ref => {
    this.view = ref;
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div className={styles.detail}>
        <div className={styles.left}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div>
        <div className={styles.right}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label={formatMessage({ id: 'app.account.detail.email' })}>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.account.detail.error-email' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={formatMessage({ id: 'app.account.detail.email' })}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'app.account.detail.error-email' }, {}),
                  },
                ],
              })(<Input />)}
            </FormItem>
            <div className={styles.buttonFooter}>
              <Button className={styles.cancelButton}>Cancel</Button>
              <Button className={styles.saveButton} type="primary">
                Save
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default AccountDetails;
