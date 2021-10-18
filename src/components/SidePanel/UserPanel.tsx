import React from "react";
import { Dropdown, Grid, Header, Icon } from "semantic-ui-react";

const UserPanel = () => {
  const dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>User</strong>
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
      text: <span>Sign Out</span>,
    },
  ];

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
          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown trigger={<span>User</span>} options={dropdownOptions()} />
          </Header>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default UserPanel;
