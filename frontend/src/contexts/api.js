import { actions as messagesActions } from '../slices/messages.js';
import { actions as channelsActions } from '../slices/channels.js';

import store from '../slices/index.js';

const createAPI = (socket) => {
  const addNewMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
  });

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });

  const addNewChannel = (channel) => socket.emit('newChannel', channel, (response) => {
    if (response.status === 'ok') {
      store.dispatch(channelsActions.setCurrentChannelId(response.data.id));
    } else {
      console.log(response.status);
    }
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });

  const renameChannel = (renamedChannel) => socket.emit('renameChannel', renamedChannel, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
  });

  socket.on('renameChannel', (payload) => {
    const { name, id } = payload;
    store.dispatch(channelsActions.changeChannelName({
      id,
      changes: {
        name,
      },
    }));
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id }, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsActions.removeChannel(payload));
  });

  return {
    addNewMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  };
};

export default createAPI;
