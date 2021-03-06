import React, {useEffect, useState} from "react";
import { Box, Badge } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  },notSeenCountBadge:{
    marginTop: "20px",
    marginRight: "30px",
  }
}));

const Chat = (props) => {
  const [countUnseenMessages, setCountUnseenMessages] = useState(0)
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    setCountUnseenMessages(0)
  };

  useEffect(() => {
      setCountUnseenMessages(
        conversation.messages
        .filter(c=>c.senderId === otherUser.id && !c.is_seen).length
      )
  }, [conversation]);

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} countUnseenMessages={countUnseenMessages}/>
      <Badge className={classes.notSeenCountBadge} badgeContent={countUnseenMessages} color="primary"/> 
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
