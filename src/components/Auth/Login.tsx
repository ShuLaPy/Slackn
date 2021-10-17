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

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
      const signedUser = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      setLoading(false);
    } catch (error: any) {
      console.log("Error:", error.message);
      setErrors([{ message: "Email or Password Incorrect" }]);
      setLoading(false);
    }
  };

  const isFormValid = () => {
    let errors: any[] = [];
    let error;

    if (isFormEmpty()) {
      error = { message: "Fill In All Fields" };
      setErrors(errors.concat(error));
      return false;
    } else {
      return true;
    }
  };

  const isFormEmpty = () => {
    return !email.length || !password.length;
  };

  const showErrors = (errors: any) =>
    errors.map((error: any, index: number) => (
      <p key={index}>{error.message}</p>
    ));

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="purple" textAlign="center">
          <Icon name="slack" color="purple" />
          Login On Slack-Clone
        </Header>
        <Form size="large">
          <Segment stacked>
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

            <Button
              className={loading ? "loading" : ""}
              disabled={loading}
              color="green"
              fluid
              size="large"
              onClick={handleSubmit}
            >
              Login
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
          Already have an account? <Link to="/register"> Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
