import React, { Component, Fragment } from 'react';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Form, Input, Upload, Select, Button, Checkbox, message } from 'antd';
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, toggleView } = this.props
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        message.success(`Action success from ${values.name}`);
        toggleView()
      }
    });
  }

  render() {
    const {
      form: { getFieldDecorator },
      toggleView
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

    return (
      <div className={styles.detailContents}>
        <div className={styles.header}>
          <h3>New user information</h3>
        </div>
        <div className={styles.detail}>
          <div className={styles.left}>
            <AvatarView avatar={this.getAvatarURL()} />
          </div>
          <div className={styles.right}>
            <Form className={styles.form} onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label={formatMessage({ id: 'app.account.detail.firstname' })}>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'app.account.detail.error-firstname' }, {}),
                    },
                  ],
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label={formatMessage({ id: 'app.account.detail.lastname' })}>
                {getFieldDecorator('lastname', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'app.account.detail.error-lastname' }, {}),
                    },
                  ],
                })(<Input />)}
              </FormItem>
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
              <FormItem {...formItemLayout} label={formatMessage({ id: 'app.account.detail.phone' })}>
                {getFieldDecorator('phone')(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label={formatMessage({ id: 'app.account.detail.timezone' })}>
                {getFieldDecorator('timezone')(
                  <Select placeholder="Time zone" style={{ width: '100%' }}>
                    <Option value="0">UTC−03</Option>
                    <Option value="1">UTC+7</Option>
                    <Option value="1">UTC+10</Option>
                    <Option value="1">UTC+11</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={formatMessage({ id: 'app.account.detail.language' })}>
                {getFieldDecorator('language')(
                  <Select placeholder="Time zone" style={{ width: '100%' }}>
                    <Option value="0">Viet Nam</Option>
                    <Option value="1">English</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label={formatMessage({ id: 'app.account.detail.user-role' })}>
                {getFieldDecorator('userRole')(
                  <Checkbox.Group style={{ width: '100%' }}>
                    <Checkbox className={styles.checkboxRole} value="0">Administrator</Checkbox>
                    <Checkbox className={styles.checkboxRole} value="1">Scheduler</Checkbox>
                    <Checkbox className={styles.checkboxRole} value="2">Field Agent</Checkbox>
                  </Checkbox.Group>
                )}
              </FormItem>

              <div className={styles.buttonFooter}>
                <Button
                  className={styles.cancelButton}
                  onClick={toggleView}
                >
                  Cancel
                </Button>
                <Button
                  className={styles.saveButton}
                  type="primary"
                  htmlType="submit"
                >
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountDetails;
