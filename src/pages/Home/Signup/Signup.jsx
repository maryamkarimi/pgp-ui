import React, { useState } from 'react';
import LoaderButton from '../../../components/LoaderButton/LoaderButton';
import { useAppContext } from '../../../libs/contextLib';
import { Auth } from 'aws-amplify';
import { Form, Input } from 'antd';
import SignupForm from './SignupForm';
import { signUpUser } from '../../../services/api/user';
import './Signup.css';
import { LOGIN_PAGE } from '../../../assets/constants/Constants';

const Signup = ({ footer, xsSpan, xlSpan }) => {
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated, setIsAdmin } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState();
  const [userPassword, setUserPassword] = useState();

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
      setUserPassword(fields.password);
      setUserInfo({
        email: fields.email,
        age: fields.age,
        gender: (fields.gender || '') + (fields.customizeGender || ''),
        sexualOrientation: (fields.sexualOrientation || '') +
                           (fields.customizeSexualOrientation || ''),
        religion: (fields.religion || '') + (fields.customizeReligion || ''),
        politicalAffiliation: (fields.politicalAffiliation || ''),
        nationality: fields.nationality === undefined ? '' : fields.nationality.join(', '),
      });
    }).catch((e) => {
      setError(e.message);
      setIsLoading(false);
    });
  };

  const handleConfirmationSubmit = (fields) => {
    setIsLoading(true);

    Auth.confirmSignUp(userInfo.email, fields.confirmationCode)
        .then(() => Auth.signIn(userInfo.email, userPassword))
        .then(() => {
          userHasAuthenticated(true);
          signUpUser(userInfo).catch((errorMessage) => {
            if ('Underage user. Account disabled.' === errorMessage.message) {
              Auth.signOut().then(() => {
                userHasAuthenticated(false);
                setIsAdmin(false);
                history.push(LOGIN_PAGE);
              });
              setError(errorMessage.message);
            }
          });
        }).catch((e) => {
          setError(e.message);
          setIsLoading(false);
        });
  };

  const confirmationFields = () =>
    <Form.Item label='Confirmation Code' name='confirmationCode' rules={[{ required: true }]}>
      <Input />
    </Form.Item>;

  return (
    <Form className="login-form" layout="vertical" form={form} onFinish={handleSubmit}>
      {newUser === null ? <SignupForm xsSpan={xsSpan} xlSpan={xlSpan}/> : confirmationFields()}

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
      <p>
        {footer}
      </p>
    </Form>
  );
};


export default Signup;
