import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Launcher } from './react-chat-window/es/index';
import { socket } from '../../../socketioConfig/socketioConfig';
import { setComicsDiscussed } from '../../../redux/actions';

const ChatWindow = ({ comics }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const room = comics.title;

  const [messageList, setMessage] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);

  const agentProfile = {
    teamName: comics.title,
    imageUrl: comics.imageUrl,
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BACK_END_DOMAIN}/chathistory?room=${room}`,
        { credentials: 'include' }
      );
      const chathistory = await response.json();

      const serializedChatHistory = chathistory.map((message) => {
        const messageCopy = message;
        messageCopy.time = moment(messageCopy.time).format('h:mm a');
        if (messageCopy.author.email === user.email) {
          messageCopy.author = 'me';
        } else {
          messageCopy.author = messageCopy.author.displayName.split(' ')[0];
        }
        return messageCopy;
      });

      setMessage((prev) => [...prev, ...serializedChatHistory]);
      // on new chat window opened/created => Join chatroom
      socket.emit('joinRoom', { author: user, chatRoom: room });
    };
    fetchChatHistory();

    // Message from server // admin
    socket.on('message', (message) => {
      const messageCopy = message;
      messageCopy.time = moment(messageCopy.time).format('h:mm a');
      if (messageCopy.author.email === user.email) {
        messageCopy.author = 'me';
      } else {
        messageCopy.author = messageCopy.author.displayName.split(' ')[0];
      }
      setMessage((prev) => [...prev, messageCopy]);
    });

    // Get room and users
    socket.on('roomUsers', ({ room, users }) => {
      setRoomUsers(users);
    });

    return () => {
      socket.emit('leaveRoom', { author: user });
      // socket.off('message');
      // socket.off('message', listenerFunc);
      socket.removeAllListeners('message');
      socket.removeAllListeners('roomUsers');
    };
  }, []);

  const onMessageWasSent = (message) => {
    const copyOfMessage = message;
    copyOfMessage.author = user;
    socket.emit('chatMessage', copyOfMessage);
  };

  const onFilesSelected = (fileList) => {
    console.log('Performing file(s) save...');

    const fileMassages = [];

    for (let i = 0; i < fileList.length; i++) {
      fileMassages.push({
        author: 'me',
        type: 'file',
        data: {
          url: 'future database url',
          fileName: fileList[i].name,
        },
      });
    }

    setMessage((prev) => [...prev, ...fileMassages]);
  };

  const onClose = () => {
    dispatch(setComicsDiscussed({}));
  };

  const serializeRoomUsers = (usersArray) => {
    const string = `${usersArray.length} user(s) in the chat: ${usersArray
      .map((user) => user.username)
      .join(', ')}`;
    return string;
  };

  return (
    <Launcher
      agentProfile={agentProfile}
      onMessageWasSent={onMessageWasSent}
      onFilesSelected={onFilesSelected}
      messageList={messageList}
      isOpen
      showEmoji
      handleClose={onClose}
      roomUsers={serializeRoomUsers(roomUsers)}
    />
  );
};

export default ChatWindow;
