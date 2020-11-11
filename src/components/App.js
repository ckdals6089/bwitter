import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import AppRouter from 'components/Router';
import { authService } from 'fbase';


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        if (user.displayName !== null) {
          setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
          });
        } if (user.displayName == null) {
          setUserObj({
            displayName: user.email,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
          });
        }
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />

      ) : (
          <div className="loadingIcon">
            <FontAwesomeIcon icon={faTwitter} color={"White"} size="10x" />
            <h2>Bwitter!!!!</h2>
          </div>
        )}
    </>
  );
}

export default App;
