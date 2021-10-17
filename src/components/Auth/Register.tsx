import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import md5 from "md5";

import firebase, { database } from "../../firebase";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    try {
      if (!isFormValid()) {
        return;
      }
      event.preventDefault();
      setErrors([]);
      setLoading(true);
      const createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      console.log(createdUser);

      const updatedUser = await createdUser.user?.updateProfile({
        displayName: username,
        photoURL: `https://www.gravatar.com/avatar/${md5(
          createdUser.user.email as string
        )}?d=identicon`,
      });

      const savedUser = await saveUser(createdUser);
      console.log("User Saved");
      setLoading(false);
    } catch (error: any) {
      setErrors(errors.concat(error.message));
      setLoading(false);
    }
  };

  const saveUser = (createdUser: firebase.auth.UserCredential) => {
    if (createdUser.user)
      return database.ref("users").child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        avatar: createdUser.user.photoURL,
        email: createdUser.user.email,
      });
  };

  const isFormValid = () => {
    let errors: any[] = [];
    let error;

    if (isFormEmpty()) {
      error = { message: "Fill In All Fields" };
      setErrors(errors.concat(error));
      return false;
    } else if (!isPasswordValid()) {
      error = { message: "Password is Invalid" };
      setErrors(errors.concat(error));
      return false;
    } else {
      return true;
    }
  };

  const isFormEmpty = () => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !confirmPassword.length
    );
  };

  const isPasswordValid = () => {
    if (password.length < 6) {
      return false;
    } else if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };

  const showErrors = (errors: any) =>
    errors.map((error: any, index: number) => (
      <p key={index}>{error.message}</p>
    ));

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" icon color="green" textAlign="center">
          <Icon name="connectdevelop" color="green" />
          Register On Slack-Clone
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="username"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
            />

            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />

            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            <Form.Input
              fluid
              name="confirmPassword"
              icon="repeat"
              iconPosition="left"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
            />

            <Button
              className={loading ? "loading" : ""}
              disabled={loading}
              color="blue"
              fluid
              size="large"
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Segment>
        </Form>

        {errors.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {showErrors(errors)}
          </Message>
        )}

        <Message>
          Already a User? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
