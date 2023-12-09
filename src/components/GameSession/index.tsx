/* eslint-disable max-lines */
import React, { useState, useEffect } from 'react';
import { Spinner } from '@chakra-ui/react';
import { GameBoardRes, WS, WSResponse } from 'types/common';
import { Character, GameBoardSetup, CHARACTERS } from 'types/game';
import GameBoard from '../GameBoard/GameBoard';
import CharacterSelectModal from '../CharacterSelect/index';
import DiceModal from '../DiceModal/index';
import 'bootstrap/dist/css/bootstrap.css';
import Card from './Card';
import Player from './Player';

type GameStatuses = 'rolledDice' | 'characterSelect' | 'coreLoop';

function MovableButton({
  isDisabled,
  coord,
  onMoveTo,
  playerLocationMapping,
}: {
  isDisabled: boolean;
  coord: string;
  onMoveTo: (cord: string) => void;
  playerLocationMapping: { username: string; currentCoord: string }[] | undefined;
}) {
  const players = playerLocationMapping?.filter((i) => i.currentCoord === coord);
  return (
    <div className="relative flex w-full h-full" key={coord}>
      <button
        className={`absolute w-full h-full transition opacity-50 ${
          isDisabled ? '' : 'cursor-pointer hover:bg-yellow-200 z-10'
        }`}
        type="button"
        disabled={isDisabled}
        onClick={() => onMoveTo(coord)}
      >
        {}
      </button>
      <div className="absolute z-0 flex flex-wrap items-center justify-center w-full h-full space-x-2">
        {players?.map((player) => (
          <div className="flex items-center justify-center w-10 h-10 text-sm text-white rounded-full bg-slate-700">
            <div className="w-fit bg-slate-700">{String(player?.username)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const statusDisplayMapping: { [key: GameStatuses | string]: string } = {
  rolledDice: 'Dice roll',
  characterSelect: 'Character selection',
  coreLoop: 'Game',
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

  const [renderedBoard, setRenderedBoard] = useState<GameBoardRes>();
  const [playerLocationMapping, setPlayerLocationMapping] =
    useState<{ username: string; currentCoord: string }[]>();

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
        setCurrentPlayerTurn(data?.currentTurn);
      } else if (data?.responseFor === 'renderBoard') {
        setGameState('coreLoop');
        setRenderedBoard(data?.gameBoard as GameBoardRes);
      }
    }
  }, [ws?.lastMessage?.data]);

  useEffect(() => {
    if (ws?.lastMessage?.data) {
      const data = JSON.parse(String(ws?.lastMessage?.data)) as WSResponse;
      if (data?.responseFor === 'characterSelect' && data?.characterSelectionPhase === 'finished') {
        const lastPlayer = playerCharacterMapping?.find((i) => i.character === '')?.character;
        if (lastPlayer) {
          const currentMapping = playerCharacterMapping?.filter((i) => i.character !== '');
          const newMapping = currentMapping?.concat([
            {
              username: lastPlayer,
              character:
                prevTurnAvailableChars?.find((c) => !availableCharacters?.includes(c)) ?? '',
            },
          ]);
          setPlayerCharacterMapping(newMapping);
          setPrevTurnAvailableChars(availableCharacters);
        }
      } else if (
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

  const isGameDisabled = gameState !== 'coreLoop' || currentPlayerTurn !== username;

  useEffect(() => {
    !!renderedBoard &&
      setPlayerLocationMapping(
        playerCharacterMapping?.map((player) => ({
          username: player?.username ?? '',
          currentCoord:
            Object.entries(renderedBoard).filter((loc) =>
              loc[1].players.includes(player?.username ?? ''),
            )?.[0]?.[0] ?? '0,0',
        })),
      );
  }, [playerCharacterMapping, renderedBoard]);

  console.log('playerLocationMapping', playerLocationMapping);

  const onMoveTo = (cord: string) => {
    ws?.sendJsonMessage({
      request: 'characterMove',
      username,
      lobby_name: lobby,
      prev_coords:
        playerLocationMapping?.find((i) => i.username === username)?.currentCoord ?? '0,0',
      new_coords: cord,
    });
  };

  const onAccuse = () => {};

  const onSuggest = () => {};

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

      <div className="flex px-8 pt-2 space-x-2">
        <button
          type="button"
          className={`px-4 py-2 text-white transition rounded-lg bg-slate-600 ${
            isGameDisabled ? '' : 'hover:bg-slate-500'
          } disabled:opacity-30`}
          onClick={onSuggest}
          disabled={isGameDisabled}
        >
          Suggest...
        </button>
        <button
          type="button"
          className={`px-4 py-2 text-white transition rounded-lg bg-rose-800  ${
            isGameDisabled ? '' : 'hover:bg-rose-700'
          } disabled:opacity-30`}
          onClick={onAccuse}
          disabled={isGameDisabled}
        >
          Accuse!!
        </button>
      </div>

      <div className="flex flex-col px-8 pt-2 space-y-8">
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
        <div
          className={`relative m-auto my-4 ${currentPlayerTurn === username ? '' : 'opacity-50'}`}
        >
          {currentPlayerTurn !== username && (
            <div className="absolute flex items-center justify-center w-full h-full">
              <Spinner size="xl" color="black" thickness="10px" speed="1s" />
            </div>
          )}
          <div className="absolute  w-[655px] h-[510px] flex flex-col">
            <div className="relative flex w-full h-full">
              {Array(5)
                .fill(0)
                .map((i, index) => (
                  <MovableButton
                    isDisabled={currentPlayerTurn !== username}
                    coord={`0,${index}`}
                    onMoveTo={onMoveTo}
                    playerLocationMapping={playerLocationMapping}
                  />
                ))}
            </div>
            <div className="relative flex w-full h-full">
              {Array(5)
                .fill(0)
                .map((i, index) =>
                  ![1, 3].includes(index) ? (
                    <MovableButton
                      isDisabled={currentPlayerTurn !== username}
                      coord={`1,${index}`}
                      onMoveTo={onMoveTo}
                      playerLocationMapping={playerLocationMapping}
                    />
                  ) : (
                    <div className="w-full h-full" />
                  ),
                )}
            </div>
            <div className="relative flex w-full h-full">
              {Array(5)
                .fill(0)
                .map((i, index) => (
                  <MovableButton
                    isDisabled={currentPlayerTurn !== username}
                    coord={`2,${index}`}
                    onMoveTo={onMoveTo}
                    playerLocationMapping={playerLocationMapping}
                  />
                ))}
            </div>
            <div className="relative flex w-full h-full">
              {Array(5)
                .fill(0)
                .map((i, index) =>
                  ![1, 3].includes(index) ? (
                    <MovableButton
                      isDisabled={currentPlayerTurn !== username}
                      coord={`3,${index}`}
                      onMoveTo={onMoveTo}
                      playerLocationMapping={playerLocationMapping}
                    />
                  ) : (
                    <div className="w-full h-full" />
                  ),
                )}
            </div>
            <div className="relative flex w-full h-full">
              {Array(5)
                .fill(0)
                .map((i, index) => (
                  <MovableButton
                    isDisabled={currentPlayerTurn !== username}
                    coord={`4,${index}`}
                    onMoveTo={onMoveTo}
                    playerLocationMapping={playerLocationMapping}
                  />
                ))}
            </div>
          </div>
          <GameBoard />
        </div>
      </div>
    </div>
  );
}

export default GameSession;
