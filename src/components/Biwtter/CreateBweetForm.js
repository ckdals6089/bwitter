import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { storageService, dbService } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const CreateBweetForm = ({ userObj }) => {
    const [bweet, setbweet] = useState("");
    const [attachment, setAttachment] = useState("");
    //submit create bweet 
    const onSubmit = async (event) => {
        if (bweet === "") {
            return;
        }
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = storageService
                .ref()
                .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        //sign in as guest
        if (userObj.displayName === null) {
            const bweetObj = {
                text: bweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
                creatorName: "Guest",
                attachmentUrl
            };
            //collection bweet in firebase
            await dbService.collection("bweets").add(bweetObj);
            setbweet("");
            setAttachment("");
        }
        //sign in as social login 
        else {
            const bweetObj = {
                text: bweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
                creatorName: userObj.displayName,
                attachmentUrl,
            };
            await dbService.collection("bweets").add(bweetObj);
            setbweet("");
            setAttachment("");
        }
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setbweet(value);
    };

    //change attachment file to otehr one
    const onFileChange = (event) => {
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
        };
        if (Boolean(event.target.files[0])) {
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    const onClearAttachment = () => setAttachment("");
    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input
                    className="factoryInput__input"
                    value={bweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input
                id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="opacity0"
            />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img
                        alt=""
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    );
}
export default CreateBweetForm;