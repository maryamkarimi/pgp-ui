import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import LoaderButton from '../../../components/LoaderButton/LoaderButton';
import { useAppContext } from '../../../libs/contextLib';
import { Row, Col, Form, Input } from 'antd';
import { ADMIN_GROUP, COGNITO_GROUP_FIELD } from '../../../assets/constants/Constants';
import './Login.css';

const Login = ({ footer, xsSpan, xlSpan }) => {
  const { setIsAdmin, userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [error, setError] = useState('');

  const isAdmin = (user) => {
    return user.signInUserSession.accessToken.payload[COGNITO_GROUP_FIELD] != null &&
           user.signInUserSession.accessToken.payload[COGNITO_GROUP_FIELD].includes(ADMIN_GROUP);
  };

  const handleSubmit = () => {
    form.validateFields()
        .then((fields) => {
          setIsLoading(true);
          Auth.signIn(fields.email, fields.password)
              .then((user) => {
                setIsAdmin(isAdmin(user));
                userHasAuthenticated(true);
                setError('');
              })
              .catch((e) => {
                setError(e.message);
                setIsLoading(false);
              });
        });
  };

  return (
    <Row className="space-between-row">
      <Col xs={xsSpan} xl={xlSpan} className="login-form">
        <Form
          form={form}
          requiredMark={false}
          onFinish={handleSubmit}
          layout="vertical"
          className="login-form">
          <Form.Item name='email' label='Email' rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>

          <Form.Item name='password' label='Password' rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <LoaderButton
              block
              size="lg"
              htmlType="submit"
              isLoading={isLoading}
            >
            Login
            </LoaderButton>
          </Form.Item>
        </Form>

        <div className="errorMsg">{error}</div>
        <p>
          {footer}
        </p>
      </Col>
      <Col xs={xsSpan} xl={xlSpan} className="video">
        <iframe
          className="video-iframe"
          src="https://www.youtube.com/embed/Vfsux6V2-hU?controls=0"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write;
           encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Col>
    </Row>
  );
};

export default Login;
