import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
import { useAppContext } from '../libs/contextLib';
import { useFormFields } from '../libs/hooksLib';
import './Signup.css';
import { Auth } from 'aws-amplify';
import { Form } from 'react-bootstrap';

const Signup = () => {
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
    age: '',
    sex: '',
    confirmPassword: '',
    confirmationCode: '',
  });
  const history = useHistory();
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const validateForm = () => {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  };

  const validateConfirmationForm = () => {
    return fields.confirmationCode.length > 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);

    Auth.signUp({
      username: fields.email,
      password: fields.password,
    }).then((newUser) => {
      setIsLoading(false);
      setNewUser(newUser);
    }).catch((e) => {
      setError(e.message);
      setIsLoading(false);
    });
  };

  const handleConfirmationSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);

    Auth.confirmSignUp(fields.email, fields.confirmationCode)
        .then(() => Auth.signIn(fields.email, fields.password))
        .then(() => {
          userHasAuthenticated(true);
          history.push('/');
        }).catch((e) => {
          setError(e.message);
          setIsLoading(false);
        });
  };


  const renderConfirmationForm = () => {
    return (
      <Form onSubmit={handleConfirmationSubmit}>

        <Form.Group controlId="confirmationCode" size="lg">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <Form.Text muted>Please check your email for the code.</Form.Text>
        </Form.Group>

        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </LoaderButton>
      </Form>
    );
  };

  const renderForm = () => {
    return (
      <Form style={{ width: '100%' }} onSubmit={handleSubmit}>

        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </Form.Group>

        <Form.Group controlId="email" size="lg">
          <Form.Label>Sex</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.sex}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <Form.Group controlId="email" size="lg">
          <Form.Label>Age</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.age}
            onChange={handleFieldChange}
          />
        </Form.Group>

        <LoaderButton
          block
          size="lg"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Signup
        </LoaderButton>

        <div className="errorMsg">{error}</div>
      </Form>
    );
  };

  return (
    <>
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </>
  );
};


export default Signup;
