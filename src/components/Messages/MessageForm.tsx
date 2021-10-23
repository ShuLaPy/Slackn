import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input, Segment } from "semantic-ui-react";
import firebase from "../../firebase";
const MessageForm = (props: any) => {
  const { messageRef }: { messageRef: any } = props;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);
  const user = useSelector((state: any) => state.user);
  const { currentUser } = user;
  const channel = useSelector((state: any) => state.channel);
  const { currentChannel } = channel;
  const sendMessage = () => {
    if (message) {
      setLoading(true);
      messageRef
        .child(currentChannel.id)
        .push()
        .set(formattedMessage())
        .then(() => {
          setLoading(false);
          setMessage("");
        })
        .catch((error: any) => {
          console.log(error);
          setLoading(false);
          setErrors([...errors, error]);
        });
    } else {
      setErrors([...errors, { message: "Type Message" }]);
    }
  };

  const formattedMessage = () => {
    const messageData = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
      content: message,
    };

    return messageData;
  };

  return (
    <Segment className="message-form">
      <Button floated="left" icon="add" />
      <Input
        fluid
        floated="right"
        name="message"
        style={{ marginBottom: "0.7em" }}
        label={
          <Button
            icon="send"
            disabled={loading}
            loading={loading}
            onClick={sendMessage}
          />
        }
        labelPosition="right"
        value={message}
        className={
          errors.some((err) => err.message.includes("message")) ? "error" : ""
        }
        onChange={(e) => setMessage(e.target.value)}
        placeholder="type your message"
      />
    </Segment>
  );
};

export default MessageForm;
