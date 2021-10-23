import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Input, Segment } from "semantic-ui-react";
import { v4 as uuidv4 } from "uuid";
import firebase from "../../firebase";
import FileModal from "./FileModal";
const MessageForm = (props: any) => {
  const { messageRef }: { messageRef: any } = props;
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);
  const [uploadstate, setUploadstate] = useState("");
  const [uploadTask, setUploadTask] = useState<any>(null);
  const [storageRef, setStorageRef] = useState(firebase.storage().ref());
  const [percentage, setPercentage] = useState(0);
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

  const formattedMessage = (fileUrl?: string) => {
    const messageData: any = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: currentUser.uid,
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
    };

    if (!fileUrl) {
      messageData["content"] = message;
    } else {
      messageData["image"] = fileUrl;
    }

    return messageData;
  };

  const uploadFile = (file: any, metadata: any) => {
    const pathToUpload = currentChannel.id;
    const filePath = `chat/public/${uuidv4()}.jpg`;
    setUploadstate("uploading");
    setUploadTask(storageRef.child(filePath).put(file, metadata));
  };

  useEffect(() => {
    if (!uploadTask) return;
    uploadTask.on(
      "state_changed",
      (snap: any) => {
        const percentUploaded = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
        setPercentage(percentUploaded);
      },
      (error: any) => {
        setErrors([...errors, error]);
        setUploadstate("error");
        setUploadTask(null);
      },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((downloadurl: string) => {
            sendFileMessage(downloadurl);
          })
          .catch((error: any) => {
            setErrors([...errors, error]);
            setUploadstate("error");
            setUploadTask(null);
          });
      }
    );
    return () => {
      uploadTask.off();
    };
  }, [uploadTask]);

  const sendFileMessage = (downloadUrl: string) => {
    messageRef
      .child(currentChannel.id)
      .push()
      .set(formattedMessage(downloadUrl))
      .then(() => {
        setUploadstate("done");
      })
      .catch((error: any) => {
        setErrors([...errors, error]);
      });
  };

  return (
    <Segment className="message-form">
      <Button
        floated="left"
        icon="cloud upload"
        onClick={() => setOpen(true)}
      />
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
      <FileModal
        open={open}
        closeModal={() => setOpen(false)}
        uploadFile={uploadFile}
      />
    </Segment>
  );
};

export default MessageForm;
