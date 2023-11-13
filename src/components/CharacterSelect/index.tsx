import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Character } from 'types/game';
import { cardImgMapping } from 'components/GameSession/Card';

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

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Select your character!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="flex justify-center flex-wrap">
          {availableChars?.map((c, index) => (
            <button
              type="button"
              key={`${index + 1}`}
              className="flex flex-shrink-0 justify-center items-center w-32 h-48 border-4 border-slate-700 rounded-lg overflow-hidden"
              onClick={() => onClickChar(c)}
            >
              <img src={cardImgMapping[c]} alt={c} className="w-full h-full flex-grow-0" />
            </button>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
}

export default CharacterSelectModal;
