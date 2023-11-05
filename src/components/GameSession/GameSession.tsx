import React from 'react';
import GameBoard from '../GameBoard/GameBoard';
import GameCards from '../GameCards/GameCards';
import ClueSheet from '../ClueSheet/ClueSheet';
import Styles from './GameSession.module.css';

//API Request to get session users
let sessionUsers = {
    'Anthony': {
        'turn' : false,
        'position':  [0,0],
        'cards':[],
        'clueSheet':[],
    }
}

function InitializeGame(users: any){
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

export default InitializeGame;

///



