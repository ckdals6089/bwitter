import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHome, faCalendar, faUser, faEnvelopeOpenText, faBell, faBookmark, faListAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const Navigation = ({ userObj }) => {
    return (
        <header>
            <div className="header_container">
                <Link to="/" >
                    <FontAwesomeIcon className="bwitterIcon" icon={faTwitter} color={"White"} size="2x" />
                </Link>
                <nav>
                    <ul>
                        <Link to="/"><li><FontAwesomeIcon className="fontIcon" icon={faHome} size="1x" />Home</li></Link>
                        <li><FontAwesomeIcon className="fontIcon" icon={faCalendar} size="1x" />Explore</li>
                        <li><FontAwesomeIcon className="fontIcon" icon={faBell} size="1x" />Notifications</li>
                        <li><FontAwesomeIcon className="fontIcon" icon={faEnvelopeOpenText} size="1x" />Message</li>
                        <li><FontAwesomeIcon className="fontIcon" icon={faBookmark} size="1x" />BookMarks</li>
                        <li><FontAwesomeIcon className="fontIcon" icon={faListAlt} size="1x" />Lists</li>
                        <li><FontAwesomeIcon className="fontIcon" icon={faEllipsisH} size="1x" />More</li>
                    </ul>
                </nav>
                <Link
                    className="linkProfile"
                    to="/profile">
                    <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
                    {userObj.displayName ? (
                        <span className="marginTop10">&#160;&#160;{userObj.displayName}</span>
                    ) : (
                            <span className="marginTop10">&#160;&#160;Guest</span>
                        )}
                </Link>
            </div>
        </header>
    )
}
export default Navigation;