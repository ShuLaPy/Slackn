import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Icon, Input, Menu, Modal } from "semantic-ui-react";
import firebase from "../../firebase";
import { setCurrentChannel } from "../../redux/actions/action";
const Channels = () => {
  const [channels, setChannels] = useState<firebase.database.DataSnapshot[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState<string>("");
  const [channelRef, setChannelRef] = useState<firebase.database.Reference>(
    firebase.database().ref("channels")
  );
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const channel = useSelector((state: any) => state.channel);
  const { currentUser } = user;
  const { currentChannel } = channel;

  useEffect(() => {
    addListener();
    return () => {
      channelRef.off();
    };
  }, []);

  const addListener = () => {
    let loadedChannels: firebase.database.DataSnapshot[] = [];
    channelRef.on("child_added", (snap) => {
      loadedChannels.push(snap.val());
      setChannels(loadedChannels);
    });
  };

  const addChannel = () => {
    const key = channelRef.push().key;

    const newChannel = {
      id: key,
      name: channelName,
      description: channelDescription,
      createdBy: {
        name: currentUser.displayName,
        avatar: currentUser.photoURL,
      },
    };

    channelRef
      .child(key as string)
      .update(newChannel)
      .then(() => {
        setChannelName("");
        setChannelDescription("");
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (isFormValid(channelName, channelDescription)) {
      addChannel();
    }
  };

  const isFormValid = (channelName: string, channelDescription: string): any =>
    channelName && channelDescription;

  const handleChannelName = (e: any) => {
    setChannelName(e.target.value);
  };

  const handleChannelDesc = (e: any) => {
    setChannelDescription(e.target.value);
  };

  const saveCurrentChannel = (channel: any) => {
    dispatch(setCurrentChannel(channel));
  };

  const displayChannels = () => {
    return channels.map((channel: any) => (
      <Menu.Item
        key={channel.key}
        onClick={() => saveCurrentChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel.id === currentChannel.id}
      >
        # {channel.name}
      </Menu.Item>
    ));
  };

  return (
    <div>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> Channels
          </span>{" "}
          ( {channels.length} ){" "}
          <Icon name="add" onClick={() => setOpen(true)} />
        </Menu.Item>
        {displayChannels()}
      </Menu.Menu>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Modal.Header>Create New Channel</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Channel Name</label>
              <Input
                fluid
                placeholder="Knowledge Base"
                name="channelName"
                onChange={handleChannelName}
              />
            </Form.Field>
            <Form.Field>
              <label>Channel Description</label>
              <Input
                fluid
                placeholder="In this channel you share the important blogs, videos and other resources"
                name="channelDescription"
                onChange={handleChannelDesc}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            content="Add Channel"
            labelPosition="right"
            icon="checkmark"
            onClick={handleSubmit}
            positive
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Channels;
