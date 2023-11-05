import { useEffect, useRef} from "react";
import React, { Component } from 'react';
import Styles from './GameCards.module.css';


export default function GameCards(){
    return (
        <div>
            <div className={Styles.flexgroup}>
                <button className={Styles.card}> Card 1 </button>
                <button className={Styles.card}> Card 2 </button>
            </div>
            <div className={Styles.flexgroup}>
                <button className={Styles.card}> Card 3 </button>
                <button className={Styles.card}> Card 4 </button>
            </div>
            <div className={Styles.flexgroup}>
                <button className={Styles.card}> Card 5 </button>
                <button className={Styles.card}> Card 6 </button>
            </div>
        </div>
      
    );
};