import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { connect } from "react-redux";

const Messages = (props) => {

  const { messages, otherUser, userId, conversation } = props;

  let otherUserMessages = conversation.messages.filter(c=>c.senderId===otherUser.id)
  let lastMessage = otherUserMessages[otherUserMessages.length - 1]

  let seenMessages = conversation.messages.filter(c=>c.senderId!==otherUser.id && c.is_seen)
  let lastSeenMessage = seenMessages[seenMessages.length - 1]

  return (
    <Box>
      {messages.map(message => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
          key={message.id}
          text={message.text}
          time={time}
          otherUser={otherUser}
          messageId={message.id}
          lastSeenMessage={lastSeenMessage}
          />
        ) : (
          <OtherUserBubble
          key={message.id} 
          id={message.id} 
          text={message.text} 
          time={time} 
          otherUser={otherUser} 
          lastMessage={lastMessage}
          conversationId={conversation.id}
          />
        );
      })}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
    }
};

export default connect(mapStateToProps, null)(Messages);
