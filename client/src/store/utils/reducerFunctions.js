export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {

      let copyConvo = {...convo}
      copyConvo.messages.push(message)
      copyConvo.latestMessageText = message.text;
      return copyConvo;
    } else {
      return convo;
    }
  });
};

export const setSeenMessageToStore = (state, payload) =>{
  const {message, convo} = payload;
  return state.map((c) => {
    if (c.id === convo) {
      let copyConvo = {...c}
      let messages = copyConvo.messages
      copyConvo.messages = messages.map(m=>{
        if (m.id === message){
          m.is_seen = true
        }
        return m
      })
      return copyConvo;
    } else {
      return c;
    }
  });
}

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    let copyConvo = {...convo}
    if (copyConvo.otherUser.id === recipientId) {
      copyConvo.id = message.conversationId;
      copyConvo.messages.push(message);
      copyConvo.latestMessageText = message.text;
      return copyConvo;
    } else {
      return convo;
    }
  });
};
