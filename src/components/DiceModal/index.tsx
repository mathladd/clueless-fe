import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import RollDice from './RollDice';

library.add(fas);

function DiceModal({
  inputValue,
  onInputValueChange,
}: {
  inputValue: number;
  onInputValueChange: (roll: number) => void;
}) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Blow the die for good luck!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RollDice inputValue={inputValue} onInputValueChange={onInputValueChange} />
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
}

export default DiceModal;
