import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { List, Image } from 'semantic-ui-react';


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
                    <span onClick={toggleEditing} className="cancelBtn">
                        Cancel
                    </span>
                </>
            ) : (
                    <>
                        <List>
                            <List.Item>
                                <Image avatar alt="" src='https://react.semantic-ui.com/images/avatar/small/rachel.png' />
                                <List.Content>
                                    <List.Header>
                                        <span className="bweet__writer">
                                            @{bweetObj.creatorName}
                                        </span></List.Header>
                                    <List.Description>
                                        <h4>{bweetObj.text}</h4>
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                        {bweetObj.attachmentUrl && <img className="bweetImage" alt="" src={bweetObj.attachmentUrl} />}
                        {isOwner ? (
                            <>
                                <div className="bweet__actions">
                                    <span onClick={onDeleteClick}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </span>
                                    <span onClick={toggleEditing}>
                                        <FontAwesomeIcon icon={faPencilAlt} />
                                    </span>
                                </div>
                            </>
                        ) : (
                                <div className="bweet__writer">
                                    <span>
                                        @{bweetObj.creatorName}
                                    </span>
                                </div>
                            )}
                    </>
                )}
        </div>
    );
};

export default Bweet;