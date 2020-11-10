import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Auth from '../routes/Auth/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile/Profile';
import Navigation from './Navigation/Navigation';
import SideBar from './Sidebar/SideBar';

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn ? (
                <div className="routerContainer">
                    <Navigation userObj={userObj} />
                    <Route exact path="/">
                        <Home userObj={userObj} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj={userObj} refreshUser={refreshUser} />
                    </Route>
                    <SideBar />
                </div>
            ) : (
                    <Route exact path="/">
                        <Auth />
                    </Route>
                )}
        </Router >
    )
}
export default AppRouter;