import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAppContext } from '../../libs/contextLib';
import logo from '../../assets/images/pgp-logo-black2.PNG';
import { Button, Layout } from 'antd';
import { Auth } from 'aws-amplify';
import { ADMIN_CUES, ADMIN_IMAGES, LOGIN_PAGE } from '../../assets/constants/Constants';
import './PGPHeader.less';

const { Header } = Layout;

const PGPHeader = () => {
  const { userHasAuthenticated, isAdmin } = useAppContext();
  const history = useHistory();

  const handleLogout = () => {
    Auth.signOut().then(() => {
      userHasAuthenticated(false);
      history.push(LOGIN_PAGE);
    });
  };

  const adminLinks =
      <>
        <span className="separator">|</span>
        <Link to={ADMIN_CUES}>
          Cues
        </Link>
        <span className="separator">|</span>
        <Link to={ADMIN_IMAGES}>
          Images
        </Link>
      </>;

  return (
    <Header className="header">
      <Link to={LOGIN_PAGE}>
        <img src={logo} alt="" className="header-logo" />
      </Link>
      <div className="header-text">
        <Button type='link' onClick={handleLogout}>Log out</Button>
        {isAdmin && adminLinks}
      </div>
    </Header>
  );
};

export default PGPHeader;
