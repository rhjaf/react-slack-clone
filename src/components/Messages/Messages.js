import React from "react";
import { Segment, Comment } from "semantic-ui-react";

import Message from "./Message";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from "../../firebase";

class Messages extends React.Component {
    state = {
        messagesRef: firebase.database().ref("messages"),
        messages: [],
        messagesLoading: true,
        channel: this.props.currentChannel,
        user: this.props.currentUser
    };


    componentDidMount() {
        const { channel, user } = this.state;

        if (channel && user) {
            this.addListeners(channel.id);
        }
    }

    addListeners = channelId => {
        this.addMessageListener(channelId);
    };

    addMessageListener = channelId => {
        let loadedMessages = [];
        this.state.messagesRef.child(channelId).on("child_added", snap => {
            loadedMessages.push(snap.val());
            this.setState({
                messages: loadedMessages,
                messagesLoading: false
            });
        });
        this.countUniqueUsers(loadedMessages);
    };

    countUniqueUsers = messages => {
        const uniqueUsers = messages.reduce((acc, message) => {
            if (!acc.includes(message.user.name)) {
                acc.push(message.user.name);
            }
            return acc;
        }, []);
        const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
        const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`;
        this.setState({ numUniqueUsers });
    };



    displayMessages = messages =>
        messages.length > 0 &&
        messages.map(message => (
            <Message
                key={message.timestamp}
                message={message}
                user={this.state.user}
            />
        ));


    displayChannelName = channel => (channel ? `#${channel.name}` : "");
  render() {
      const { messagesRef, channel, user,messages,numUniqueUsers } = this.state;
    return (
      <React.Fragment>
        <MessagesHeader channelName={this.displayChannelName(channel)} numUniqueUsers={numUniqueUsers} />

        <Segment>
          <Comment.Group className="messages">{this.displayMessages(messages)}</Comment.Group>
        </Segment>

        <MessageForm messagesRef={messagesRef} currentChannel={channel} currentUser={user} />
      </React.Fragment>
    );
  }
}

export default Messages;
