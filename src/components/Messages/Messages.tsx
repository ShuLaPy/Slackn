import React, { Fragment, useEffect, useState } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessageForm from "./MessageForm";
import MessagesHeader from "./MessagesHeader";
import firebase from "../../firebase";
import { useSelector } from "react-redux";
import Message from "./Message";
const Messages = () => {
  const [messageRef, setMessageRef] = useState(
    firebase.database().ref("messages")
  );
  const [messages, setMessages] = useState<firebase.database.DataSnapshot[]>(
    []
  );
  const [uniqueUser, setUniqueUser] = useState(0);
  const user = useSelector((state: any) => state.user);
  const { currentUser } = user;
  const channel = useSelector((state: any) => state.channel);
  const { currentChannel } = channel;

  useEffect(() => {
    if (!currentChannel) return;
    addListener(currentChannel?.id);
    // return () => {
    //   cleanup;
    // };
  }, [currentChannel]);

  const addListener = (channelId: string) => {
    messageRef.child(channelId).on("child_added", (snap) => {
      setMessages((prevState) => [...prevState, snap.val()]);
    });
  };

  useEffect(() => {
    countUniqueUser(messages);
  }, [messages]);

  const countUniqueUser = (messages: any[]) => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    setUniqueUser(uniqueUsers.length);
  };

  const displayMessages = (messages: firebase.database.DataSnapshot[]) => {
    return messages.map((message: any) => {
      return (
        <Message key={message.timestamp} message={message} user={currentUser} />
      );
    });
  };

  return (
    <div className="message-box">
      <MessagesHeader channelName={currentChannel?.name} users={uniqueUser} />
      <Segment>
        <Comment.Group className="comment-box">
          {displayMessages(messages)}
        </Comment.Group>
      </Segment>
      <MessageForm messageRef={messageRef} />
    </div>
  );
};

export default Messages;
