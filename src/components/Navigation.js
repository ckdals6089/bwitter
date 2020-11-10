import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faHome, faCalendar, faUser, faEnvelopeOpenText, faBell, faBookmark, faList, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

// const Navigation = ({ userObj }) => (
//     <nav className="navnav">
//         <ul className="navUlddddd">
//             <li>
//                 <Link to="/" className="twitterLinkd" >
//                     <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
//                 </Link>
//             </li>
//             <li>
//                 <Link
//                     to="/profile"
//                     className="profileLinkd"
//                 >
//                     <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
//                     <span className="marginTop10">
//                         {userObj.displayName
//                             ? `${userObj.displayName}의 Profile`
//                             : "Profile"}
//                     </span>
//                 </Link>
//             </li>
//         </ul>
//     </nav>
// );

const Navigation = ({ userObj }) => {
    return (
        <header>
            <div className="header_container">
                <div className="bwitterIcon">
                    <Link to="/" >
                        <FontAwesomeIcon icon={faTwitter} color={"White"} size="2x" />
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li><FontAwesomeIcon className="fontIcon" icon={faHome} size="1x" />Explore</li>
                        <li><FontAwesomeIcon className="fontIcon" icon={faCalendar} size="1x" />Explore</li>
                        <li><FontAwesomeIcon className="fontIcon" icon={faEnvelopeOpenText} size="1x" />Explore</li>
                        <li><FontAwesomeIcon className="fontIcon" icon={faBell} size="1x" />Explore</li>
                        <li><FontAwesomeIcon className="fontIcon" icon={faBookmark} size="1x" />Explore</li>
                        <li><FontAwesomeIcon className="fontIcon" icon={faList} size="1x" />Explore</li>
                        <li><FontAwesomeIcon className="fontIcon" icon={faEllipsisH} size="1x" />Explore</li>
                        <li><FontAwesomeIcon className="fontIcon" icon={faUser} size="1x" />Explore</li>
                    </ul>
                </nav>
                <Link
                    to="/profile"
                    className="profileLinkd">
                    <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
                    <span className="marginTop10">
                        {userObj.displayName
                            ? ` ${userObj.displayName}`
                            : "Profile"}
                    </span>
                </Link>
            </div>
        </header>
    )
}
export default Navigation;