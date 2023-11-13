import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { WS, WSResponse } from 'types/common';
import Navbar from 'components/Navbar';
import UserRibbon from 'components/UserRibbon';
import GameBoard from '../GameBoard/GameBoard';
import GameCards from '../GameCards/index';
import ClueSheet from '../ClueSheet/ClueSheet';
import DiceModal from '../DiceModal/index';
import CharacterModal from '../CharacterSelect/index';
import Styles from './GameSession.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InitializeGameBoard from './InitializeGameBoard';
import 'bootstrap/dist/css/bootstrap.css';
import { Center } from '@chakra-ui/react';
import { ro } from 'date-fns/locale';
import RollDice from 'components/DiceModal/RollDice';
import CharacterSelectModal from '../CharacterSelect/index';

let completeList: string[] = [];

function GameSession({
  ws,
  username,
  lobby,
  gameBoard,
}: {
  ws: WS;
  username: string;
  lobby: string;
  gameBoard: any;
}) {
  console.log(gameBoard);


  const sessionUsers = ["Math_Lad", "D-K", "Shaheer",  "Anthony", "Hasheem"];
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState<any>("None");
  const [gameStarted, startGame] = useState(false);
  const [user, setUser] = useState(username);
  const [playerTurnComplete, setTurnComplete] = useState(false);
  const [turnList, setTurnList] = useState([]);
  const [gameState, setGameState] = useState('initialize_game');
  const [diceRole, setDiceRole] = useState(0);
  const [playerId, setPlayerId] = useState(0);
  const [character, setCharacter] = useState<any>("None");

  const changeUser = () =>{
    setUser(sessionUsers.indexOf(user) != sessionUsers.length - 1? sessionUsers[sessionUsers.indexOf(user) + 1]: sessionUsers[0]);
    console.log("Changed User", user);
  }


  useEffect(() => {
    if (ws?.lastMessage?.data) {
      const data = JSON.parse(String(ws?.lastMessage?.data)) as WSResponse;
      console.log("input",data);
      console.log(username)

      if (!data?.responseFor && !gameStarted) {
        // console.log('Error');
        // Get Game Status
      }else if (data?.responseFor === 'rolledDice'){
        if(diceRole === 0 ){
          console.log(currentPlayerTurn, username, playerTurnComplete, diceRole);
          setCurrentPlayerTurn(data?.currentTurn);
          console.log(diceRole,currentPlayerTurn)
          setGameState("Dice Role");
        }else if (diceRole > 0  && user === currentPlayerTurn){
          console.log("true");
          ws?.sendJsonMessage({
              request: "rolledDice",
              username: user, //change to user
              lobby_name: "Dev_Test_lobby", //change to actual lobby
              dice_roll: diceRole
          });
          completeList.push(user);
          setTurnComplete(true);
          setDiceRole(0);
        }

      }else if (data?.responseFor === 'characterSelect'){
       console.log("Yeah")
       setGameState("Character Select");
       setCurrentPlayerTurn(data?.currentTurn);
      }
    }
  }, [diceRole, gameStarted, gameState, ws?.lastMessage?.data]);

  return (
    <Container>
      <Row>
        <Col>
          <InitializeGameBoard ws={ws} />
          <Button onClick={() => changeUser()} >Change User</Button>
           {user}
        </Col>
      </Row>
      <Row>
        <Col>
          <Navbar />
        </Col>
      </Row>
      <Row>
        <Col>
          <UserRibbon users={sessionUsers} currentPlayer={currentPlayerTurn}/>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <GameBoard />
          {currentPlayerTurn === user && gameState == "Dice Role" ? (
            <DiceModal
              inputValue={diceRole}
              onInputValueChange={setDiceRole}
            />): ""}
          {gameState === "Character Select" ? (
            <CharacterSelectModal 
              inputValue={character}
              onInputValueChange={setCharacter}/>): ""}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <GameCards cardDeck={['','', '', '']} />
        </Col>
      </Row>
    </Container>
  );
}

export default GameSession;

const cardImgMapping = {
  'Miss Scarlett': 'img.com/miss scarlet',
  Revolver: 'img.com/miss scarlet',
};

/// Ignore the sample code below was thinking it would be good to restructure the layout!

// <Container>

//       <Row>
//         <Col>
//           <Navbar />
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <UserRibbon users ={sessionUsers}/>
//         </Col>
//       </Row>

//       <Row>
//         <Col xs={6} md={4}>
//           <div>
//             <GameCards cardDeck={getPlayerCardDeck(playerId)} />
//           </div>
//           <div>
//             <ClueSheet />
//           </div>
//         </Col>
//         <Col xs={6} md={4}>
//           <GameBoard />
//           {playerId === playerTurn?.id && gameState == "diceRole" ? (
//               <DiceModal
//                 inputValue={DiceRole}
//                 onInputValueChange={setDiceRole}
//               />
//             ) : (
//               ""
//             )}
//         </Col>
//         <Col xs={6} md={4}>
//           <div>
//             <Button />
//           </div>
//           <div>
//             <Button />
//           </div>
//         </Col>
//       </Row>

//       {/* Columns are always 50% wide, on mobile and desktop */}
//       <Row>
//         <Col xs={6}>xs=6</Col>
//         <Col xs={6}>xs=6</Col>
//       </Row>
//     </Container>

{/* <div>
<div>
  <InitializeGameBoard ws={ws}/>
  <Button variant="secondary" type="button" onClick={() => startGame(true)}>
    Start Game
  </Button>
  <Button variant="secondary" type="button" onClick={() =>  }>
    Shift Next Player
  </Button>
  <input value={playerId} readOnly />
</div>
<div>
  <Navbar />
</div>
<div>
  <UserRibbon users={sessionUsers} />
  <div>{String(`Leftover cards: ${gameboard.left_over_cards}`)}</div>
  <div>{String(`Your cards: ${gameboard.player_cards[user]}`)}</div>
  <div>{String(`***Secret winning combo***: ${gameboard.winning_combo}`)}</div>
</div>
<div style={{ alignItems: 'center' }}>
  <div className={Styles.flexgroup}>
    <div style={{ width: '25%' }}>
      <ClueSheet />
    </div>
    <div style={{ width: '75%' }}>
      <GameBoard />
      {playerId === playerTurn?.id && gameState == 'diceRole' ? (
        <DiceModal inputValue={DiceRole} onInputValueChange={setDiceRole} />
      ) : (
        ''
      )}
    </div>
    <div style={{ width: '25%' }}>
      <GameCards cardDeck={} />
    </div>
  </div>
</div>
</div> */}