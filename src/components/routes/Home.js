import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Bweet from "components/Bweet";

const Home = ({ userObj }) => {
    const [bweet, setbweet] = useState("");
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
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("bweets").add({
            text: bweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setbweet("");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setbweet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={bweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="bweet" />
            </form>
            <div>
                {bweets.map((bweet) => (
                    <bweet
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