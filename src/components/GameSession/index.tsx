import React, { Component } from 'react';
import GameBoard from '../GameBoard/GameBoard';
import GameCards from '../GameCards/GameCards';
import ClueSheet from '../ClueSheet/ClueSheet';
import Styles from './GameSession.module.css';
import { useState } from 'react';


//API Request to get session users

function GameSession(users: any){
    for (const user in users){
        //;
    }
    return(
        <div>
            <div style={{alignItems: 'center'}}>
                <div className={Styles.flexgroup}>
                    <div style={{width:'25%'}}>
                        <ClueSheet />
                    </div>
                    <div style={{width:'75%'}}>
                        <GameBoard />
                    </div>
                    <div style={{width:'25%'}}>
                        <GameCards />
                    </div>      
                </div>
            </div>
        </div>

    );
}

export default GameSession;

///



