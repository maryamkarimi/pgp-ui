import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import LoaderButton from '../components/LoaderButton';
import { useAppContext } from '../libs/contextLib';
import { useFormFields } from '../libs/hooksLib';
import './Login.css';
import { Form } from 'react-bootstrap';

const Login = () => {
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length > 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
  };

  return (
    <Form style={{ width: '100%' }} onSubmit={handleSubmit}>
      <Form.Group size="lg" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          autoFocus
          type="email"
          value={fields.email}
          onChange={handleFieldChange}
        />
      </Form.Group>
      <Form.Group size="lg" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={fields.password}
          onChange={handleFieldChange}
        />
      </Form.Group>

      <LoaderButton
        block
        size="lg"
        type="submit"
        isLoading={isLoading}
        disabled={!validateForm()}
      >
          Login
      </LoaderButton>

      <div className="errorMsg">{error}</div>
    </Form>
  );
};

export default Login;
