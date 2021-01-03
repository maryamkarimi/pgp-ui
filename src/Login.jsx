import React from 'react';
import logo from './images/pgp-logo-black2.PNG';

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;

  return (
    <section className="login">
      <img src={logo} alt="" className="login-logo" />
      <div className="loginContainer">
        <div className="video">
          <iframe width="400" height="300" src="https://www.youtube.com/embed/Vfsux6V2-hU?controls=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        </div>

        <div className="login-form">
          <label>Email</label>
          <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
          <p className="errorMsg">{emailError}</p>
          <label>Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <p className="errorMsg">{passwordError}</p>
          <div className="btnContainer">
            {hasAccount ?
              (
                <>
                  <button onClick={handleLogin}>Sign in</button>
                  <p>
                    Don&apos;t have an account ?
                    <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
                  </p>
                </>
              ) :
              (
                <>
                  <button onClick={handleSignup}>Sign up</button>
                  <p>
                    Have an account ?
                    <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span>
                  </p>
                </>
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
