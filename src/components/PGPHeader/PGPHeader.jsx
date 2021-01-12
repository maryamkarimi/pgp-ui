import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAppContext } from '../../libs/contextLib';
import logo from '../../assets/images/pgp-logo-black2.PNG';
import { Button, Layout } from 'antd';
import { Auth } from 'aws-amplify';
import { LOGIN_PAGE } from '../../assets/constants/Constants';
import './PGPHeader.less';

const { Header } = Layout;

const PGPHeader = () => {
  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();

  const handleLogout = () => {
    Auth.signOut().then(() => {
      userHasAuthenticated(false);
      history.push(LOGIN_PAGE);
    });
  };

  return (
    <Header className="header">
      <Link to={LOGIN_PAGE}>
        <img src={logo} alt="" className="header-logo" />
      </Link>
      <Button type='link' onClick={handleLogout}>Log out</Button>
    </Header>
  );
};

export default PGPHeader;
