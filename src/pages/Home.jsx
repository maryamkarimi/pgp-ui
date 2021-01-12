import React, { useState } from 'react';
import logo from '../assets/images/pgp-logo-black2.PNG';
import Login from './Login';
import Signup from './Signup';
import { Row, Col } from 'antd';
import './Home.less';

const Home = () => {
  const [hasAccount, setHasAccount] = useState(true);

  return (
    <div className="login">
      <div>
        <img src={logo} alt="" className="login-logo" />
      </div>

      <Row>
        <Col xs={{ offset: 2, span: 20 }} lg={{ offset: 4, span: 16 }} className="loginContainer">
          <Row style={{ width: '100%' }}>
            <Col xs={{ offset: 2, span: 20 }} md={{ offset: 1, span: 11 }} className="video">
              <iframe style={{ width: '100%', minHeight: '300px' }} src="https://www.youtube.com/embed/Vfsux6V2-hU?controls=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </Col>

            <Col xs={{ offset: 2, span: 20 }} md={{ offset: 1, span: 10 }} className="login-form">
              <div className="btnContainer">
                {hasAccount ?
                    (
                        <>
                          <Row>
                            <Login/>
                          </Row>
                          <Row>
                            <p>
                              Don&apos;t have an account ?
                              <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
                            </p>
                          </Row>
                        </>
                    ) :
                    (
                        <>
                          <Row>
                            <Signup/>
                          </Row>
                          <Row>
                            <p>
                              Have an account ?
                              <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
                            </p>
                          </Row>
                        </>
                    )}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
