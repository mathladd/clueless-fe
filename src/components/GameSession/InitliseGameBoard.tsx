import React, { useState, useEffect } from "react";
import { WS } from "types/common";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";


function InitializeGameBoard ({ ws }: { ws: WS; }) {
  
  const startGame = () => {

    ws?.sendJsonMessage({
      request: "createUser",
      username: "Math_Lad",
      password: "ml_pwd",
    });

    ws?.sendJsonMessage({
      request: "createLobby",
      lobby_name: "Dev_Test_lobby",
      username: "Math_Lad" ,
    });

    ws?.sendJsonMessage({
      request: "createUser",
      username: "D-K",
      password: "dk_pwd",
    });

    ws?.sendJsonMessage({
      request: "joinLobby",
      lobby_name: "Dev_Test_lobby",
      username: "D-K" ,
    });

    ws?.sendJsonMessage({
      request: "createUser",
      username: "Shaheer",
      password: "sh_pwd",
    });
    ws?.sendJsonMessage({
      request: "joinLobby",
      lobby_name: "Dev_Test_lobby",
      username: "Shaheer" ,
    });
    ws?.sendJsonMessage({
      request: "createUser",
      username: "Anthony",
      password: "a_pwd",
    });
    ws?.sendJsonMessage({
      request: "joinLobby",
      lobby_name: "Dev_Test_lobby",
      username: "Anthony" ,
    });
    ws?.sendJsonMessage({
      request: "createUser",
      username: "Hasheem",
      password: "hs_pwd",
    });
    ws?.sendJsonMessage({
      request: "joinLobby",
      lobby_name: "Dev_Test_lobby",
      username: "Hasheem" ,
    });

    ws.sendJsonMessage({ request: "getUsers" });
    ws.sendJsonMessage({ request: "getLobbies" });
    
    ws?.sendJsonMessage({
      request: "toggleReady",
      username: "Math_Lad",
      lobby_name: "Dev_Test_lobby"
    });

    ws?.sendJsonMessage({
      request: "toggleReady",
      username: "D-K",
      lobby_name: "Dev_Test_lobby"
    });

    ws?.sendJsonMessage({
      request: "toggleReady",
      username: "Shaheer",
      lobby_name: "Dev_Test_lobby"
    });

    ws?.sendJsonMessage({
      request: "toggleReady",
      username: "Anthony",
      lobby_name: "Dev_Test_lobby"
    });

    ws?.sendJsonMessage({
      request: "toggleReady",
      username: "Hasheem",
      lobby_name: "Dev_Test_lobby"
    });

    ws?.sendJsonMessage({
      request: "startGame",
      username: "Math_Lad",
      lobby_name: "Dev_Test_lobby"
    });
  
  };


  return (
    <Button onClick={() => startGame()} > StartGame </Button>
  );
}

export default InitializeGameBoard;






















