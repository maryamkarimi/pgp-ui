import React, { useState } from 'react';
import logo from '../../assets/images/pgp-logo-black2.png';
import Login from './Login/Login';
import Signup from './Signup/Signup';
import { Row, Col } from 'antd';
import './Home.less';

const Home = () => {
  const [hasAccount, setHasAccount] = useState(true);

  const XS_SPAN = 24;
  const XL_SPAN = 11;

  const LOGIN_FOOTER =
      <>
        Don&apos;t have an account ?
        <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
      </>;

  const SIGNUP_FOOTER =
      <>
        Have an account ?
        <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
      </>;

  return (
    <div className="login">
      <div>
        <img src={logo} alt="pgp" className="login-logo" />
      </div>

      <Col xs={{ offset: 1, span: 22 }} md={{ offset: 3, span: 18 }} className="loginContainer">
        <Row>
          <Col
            xs={{ offset: 2, span: 20 }}
            xl={{ offset: 1, span: 22 }}
            className="btnContainer space-between-row"
          >
            {hasAccount ?
                <Login xsSpan={XS_SPAN} xlSpan={XL_SPAN} footer={LOGIN_FOOTER}/> :
                <Signup xsSpan={XS_SPAN} xlSpan={XL_SPAN} footer={SIGNUP_FOOTER}/>
            }
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default Home;
