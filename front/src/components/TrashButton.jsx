import React, { useContext, useState } from 'react';
import { faCheck, faClose, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { IconButton } from './styled';
import { ChatContext } from '../context';

const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  min-width: 90px;

  & > button {
    font-size: 1em;
    opacity: 0.4;

    &:hover {
      opacity: 1;
    }
  }
`;

function TrashButton({ conversationId }) {
  const { deleteConversation } = useContext(ChatContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (showConfirmation) {
    return (
      <Container>
        <IconButton
          type='button'
          onClick={(event) => {
            event.stopPropagation();
            deleteConversation(conversationId);
          }}
        >
          <FontAwesomeIcon icon={faCheck} />
        </IconButton>
        <IconButton
          type='button'
          onClick={(event) => {
            event.stopPropagation();
            setShowConfirmation(false);
          }}
        >
          <FontAwesomeIcon icon={faClose} />
        </IconButton>
      </Container>
    );
  }

  return (
    <Container>
      <IconButton
        type='button'
        onClick={(event) => {
          event.stopPropagation();
          setShowConfirmation(true);
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
      </IconButton>
    </Container>
  );
}
TrashButton.propTypes = {
  conversationId: PropTypes.number.isRequired,
};

export default TrashButton;
