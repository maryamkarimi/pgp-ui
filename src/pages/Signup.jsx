import React, { useState } from 'react';
import LoaderButton from '../components/LoaderButton/LoaderButton';
import { useAppContext } from '../libs/contextLib';
import './Signup.css';
import { Auth } from 'aws-amplify';
import { Form, Input } from 'antd';

const Signup = () => {
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState();

  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');
    form.validateFields()
        .then((fields) => newUser === null ? handleSignupSubmit(fields) :
                                                     handleConfirmationSubmit(fields));
  };

  const handleSignupSubmit = (fields) => {
    setIsLoading(true);

    Auth.signUp({
      username: fields.email,
      password: fields.password,
    }).then((currentUser) => {
      setIsLoading(false);
      setNewUser(currentUser);
      setUserInfo(fields);
    }).catch((e) => {
      setError(e.message);
      setIsLoading(false);
    });
  };

  const handleConfirmationSubmit = (fields) => {
    setIsLoading(true);

    Auth.confirmSignUp(userInfo.email, fields.confirmationCode)
        .then(() => Auth.signIn(userInfo.email, userInfo.password))
        .then(() => {
          userHasAuthenticated(true);
        }).catch((e) => {
          setError(e.message);
          setIsLoading(false);
        });
  };

  const signUpFields = () =>
    <>
      <label>Email</label>
      <Form.Item name='email' rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>

      <label>Password</label>
      <Form.Item name='password' rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>

      <label>Confirm Password</label>
      <Form.Item name='confirmPassword' dependencies={['password']} rules={[
        {
          required: true,
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
          },
        }),
      ]}>
        <Input.Password />
      </Form.Item>

      {/* add sex, age, etc*/}
    </>;

  const confirmationFields = () =>
    <>
      <label>Confirmation Code</label>
      <Form.Item name='confirmationCode' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </>;

  return (
    <Form style={{ width: '100%' }} form={form} onFinish={handleSubmit}>

      {newUser === null ? signUpFields() : confirmationFields()}

      <Form.Item>
        <LoaderButton
          block
          size="lg"
          htmlType="submit"
          variant="success"
          isLoading={isLoading}
        >
          {newUser === null ? 'Sign up' : 'Verify'}
        </LoaderButton>
      </Form.Item>

      <div className="errorMsg">{error}</div>
    </Form>
  );
};


export default Signup;
