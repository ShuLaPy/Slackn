import React from "react";
import moment from "moment";
import { Comment, Image } from "semantic-ui-react";

const Message = (props: any) => {
  const { key, message, user }: { key: string; message: any; user: any } =
    props;

  const isOwner = (message: any, user: any): string => {
    return message.user.id === user.uid ? "message_self" : "";
  };

  const timeFromNow = (timeStamp: string) => moment(timeStamp).fromNow();

  const isImage = (message: any) => {
    return (
      message.hasOwnProperty("image") && !message.hasOwnProperty("content")
    );
  };

  return (
    <Comment>
      <Comment.Avatar src={message.user.avatar} />
      <Comment.Content className={isOwner(message, user)}>
        <Comment.Author as="a">{message.user.name}</Comment.Author>
        <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
        {isImage(message) ? (
          <Image src={message.image} className="message_image" />
        ) : (
          <Comment.Text>{message.content}</Comment.Text>
        )}
      </Comment.Content>
    </Comment>
  );
};

export default Message;
