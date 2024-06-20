import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import AboutPage from '../MUINavBar/MUINavBar';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <>
    <AboutPage />
    <div className="nav">
      {/* <Link to="/home">
        <h2 className="nav-title">Agenda</h2>
      </Link> */}
      <div>
        {/* If no user is logged in, show these links */}
        {/* {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )} */}

        {/* If a user is logged in, show these links */}
        {/* {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <Link className="navLink" to="/my-events">
              My Events
            </Link>

            <Link className="navLink" to="/my-groups">
              My Groups
            </Link>

            <Link className="navLink" to="/my-profile">
              My Profile
            </Link>

            <LogOutButton className="navLink" />
          </>
        )} */}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
    </>
  );
}

export default Nav;
