import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react'; 
import RollDice from './RollDice'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas) 




function DiceModal(props: {inputValue: number, onInputValueChange: (arg0: any) => void; }) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const [value, changeValue] = useState(props);

    
  props.onInputValueChange(value);
  return (
    <>
    <Modal  centered = {true}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Blow the die for good luck!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <RollDice inputValue={value} onInputValueChange={changeValue}/> 
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DiceModal;