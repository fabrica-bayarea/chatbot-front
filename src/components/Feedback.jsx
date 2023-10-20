import React, { useEffect, useState } from 'react';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DialogButton, IconButton } from './styled';

const Container = styled.div`
  & > div {
    display: flex;

    & > button {
      font-size: 1.2em;
      opacity: 0.25;

      &:hover,
      &.selected {
        opacity: 0.5;
      }
    }
  }
`;

const Dialog = styled.div`
  background-color: var(--clr-light);
  border: 2px solid var(--clr-c);
  flex-direction: column;
  font-size: 0.9em;
  gap: 10px;
  padding: 10px;

  & > div {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
`;

function Feedback({ loadingRef }) {
  const [feedback, setFeedback] = useState(undefined);

  //
  useEffect(() => {
    if (feedback) {
      loadingRef.current.scrollIntoView();
    }
  }, [feedback, loadingRef]);

  return (
    <Container>
      <div>
        <IconButton
          type='button'
          className={feedback === 'good' && 'selected'}
          onClick={() => {
            setFeedback('good');
          }}
          $color={'var(--clr-a)'}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
        </IconButton>
        <IconButton
          type='button'
          className={feedback === 'poor' && 'selected'}
          onClick={() => {
            setFeedback('poor');
          }}
          $color={'var(--clr-b)'}
        >
          <FontAwesomeIcon icon={faThumbsDown} />
        </IconButton>
      </div>
      {feedback && (
        <Dialog>
          <span>Feedback recebido!</span>
          {feedback === 'poor' && (
            <>
              <span>Gostaria de ser direcionado para um de nossos colaboradores?</span>
              <div>
                <DialogButton type='button' disabled>
                  Sim
                </DialogButton>
                <DialogButton type='button' disabled>
                  Não
                </DialogButton>
              </div>
            </>
          )}
        </Dialog>
      )}
    </Container>
  );
}

Feedback.propTypes = {
  loadingRef: PropTypes.object,
};

export default Feedback;
