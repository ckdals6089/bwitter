import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import Bweet from '../components/Biwtter/Bweet'
import CreateBweetForm from '../components/Biwtter/CreateBweetForm';

const Home = ({ userObj }) => {
    const [bweets, setBweets] = useState([]);
    useEffect(() => {
        dbService
            .collection("bweets")
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                const bweetArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setBweets(bweetArray);
            });
    }, []);

    return (
        <div className="container">
            <CreateBweetForm userObj={userObj} />
            <div className="marginTop30">
                {bweets.map((bweet) => (
                    <Bweet
                        key={bweet.id}
                        bweetObj={bweet}
                        isOwner={bweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};
export default Home;