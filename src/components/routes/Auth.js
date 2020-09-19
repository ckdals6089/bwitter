import React, { useState } from "react";
import { authService } from "../../fbase";
import { auth } from "firebase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPasswrod] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPasswrod(value)
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data
            if (newAccount) {
                //create account
                data = authService.createUserWithEmailAndPassword(email, password);
            }
            else {
                //log in
                data = await authService.signInWithEmailAndPassword(email.password);
            }
            console.log(data)
        }
        catch (error) {
            setEmail(error.message)
        }
    }

    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
            <div>
                <button>Sign up with Google</button>
                <button>Sign up with GitHub</button>
            </div>
        </div>
    );
}
export default Auth;