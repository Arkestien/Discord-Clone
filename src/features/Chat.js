import React, { useState, useEffect } from 'react'
import './Chat.css'
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from './appSlice';
import { selectUser } from './userSlice';
import db from '../firebase';
import firebase from 'firebase';

function Chat() {
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (channelId) {
            db.collection('channels').doc(channelId).collection('messages').orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => setMessages(
                    snapshot.docs.map(doc => doc.data())
                ))
        }
    }, [channelId])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('channels').doc(channelId).collection('messages').add({
            message: chatInput,
            user: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setChatInput("");
    }
    return (
        <div className='chat'>
            <ChatHeader channelName={channelName} />

            <div className='chat__messages'>
                {messages.map((message) => (
                    <Message
                        message={message.message}
                        user={message.user}
                        timestamp={message.timestamp}
                    />
                ))}
            </div>

            <div className='chat__input'>
                <AddCircleIcon fontSize="large" />
                <form>
                    <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                        type='text'
                        placeholder={!channelId ? "Please Select a Channel" : `Message #${channelName}`}
                        disabled={!channelId}
                    />
                    <button
                        disabled={!channelId}
                        className="chat__inputButton"
                        type='submit'
                        onClick={sendMessage}>
                        Send
                    </button>
                </form>
                <div className='chat__inputIcons'>
                    <CardGiftcardIcon fontSize="large" />
                    <GifIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
        </div>
    )
}

export default Chat
