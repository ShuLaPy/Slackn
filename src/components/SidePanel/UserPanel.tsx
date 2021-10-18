import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dropdown, Grid, Header, Icon, Image } from "semantic-ui-react";
import firebase from "../../firebase";

const UserPanel = () => {
  const [userData, setuserData] = useState<any>();
  const user = useSelector((state: any) => state.user);
  const { currentUser } = user;

  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{userData && userData.displayName}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>,
    },
    {
      key: "signout",
      text: <span onClick={handleSignout}>Sign Out</span>,
    },
  ];

  const handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("User Signed Out"));
  };

  useEffect(() => {
    setuserData(currentUser);
  }, [currentUser]);

  return (
    <div>
      <Grid style={{ background: "#000" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2rem", margin: "0" }}>
            <Header inverted floated="left" as="h2">
              <Icon name="slack" />
              <Header.Content>SlackClone</Header.Content>
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column>
          <Grid.Row style={{ padding: "0 1.2rem", margin: "0" }}>
            <Header style={{ padding: "0.25em" }} as="h4" inverted>
              <Dropdown
                trigger={
                  <span>
                    <Image
                      src={userData && userData.photoURL}
                      spaced="right"
                      avatar
                    />
                    {userData && userData.displayName}
                  </span>
                }
                options={dropdownOptions()}
              />
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default UserPanel;
