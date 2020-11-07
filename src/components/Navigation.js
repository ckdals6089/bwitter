import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => (
    <nav>
        <ul className="navUl">
            <li>
                <Link to="/" className="twitterLink" >
                    <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
                </Link>
            </li>
            <li>
                <Link
                    to="/profile"
                    className="profileLink"
                >
                    <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
                    <span className="marginTop10">
                        {userObj.displayName
                            ? `${userObj.displayName}의 Profile`
                            : "Profile"}
                    </span>
                </Link>
            </li>
        </ul>
    </nav>
);
export default Navigation;