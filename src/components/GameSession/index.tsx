import React, { useState, useEffect } from 'react';
import { WS, WSResponse } from 'types/common';
import { Character, GameBoardSetup, CHARACTERS } from 'types/game';
import GameBoard from '../GameBoard/GameBoard';
import CharacterSelectModal from '../CharacterSelect/index';
import DiceModal from '../DiceModal/index';
import 'bootstrap/dist/css/bootstrap.css';
import Card from './Card';
import Player from './Player';

type GameStatuses = 'rolledDice' | 'characterSelect' | 'coreLoop';

const statusDisplayMapping: { [key: GameStatuses | string]: string } = {
  rolledDice: 'Dice roll',
  characterSelect: 'Character selection',
};

function GameSession({
  ws,
  username,
  lobby,
  gameBoard,
}: {
  ws: WS;
  username: string | undefined;
  lobby: string | undefined;
  gameBoard: GameBoardSetup | undefined;
}) {
  // console.log('left_over_cards', gameBoard?.left_over_cards);
  // console.log('player_cards', gameBoard?.player_cards);
  // console.log('winning_combo', gameBoard);

  const [currentPlayerTurn, setCurrentPlayerTurn] = useState<string | undefined>();
  const [playerCharacterMapping, setPlayerCharacterMapping] =
    useState<{ username: string | undefined; character: Character | string }[]>();
  const [playerDiceMapping, setPlayerDiceMapping] = useState<{ [key: string]: number }>();

  const [diceRole, setDiceRole] = useState(0);
  const [isRerolling, setIsRerolling] = useState(false);

  const [selectedCharacter, setSelectedCharacter] = useState<Character | undefined>();
  const [prevTurnAvailableChars, setPrevTurnAvailableChars] = useState<Character[] | undefined>(
    CHARACTERS as unknown as Character[] | undefined,
  );
  const [availableCharacters, setAvailableCharacters] = useState<Character[] | undefined>();

  const [gameState, setGameState] = useState<GameStatuses>('rolledDice');

  const onSetChar = (c: Character) => [setSelectedCharacter(c)];

  useEffect(() => {
    if (ws?.lastMessage?.data) {
      const data = JSON.parse(String(ws?.lastMessage?.data)) as WSResponse;
      console.log(ws?.lastMessage?.data);
      if (data?.responseFor === 'rolledDice') {
        if (data?.highest_rolled === 'tie') {
          setIsRerolling(true);
        }
        setGameState('rolledDice');
        setCurrentPlayerTurn(data?.currentTurn);
        setPlayerDiceMapping(data?.diceTracker);
      } else if (data?.responseFor === 'characterSelect' && !!data?.characters) {
        setGameState('characterSelect');
        setAvailableCharacters(data?.characters);
      } else if (data?.responseFor === 'currentTurn') {
        setGameState('coreLoop');
      }
    }
  }, [ws?.lastMessage?.data]);

  useEffect(() => {
    if (ws?.lastMessage?.data) {
      const data = JSON.parse(String(ws?.lastMessage?.data)) as WSResponse;
      if (
        data?.responseFor === 'characterSelect' &&
        availableCharacters?.length !== prevTurnAvailableChars?.length
      ) {
        if (availableCharacters?.length) {
          const currentMapping = playerCharacterMapping?.filter(
            (i) => i.username !== currentPlayerTurn,
          );
          const newMapping = currentMapping?.concat([
            {
              username: currentPlayerTurn,
              character:
                prevTurnAvailableChars?.find((c) => !availableCharacters?.includes(c)) ?? '',
            },
          ]);
          setPlayerCharacterMapping(newMapping);
          setPrevTurnAvailableChars(availableCharacters);
        }
        setCurrentPlayerTurn(data?.currentTurn);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableCharacters, ws?.lastMessage?.data]);

  useEffect(() => {
    if (currentPlayerTurn === username && gameState === 'rolledDice' && diceRole > 0) {
      ws?.sendJsonMessage({
        request: 'rolledDice',
        username,
        lobby_name: lobby,
        dice_roll: diceRole,
      });
      setDiceRole(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayerTurn, diceRole, lobby, username]);

  useEffect(() => {
    if (currentPlayerTurn === username && gameState === 'characterSelect' && !!selectedCharacter) {
      ws?.sendJsonMessage({
        request: 'characterSelect',
        username,
        lobby_name: lobby,
        chosenCharacter: selectedCharacter,
      });
      setSelectedCharacter(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayerTurn, selectedCharacter, lobby, username]);

  useEffect(() => {
    setPlayerCharacterMapping(
      Object.keys(gameBoard?.player_cards ?? {}).map((p) => ({ username: p, character: '' })),
    );
  }, [gameBoard?.player_cards]);

  if (!username || !lobby || !gameBoard) return null;
  return (
    <div>
      {gameState === 'rolledDice' && currentPlayerTurn === username && diceRole === 0 && (
        <DiceModal inputValue={diceRole} onInputValueChange={setDiceRole} />
      )}
      {gameState === 'characterSelect' && currentPlayerTurn === username && !selectedCharacter && (
        <CharacterSelectModal availableChars={availableCharacters} setChars={onSetChar} />
      )}
      <div className="flex justify-between px-4 py-4 bg-slate-900">
        <div className="text-2xl font-bold text-white">CLUELESS: The game!</div>
        <div className="flex space-x-8 text-lg text-white">
          <div className="flex space-x-2">
            <div>You are:</div>
            <div className="text-red-200">{username}</div>
          </div>
          <div className="flex space-x-2">
            <div>In room:</div>
            <div className="text-red-200">{lobby}</div>
          </div>
          <div className="flex space-x-2">
            <div className="text-red-200">
              {isRerolling
                ? 'Re-rolling ongoing...'
                : `${statusDisplayMapping[gameState]} ongoing...`}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-8 space-y-8">
        <div className="flex flex-col space-y-4">
          <div className="p-4 space-y-4 rounded-lg w-fit bg-emerald-900 text-slate-200">
            <div>
              <div className="text-xl font-semibold ">All players:</div>
              <div className="flex space-x-2">
                {playerCharacterMapping
                  ?.sort((a, b) => {
                    const name1 = a.username ?? '';
                    const name2 = b.username ?? '';
                    if (name1 < name2) {
                      return -1;
                    }
                    if (name1 > name2) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((p) => (
                    <Player
                      username={p.username ?? ''}
                      diceRolled={
                        gameState === 'rolledDice' && !!playerDiceMapping
                          ? playerDiceMapping[p.username as string]
                          : undefined
                      }
                      character={p.character}
                      isCurrent={p.username === currentPlayerTurn}
                    />
                  ))}
              </div>
            </div>
            {diceRole > 0 && <div className="text-xl font-semibold ">You rolled: {diceRole}</div>}
            <div className="text-xl font-semibold ">Current player turn: {currentPlayerTurn}</div>
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col p-4 space-y-3 rounded-lg bg-slate-800 w-fit">
              <div className="text-xl font-bold text-slate-200">Your cards:</div>
              <div className="flex space-x-2">
                {gameBoard?.player_cards[username].map((cardName) => (
                  <Card cardName={cardName} />
                ))}
              </div>
            </div>
            <div className="flex flex-col p-4 space-y-3 rounded-lg bg-slate-800 w-fit">
              <div className="text-xl font-bold text-slate-200">Leftover Cards:</div>
              <div className="flex space-x-2">
                {gameBoard?.left_over_cards.map((cardName) => (
                  <Card cardName={cardName} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <GameBoard />
      </div>
    </div>
  );
  // return (
  // <Container>
  //   <Row>
  //     <Col>{user}</Col>
  //   </Row>
  //   <Row>
  //     <Col>
  //       <Navbar />
  //     </Col>
  //   </Row>
  //   <Row>
  //     <Col>
  //       <UserRibbon users={sessionUsers} currentPlayer={currentPlayerTurn} />
  //     </Col>
  //   </Row>
  //   <Row className="justify-content-md-center">
  //     <Col>
  //       <GameBoard />
  //       {currentPlayerTurn === user && gameState === 'Dice Role' ? (
  //         <DiceModal inputValue={diceRole} onInputValueChange={setDiceRole} />
  //       ) : (
  //         ''
  //       )}
  //       {gameState === 'Character Select' ? (
  //         <CharacterSelectModal inputValue={character} onInputValueChange={setCharacter} />
  //       ) : (
  //         ''
  //       )}
  //     </Col>
  //   </Row>
  //   <Row className="justify-content-md-center">
  //     <Col>
  //       <GameCards cardDeck={['', '', '', '']} />
  //     </Col>
  //   </Row>
  // </Container>
  // );
}

export default GameSession;
