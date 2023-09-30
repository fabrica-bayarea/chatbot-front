import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

import TrashButton from './TrashButton';
import { ChatContext, MainContext } from '../context';
import { devices } from '../utils';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  width: 100%;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-c);
  }
`;

const ListItem = styled.li`
  align-items: center;
  border-bottom: 1px solid var(--clr-light);
  cursor: pointer;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  padding: 20px 10px 20px 40px;

  &:hover {
    background-color: var(--clr-light);
  }

  @media ${devices.mobileL} {
    padding: 20px 0 20px 20px;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  & > span:nth-child(1) {
    font-size: 0.75em;
  }

  & > span:nth-child(2) {
    font-size: 0.75em;
    margin-bottom: 5px;
  }

  & > span:nth-child(3) {
    font-size: 0.9em;
  }
`;

function History({ showFn }) {
  const { history, setHistory, changeConversation, getHistory } = useContext(ChatContext);
  const { isLoading } = useContext(MainContext);

  useEffect(() => {
    getHistory();

    return () => setHistory([]);
  }, [getHistory, setHistory]);

  if (isLoading) {
    return <BeatLoader color='lightgray' size={12} />;
  }

  if (history.length === 0) {
    return <span>Não há nada aqui!</span>;
  }

  return (
    <List>
      {history.map(({ id, messages }) => {
        const firstTime = new Date(messages[0].time).toLocaleString('pt-BR');

        return (
          <ListItem
            key={id}
            onClick={() => {
              changeConversation(id, messages);
              showFn(false);
            }}
            role='button'
            tabIndex='0'
          >
            <ItemDetails>
              <span>{firstTime}</span>
              <span>({messages.length} mensagens)</span>
              <span>{messages[0].content}</span>
            </ItemDetails>
            <TrashButton conversationId={id} />
          </ListItem>
        );
      })}
    </List>
  );
}

History.propTypes = {
  showFn: PropTypes.func,
};

export default History;
