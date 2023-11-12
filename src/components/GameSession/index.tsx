import React, { useState, useEffect } from "react";
import { ReadyState } from "react-use-websocket";
import { WS } from "types/common";
import { Lobby } from "types/lobby";
import GameBoard from "../GameBoard/GameBoard";
import GameCards from "../GameCards/index";
import ClueSheet from "../ClueSheet/ClueSheet";
import DiceModal from "../DiceModal/index";
import Navbar from "components/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Styles from "./GameSession.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import UserRibbon from "components/UserRibbon";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


type Player = {
  id: number;
  username: string;
  location: string;
  cards: string[];
  turn: boolean;
  status: string;
  role: number;
};
let p1: Player = {
  id: 0,
  username: "Math_Lad",
  location: "Hall",
  cards: ["Knife", "Hall", "Ms.Peacock", "Pining Room", "Lounge", "Wrench"],
  turn: false,
  status: "unblocked",
  role: 0,
};
let p2 : Player = {
  id: 1,
  username: "Shaheer",
  location: "Hall",
  cards: ["Knife", "Hall", "Ms.Peacock", "Pining Room", "Lounge", "Wrench"],
  turn: false,
  status: "unblocked",
  role: 0,
};
let p3 : Player = {
  id: 2,
  username: "D-K",
  location: "Hall",
  cards: ["Knife", "Hall", "Ms.Peacock", "Pining Room", "Lounge", "Wrench"],
  turn: false,
  status: "unblocked",
  role: 0,
};
let p4 : Player = {
  id: 3,
  username: "Puggp_03",
  location: "Hall",
  cards: ["Knife", "Hall", "Ms.Peacock", "Pining Room", "Lounge", "Wrench"],
  turn: false,
  status: "unblocked",
  role: 0,
};
let p5 : Player = {
  id: 4,
  username: "Hasheem",
  location: "Hall",
  cards: ["Knife", "Hall", "Ms.Peacock", "Pining Room", "Lounge", "Wrench"],
  turn: false,
  status: "unblocked",
  role: 0,
};
let sessionUsers: any = [];
let currentPlayerTurn: number;
let gameBoard: any;
let userID: 0;
let actingPlayersView: any;
// API Request to get session users

function getNextUser(currantPlayer:any): any{
  if(sessionUsers.indexOf(currantPlayer) != sessionUsers.length - 1 ){
    const next = sessionUsers[sessionUsers.indexOf(currantPlayer) + 1];
    console.log("Next Player ", sessionUsers[sessionUsers.indexOf(currantPlayer ) + 1]);
    currantPlayer.turn = false;
    next.turn = true;
    return(next)
  }
  else{
    currantPlayer.turn = false;
    sessionUsers[0].turn = true;
    return(sessionUsers[0])
  }
}

function getPlayerCardDeck(id: number): any{
  return sessionUsers.filter((user:any) => {return user.id == id})[0]?.cards;
}


function GameSession({ ws, lobby }: { ws: WS; lobby: any }) {
  const [playerTurn, setPlayerTurn] = useState<Player>();
  const [gameStarted, startGame] = useState(false);
  const [playerTurnComplete, setTurnComplete] = useState(false);
  const [gameState, setGameState] = useState("initialize_game");
  const [DiceRole, setDiceRole] = useState(0);
  const [playerId, setPlayerId] = useState(0);

  useEffect(() => {
    if (ws?.lastMessage?.data) {
      const data = JSON.parse(String(ws?.lastMessage?.data)) as {
        responseFor?: string;
        success?: string;
        message?: string;

        created_lobby?: string;
        lobby_name?: string;
        username?: string;
        ready_tracker?: string;
      };
      console.log(data?.responseFor, data);
      if (!data?.responseFor && gameStarted != true) {
        console.log("Error");
        //Get Game Status
      }
    }
    if (gameStarted == true) {
      if (gameState == "initialize_game") {
        sessionUsers.push(p1, p2, p3, p4, p5);
        setPlayerTurn(sessionUsers[0]);
        sessionUsers[0].turn == true;
        setDiceRole(0);
        setGameState("diceRole");
  
      } 
      else if (gameState == "diceRole") {
        if (playerTurn?.role === 0 && DiceRole > 0) {
          playerTurn.role = DiceRole;
          if (sessionUsers.indexOf(playerTurn) != sessionUsers.length) {
            setPlayerTurn( getNextUser(playerTurn));
            setDiceRole(0);
          } else {
            setGameState("turnCycle");
          }
        }
        console.log(sessionUsers);
      } else if (gameState == "turnCycle") {
        console.log(sessionUsers);
        console.log("NextTurn Cycle");
      }
    }
  
  //Removed web socket watcher
  });




  const onButton1Click = () => {
    ws?.sendJsonMessage({
      request: "createUser",
      username: "Duy",
      password: "asfasdfa",
    });
  };

  const onButton2Click = () => {
    ws.sendJsonMessage({ request: "getUsers" });
  };

  const changePlayer = () => {
    console.log(playerId);
    console.log(sessionUsers);
    if (playerId < sessionUsers.length - 1) {
      setPlayerId(playerId + 1);
    } else {
      setPlayerId(0);
    }
  };

  return (
    <div>
      <div>
        <Button variant="secondary" type="button" onClick={() => startGame(true)}>
          Start Game
        </Button>
        <Button variant="secondary" type="button" onClick={() => changePlayer()}>
          Shift Next Player
        </Button>
        <input value={playerId} readOnly />
      </div>
      <div>
      <Navbar />
      </div>
      <div>
        <UserRibbon users ={sessionUsers}/>
      </div>
      <div style={{ alignItems: "center" }}>
        <div className={Styles.flexgroup}>
          <div style={{ width: "25%" }}>
            <ClueSheet />
          </div>
          <div style={{ width: "75%" }}>
            <GameBoard />
            {playerId === playerTurn?.id && gameState == "diceRole" ? (
              <DiceModal
                inputValue={DiceRole}
                onInputValueChange={setDiceRole}
              />
            ) : (
              ""
            )}
          </div>
          <div style={{ width: "25%" }}>
            <GameCards cardDeck={getPlayerCardDeck(playerId)} />
          </div>
        </div>
      </div>
      <button
        type="button"
        className="p-3 bg-orange-500 text-white rounded-lg"
        onClick={onButton2Click}
      >
        Testing
      </button>
    </div>
  );
}

export default GameSession;








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



















