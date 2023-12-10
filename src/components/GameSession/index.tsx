/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable max-lines */
import React, { useState, useEffect } from 'react';
import { Spinner } from '@chakra-ui/react';
import { GameBoardRes, SuggestParams, WS, WSResponse } from 'types/common';
import { Character, GameBoardSetup, CHARACTERS } from 'types/game';
import SuggestModal from 'components/SuggestModal';
import GameBoard from '../GameBoard/GameBoard';
import CharacterSelectModal from '../CharacterSelectModal/index';
import DiceModal from '../DiceModal/index';
import 'bootstrap/dist/css/bootstrap.css';
import Card from './Card';
import Player from './Player';

type GameStatuses = 'rolledDice' | 'characterSelect' | 'coreLoop';

function MovableButton({
  isDisabled,
  coord,
  currentPlayerCoord,
  onMoveTo,
  playerLocationMapping,
}: {
  isDisabled: boolean;
  coord: string;
  currentPlayerCoord: string;
  onMoveTo: (cord: string) => void;
  playerLocationMapping: { username: string; currentCoord: string }[] | undefined;
}) {
  const players = playerLocationMapping?.filter((i) => i.currentCoord === coord);
  const currentPlayerCoords = currentPlayerCoord.split(',');
  const fieldCoords = coord.split(',');
  const isOneRow =
    Math.abs(Number(currentPlayerCoords[0]) - Number(fieldCoords[0])) === 1 &&
    Number(currentPlayerCoords[1]) === Number(fieldCoords[1]);
  const isOneCol =
    Math.abs(Number(currentPlayerCoords[1]) - Number(fieldCoords[1])) === 1 &&
    Number(currentPlayerCoords[0]) === Number(fieldCoords[0]);
  const isMovable = !isDisabled && ((isOneRow && !isOneCol) || (isOneCol && !isOneRow));
  return (
    <div className="relative flex w-full h-full" key={coord}>
      <button
        className={`absolute w-full h-full transition opacity-50 ${
          isMovable
            ? 'cursor-pointer bg-emerald-400 hover:bg-yellow-200 z-10'
            : currentPlayerCoord !== coord
            ? 'bg-slate-500'
            : ''
        }`}
        type="button"
        disabled={!isMovable}
        onClick={() => onMoveTo(coord)}
      >
        {}
      </button>
      <div className="absolute z-0 flex flex-wrap items-center justify-center w-full h-full space-x-2">
        {players?.map((player) => (
          <div
            className="flex items-center justify-center w-10 h-10 text-sm text-white rounded-full bg-slate-700"
            key={player.username}
          >
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

  // Meta
  const [gameState, setGameState] = useState<GameStatuses>('rolledDice');
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState<string | undefined>();

  // Turn selection
  const [playerDiceMapping, setPlayerDiceMapping] = useState<{ [key: string]: number }>();
  const [diceRole, setDiceRole] = useState(0);
  const [isRerolling, setIsRerolling] = useState(false);

  // Character selection
  const [availableCharacters, setAvailableCharacters] = useState<Character[] | undefined>();
  const [prevTurnAvailableChars, setPrevTurnAvailableChars] = useState<Character[] | undefined>(
    CHARACTERS as unknown as Character[] | undefined,
  );
  const [selectedCharacter, setSelectedCharacter] = useState<Character | undefined>();
  const [playerCharacterMapping, setPlayerCharacterMapping] =
    useState<{ username: string | undefined; character: Character | string }[]>();

  // Location and core game
  const [renderedBoard, setRenderedBoard] = useState<GameBoardRes>();
  const [playerLocationMapping, setPlayerLocationMapping] =
    useState<{ username: string; currentCoord: string }[]>();

  const [hasMoved, setHasMoved] = useState(false);
  const [hasActioned, setHasActioned] = useState(false);
  const [isOpenModalSuggest, setIsOpenModalSuggest] = useState(false);
  const [foundCard, setFoundCard] = useState<{
    username: string;
    card: string;
    suggestedUsername: string;
  }>();

  const isNotPlayerTurn = currentPlayerTurn !== username;
  const isDisabledAction = !!isNotPlayerTurn || !!hasActioned;
  const isDisabledMovement = !!isDisabledAction || !!hasMoved;
  const currentPlayerCoord =
    playerLocationMapping?.find((i) => i.username === username)?.currentCoord ?? '0,0';

  const onSetChar = (c: Character) => [setSelectedCharacter(c)];

  const onMoveTo = (cord: string) => {
    ws?.sendJsonMessage({
      request: 'characterMove',
      username,
      lobby_name: lobby,
      prev_coords: currentPlayerCoord,
      new_coords: cord,
    });
    setHasMoved(true);
  };

  const onTurnEnd = () => {
    setHasMoved(false);
    setFoundCard({ username: '', card: '', suggestedUsername: '' });
    ws?.sendJsonMessage({
      request: 'nextTurn',
      username,
      lobby_name: lobby,
    });
  };

  const onSuggest = ({ character, weapon, room }: SuggestParams) => {
    const suggestedUsername = playerCharacterMapping?.find(
      (i) => i.character === character,
    )?.username;
    const suggestedUsernameCoords =
      playerLocationMapping?.find((i) => i.username === suggestedUsername)?.currentCoord ??
      undefined;
    ws?.sendJsonMessage({
      request: 'suggest',
      username,
      lobby_name: lobby,
      suggested_character: character,
      suggested_weapon: weapon,
      suggested_room: room,
      ...(suggestedUsername ? { suggested_username: suggestedUsername } : {}),
      ...(suggestedUsernameCoords ? { suggested_username_coords: suggestedUsernameCoords } : {}),
      user_coords: currentPlayerCoord,
    });
    setHasActioned(true);
  };

  const onAccuse = () => {};

  useEffect(() => {
    if (ws?.lastMessage?.data) {
      const data = JSON.parse(String(ws?.lastMessage?.data)) as WSResponse;
      console.log(ws?.lastMessage?.data);
      if (data?.responseFor === 'rolledDice') {
        if (data?.highest_rolled === 'tie') {
          setIsRerolling(true);
        }
        setGameState('rolledDice');
        !!data?.currentTurn && setCurrentPlayerTurn(data?.currentTurn);
        setPlayerDiceMapping(data?.diceTracker);
      } else if (data?.responseFor === 'characterSelect' && !!data?.characters) {
        setGameState('characterSelect');
        setAvailableCharacters(data?.characters);
        if (
          data?.responseFor === 'characterSelect' &&
          data?.characters?.length !== prevTurnAvailableChars?.length
        ) {
          if (data?.characters?.length) {
            if (data?.characterSelectionPhase === 'finished') {
              // console.log(1111);
              const lastPlayer = playerCharacterMapping?.find((i) => i.character === '')?.username;
              if (lastPlayer) {
                const currentMapping = playerCharacterMapping?.filter((i) => i.character !== '');
                const newMapping = currentMapping?.concat([
                  {
                    username: lastPlayer,
                    character:
                      prevTurnAvailableChars?.find((c) => !data?.characters?.includes(c)) ?? '',
                  },
                ]);
                setPlayerCharacterMapping(newMapping);
                setPrevTurnAvailableChars(data?.characters);
                // console.log('lastPlayer', lastPlayer);
                // console.log('currentMapping', currentMapping);
                // console.log('newMapping', newMapping);
              }
            } else {
              // console.log(2222);
              const currentMapping = playerCharacterMapping?.filter(
                (i) => i.username !== currentPlayerTurn,
              );
              const newMapping = currentMapping?.concat([
                {
                  username: currentPlayerTurn,
                  character:
                    prevTurnAvailableChars?.find((c) => !data?.characters?.includes(c)) ?? '',
                },
              ]);
              setPlayerCharacterMapping(newMapping);
              setPrevTurnAvailableChars(data?.characters);
              // console.log('currentMapping', currentMapping);
              // console.log('newMapping', newMapping);
            }
          }
          // console.log('currentPlayerTurn', currentPlayerTurn);
          setCurrentPlayerTurn(data?.currentTurn);
        }
      } else if (data?.responseFor === 'currentTurn') {
        setGameState('coreLoop');
        !!data?.currentTurn && setCurrentPlayerTurn(data?.currentTurn);
      } else if (data?.responseFor === 'renderBoard') {
        setGameState('coreLoop');
        setRenderedBoard(data?.gameBoard as GameBoardRes);
      } else if (data?.responseFor === 'suggest') {
        setGameState('coreLoop');
        data?.found_player &&
          data?.found_card &&
          data?.suggested_username &&
          setFoundCard({
            username: data?.found_player,
            card: data?.found_card,
            suggestedUsername: data?.suggested_username,
          });
      } else if (data?.responseFor === 'nextTurn') {
        setGameState('coreLoop');
        !!data?.nextTurn && setCurrentPlayerTurn(data?.nextTurn);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws?.lastMessage?.data]);

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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayerTurn, selectedCharacter, lobby, username]);

  useEffect(() => {
    setPlayerCharacterMapping(
      Object.keys(gameBoard?.player_cards ?? {}).map((p) => ({ username: p, character: '' })),
    );
  }, [gameBoard?.player_cards]);

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

  if (!username || !lobby || !gameBoard) return null;
  return (
    <div>
      {gameState === 'rolledDice' && currentPlayerTurn === username && diceRole === 0 && (
        <DiceModal inputValue={diceRole} onInputValueChange={setDiceRole} />
      )}
      {gameState === 'characterSelect' && currentPlayerTurn === username && !selectedCharacter && (
        <CharacterSelectModal availableChars={availableCharacters} setChars={onSetChar} />
      )}

      {gameState === 'coreLoop' && (
        <SuggestModal
          isOpen={isOpenModalSuggest}
          onClose={() => setIsOpenModalSuggest(false)}
          onSuggest={onSuggest}
        />
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

      <div className="flex flex-col px-8 pt-2 space-y-2">
        <div className="flex space-x-2">
          <div className="flex flex-col p-1 space-y-1 rounded-lg bg-slate-800 w-fit">
            <div className="text-xl font-bold text-slate-200">Your cards:</div>
            <div className="flex space-x-1">
              {gameBoard?.player_cards[username].map((cardName) => (
                <Card cardName={cardName} />
              ))}
            </div>
          </div>
          <div className="flex flex-col p-1 space-y-1 rounded-lg bg-slate-800 w-fit">
            <div className="text-xl font-bold text-slate-200">Leftover Cards:</div>
            <div className="flex space-x-2">
              {gameBoard?.left_over_cards.map((cardName) => (
                <Card cardName={cardName} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="flex flex-col w-60 items-stretch pt-2 space-y-2">
            <div className="space-y-1 rounded-lg w-fit h-fit bg-emerald-900 text-slate-200">
              <div className="text-xl font-semibold ">All players:</div>
              <div className="flex space-x-1 flex-wrap justify-center items-center">
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
              {diceRole > 0 && <div className="text-xl font-semibold ">You rolled: {diceRole}</div>}
              <div className="text-xl font-semibold ">Current player turn: {currentPlayerTurn}</div>
            </div>
            <div className="flex space-x-2 w-fit">
              <button
                type="button"
                className={`px-4 py-2 text-white transition rounded-lg bg-slate-600 ${
                  isDisabledAction ? '' : 'hover:bg-slate-500'
                } disabled:opacity-30`}
                onClick={() => setIsOpenModalSuggest(true)}
                disabled={isDisabledAction}
              >
                Suggest...
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-white transition rounded-lg bg-rose-800  ${
                  isDisabledAction ? '' : 'hover:bg-rose-700'
                } disabled:opacity-30`}
                onClick={onAccuse}
                disabled={isDisabledAction}
              >
                Accuse!!
              </button>
            </div>
            <button
              type="button"
              className={`px-4 py-2 text-white transition rounded-lg bg-slate-800  ${
                isNotPlayerTurn ? '' : 'hover:bg-slate-700'
              } disabled:opacity-30`}
              onClick={onTurnEnd}
              disabled={isNotPlayerTurn}
            >
              End turn
            </button>
            <div className="text-rose-600">
              {foundCard &&
                foundCard.suggestedUsername === username &&
                `${foundCard.username} found that ${foundCard.card} was not involved in the crime!`}
            </div>
          </div>

          <div className={`relative ${isDisabledAction ? 'opacity-50' : ''}`}>
            {isDisabledAction && (
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
                      isDisabled={isDisabledMovement}
                      coord={`0,${index}`}
                      currentPlayerCoord={currentPlayerCoord}
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
                        isDisabled={isDisabledMovement}
                        coord={`1,${index}`}
                        currentPlayerCoord={currentPlayerCoord}
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
                      isDisabled={isDisabledMovement}
                      coord={`2,${index}`}
                      currentPlayerCoord={currentPlayerCoord}
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
                        isDisabled={isDisabledMovement}
                        coord={`3,${index}`}
                        currentPlayerCoord={currentPlayerCoord}
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
                      isDisabled={isDisabledMovement}
                      coord={`4,${index}`}
                      currentPlayerCoord={currentPlayerCoord}
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
    </div>
  );
}

export default GameSession;
