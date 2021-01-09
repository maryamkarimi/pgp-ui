import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import LoaderButton from '../components/LoaderButton/LoaderButton';
import { useAppContext } from '../libs/contextLib';
import './Login.css';
import { Form, Input } from 'antd';

const Login = () => {
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    form.validateFields()
        .then((fields) => {
          setIsLoading(true);
          Auth.signIn(fields.email, fields.password)
              .then(() => {
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
    <>
      <Form form={form} onFinish={handleSubmit} style={{ width: '100%' }}>
        <label>Email</label>
        <Form.Item name='email' rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>

        <label>Password</label>
        <Form.Item name='password' rules={[{ required: true }]}>
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
    </>
  );
};

export default Login;
