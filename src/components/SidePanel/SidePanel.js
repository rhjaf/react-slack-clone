import React from "react";
import UserPanel from "./UserPanel";
import { Menu } from "semantic-ui-react";
import Channels from "./Channels";

class SidePanel extends React.Component {
  render() {
    const { currentUser } = this.props;
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
      >
        <UserPanel currentUser={currentUser}/>
        <Channels currentUser={currentUser}/>
      </Menu>
    );
  }
}

export default SidePanel;
