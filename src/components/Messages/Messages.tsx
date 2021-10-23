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

  const user = useSelector((state: any) => state.user);
  const { currentUser } = user;
  const channel = useSelector((state: any) => state.channel);
  const { currentChannel } = channel;

  useEffect(() => {
    console.log("CurrentChannel: ", currentChannel);
    addListener(currentChannel?.id);
    // return () => {
    //   cleanup;
    // };
  }, [currentChannel]);

  const addListener = (channelId: string) => {
    const loadedMessages: firebase.database.DataSnapshot[] = [];
    messageRef.child(channelId).on("child_added", (snap) => {
      loadedMessages.push(snap.val());
      setMessages(loadedMessages);
    });
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
      <MessagesHeader />
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
