import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Bweet = ({ bweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newBweet, setNewBweet] = useState(bweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this bweet?");
        if (ok) {
            await dbService.doc(`bweets/${bweetObj.id}`).delete();
            await storageService.refFromURL(bweetObj.attachmentUrl).delete();
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`bweets/${bweetObj.id}`).update({
            text: newBweet,
        });
        setEditing(false);
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewBweet(value);
    };
    return (
        <div className="bweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container bweetEdit">
                        <input
                            type="text"
                            placeholder="Edit your bweet"
                            value={newBweet}
                            required
                            onChange={onChange}
                        />
                        <input type="submit" value="Update Bweet" className="formBtn" />
                    </form>
                    <span onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </span>
                </>
            ) : (
                    <>
                        <h4>{bweetObj.text}</h4>
                        {bweetObj.attachmentUrl && <img alt="" src={bweetObj.attachmentUrl} />}
                        {isOwner ? (
                            <div className="bweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                                <span>
                                    by {bweetObj.creatorName}
                                </span>
                            </div>
                        ) : (
                                <div className="bweet__actions">
                                    <span>
                                        by {bweetObj.creatorName}
                                    </span>
                                </div>
                            )}
                    </>
                )}
        </div>
    );
};

export default Bweet;