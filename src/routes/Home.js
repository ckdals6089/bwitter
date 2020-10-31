import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Bweet from "components/Bweet";
import CreateBweetForm from "components/CreateBweetForm";

const Home = ({ userObj }) => {
    const [bweets, setbweets] = useState([]);
    useEffect(() => {
        dbService.collection("bweets").onSnapshot((snapshot) => {
            const bweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setbweets(bweetArray);
        });
    }, []);

    return (
        <div>
            <CreateBweetForm userObj={userObj} />
            <div>
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