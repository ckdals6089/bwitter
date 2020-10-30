import React, { useState } from "react";
import { dbService } from "fbase";

const Bweet = ({ bweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newbweet, setNewbweet] = useState(bweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this bweet?");
        if (ok) {
            await dbService.doc(`bweets/${bweetObj.id}`).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`bweets/${bweetObj.id}`).update({
            text: newbweet,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewbweet(value);
    };
    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Edit your bweet"
                            value={newbweet}
                            required
                            onChange={onChange}
                        />
                        <input type="submit" value="Update bweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
            ) : (
                    <>
                        <h4>{bweetObj.text}</h4>
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Bweet</button>
                                <button onClick={toggleEditing}>Edit Bweet</button>
                            </>
                        )}
                    </>
                )}
        </div>
    );
};

export default Bweet;