import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId, convoId } = props;

  return (
    <Box>
      {messages.map((message , i) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
          key={message.id}
          text={message.text}
          time={time}
          isSeen={message.is_seen}
          otherUser={otherUser}
          index={i}
          messagesLength={messages.length}
          />
        ) : (
          <OtherUserBubble 
          convoId={convoId}
          isSeen={message.is_seen} 
          key={message.id} 
          id={message.id} 
          text={message.text} 
          time={time} 
          otherUser={otherUser} 
          />
        );
      })}
    </Box>
  );
};

export default Messages;
