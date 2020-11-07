import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            {isLoggedIn ? (
                <div className="routerContainer">
                    <Route exact path="/">
                        <Home userObj={userObj} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj={userObj} refreshUser={refreshUser} />
                    </Route>
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