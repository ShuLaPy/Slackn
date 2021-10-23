import React, { useState } from "react";
import { Button, Input, Modal } from "semantic-ui-react";
import mime from "mime-types";
const FileModal = (props: any) => {
  const { open, closeModal, uploadFile } = props;

  const [file, setFile] = useState<any>();
  const [authorized, setAuthorized] = useState(["image/jpeg", "image/png"]);

  const addFile = (event: any) => {
    const file = event?.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const sendFile = () => {
    if (file !== null) {
      if (isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
        closeModal();
        clearFile();
      }
    }
  };

  const clearFile = () => setFile(null);

  const isAuthorized = (filename: any) => {
    const name: string = mime.lookup(filename) as string;
    return authorized.includes(name);
  };

  return (
    <Modal open={open} onClose={closeModal}>
      <Modal.Header>Select Image</Modal.Header>
      <Modal.Content>
        <Input
          fluid
          onChange={addFile}
          label="File Type: jpg, png"
          name="file"
          type="file"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          content="Upload Image"
          labelPosition="right"
          icon="checkmark"
          onClick={sendFile}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default FileModal;
