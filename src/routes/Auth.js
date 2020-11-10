import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTwitter,
    faGoogle,
    faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { authService, firebaseInstance } from 'fbase';
import AuthForm from 'components/AuthForm';

const Auth = () => {
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };
    return (
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="6x"
                style={{ marginBottom: 50 }}
            />
            <AuthForm />
            <div>
                <div className="authBtns">
                    <button onClick={onSocialClick} name="google" className="authBtn">
                        Continue with Google&#160;<FontAwesomeIcon icon={faGoogle} size="2x" />
                    </button>
                    <button onClick={onSocialClick} name="github" className="authBtn">
                        Continue with Github&#160;<FontAwesomeIcon icon={faGithub} size="2x" />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Auth;