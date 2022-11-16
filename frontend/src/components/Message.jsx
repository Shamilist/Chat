import React from 'react';

const Message = (props) => {
  const { content } = props;
  const { username, body } = content;

  return (
    <div className="text-break mb-2">
      <b>{username}</b>
      :
      {' '}
      {body}
    </div>
  );
};

export default Message;
