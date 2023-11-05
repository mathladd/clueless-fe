import { useEffect, useRef} from "react";
import React, { Component } from 'react';
import Styles from './ClueSheet.module.css';


export default function ClueSheet(){
    return (
        <div>
            <table>
                <tr >
                    <th colSpan={2} className={Styles.tablecell}>Who?</th>
                </tr>
                <tr >
                <td className={Styles.tablecell}>Test</td>
                    <td className={Styles.tablecell}><input type="checkbox"/></td>
                </tr>
                <tr>
                    <th colSpan={2} className={Styles.tablecell}>What?</th>
                </tr>
                <tr>
                <td className={Styles.tablecell}>Test</td>
                    <td className={Styles.tablecell}><input type="checkbox"/></td>
                </tr>  
                <tr >
                    <th colSpan={2} className={Styles.tablecell}>Where?</th>
                </tr>
                <tr>
                    <td className={Styles.tablecell}>Test</td>
                    <td className={Styles.tablecell}><input type="checkbox"/></td>
                    
                </tr>           
            </table>
        </div>
      
    );
};