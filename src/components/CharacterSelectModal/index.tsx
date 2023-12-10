import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { cardImgMapping } from 'config/mapping';
import { Character } from 'types/game';

function CharacterSelectModal({
  availableChars,
  setChars,
}: {
  availableChars: Character[] | undefined;
  setChars: (c: Character) => void;
}) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  const onClickChar = (c: Character) => {
    setChars(c);
  };

  if (!availableChars) return null;
  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Select your character!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-wrap justify-center">
          {availableChars?.map((c, index) => (
            <button
              type="button"
              key={`${index + 1}`}
              className="flex items-center justify-center flex-shrink-0 w-32 h-48 overflow-hidden border-4 rounded-lg border-slate-700"
              onClick={() => onClickChar(c)}
            >
              <img src={cardImgMapping[c]} alt={c} className="flex-grow-0 w-full h-full" />
            </button>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
}

export default CharacterSelectModal;
