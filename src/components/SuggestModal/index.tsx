import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { CHARACTERS, Character, ROOMS, Room, WEAPONS, Weapon } from 'types/game';
import { SuggestParams } from 'types/common';
import IClose from 'components/icons/IClose';
import { cardImgMapping, roomCoordMapping } from 'config/mapping';

export default function SuggestAccuseModal({
  isOpenModalAccuse,
  isOpenModalSuggest,
  onClose,
  onSuggest,
  onAccuse,
  userCoord,
}: {
  isOpenModalAccuse: boolean;
  isOpenModalSuggest: boolean;
  onClose: () => void;
  onSuggest?: ({ character, weapon, room }: SuggestParams) => void;
  onAccuse?: ({ character, weapon, room }: SuggestParams) => void;
  userCoord: string;
}) {
  const [character, setCharacter] = useState<Character>();
  const [weapon, setWeapon] = useState<Weapon>();
  const [room, setRoom] = useState<Room>();

  const onModalClose = () => {
    setCharacter(undefined);
    setWeapon(undefined);
    setRoom(undefined);
    onClose();
  };

  const onClickSuggest = () => {
    onSuggest && character && weapon && room && onSuggest({ character, weapon, room });
    onModalClose();
  };

  const onClickAccuse = () => {
    onAccuse && character && weapon && room && onAccuse({ character, weapon, room });
    onModalClose();
  };

  return (
    <Modal centered show={isOpenModalAccuse || isOpenModalSuggest} onHide={onModalClose}>
      <Modal.Header>
        <div>
          <Modal.Title>{`Select your ${
            isOpenModalSuggest ? 'suggestion' : 'accusation'
          }!`}</Modal.Title>
          <button type="button" className="w-8 h-8 absolute top-2 right-2" onClick={onModalClose}>
            <IClose className="w-full h-full" />
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-1">
            <div className="font-bold text-lg">Which character did it...</div>
            <div className="flex flex-wrap">
              {CHARACTERS?.map((c, index) => (
                <button
                  type="button"
                  key={`${index + 1}`}
                  className={`flex items-center justify-center flex-shrink-0 w-24 h-32 overflow-hidden border-4 rounded-lg border-slate-700 ${
                    character === c ? 'border-2 border-rose-500' : 'border-2 border-slate-500'
                  }`}
                  onClick={() => setCharacter(c)}
                >
                  <img src={cardImgMapping[c]} alt={c} className="flex-grow-0 w-full h-full" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="font-bold text-lg">With which weapon...</div>
            <div className="flex flex-wrap">
              {WEAPONS?.map((w, index) => (
                <button
                  type="button"
                  key={`${index + 1}`}
                  className={`flex items-center justify-center flex-shrink-0 w-24 h-32 overflow-hidden border-4 rounded-lg border-slate-700 ${
                    weapon === w ? 'border-2 border-rose-500' : 'border-2 border-slate-500'
                  }`}
                  onClick={() => setWeapon(w)}
                >
                  <img src={cardImgMapping[w]} alt={w} className="flex-grow-0 w-full h-full" />
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <div className="font-bold text-lg">And at what location...</div>
            <div className="flex flex-wrap">
              {ROOMS?.filter((r) => roomCoordMapping[r] === userCoord)?.map((r, index) => (
                <button
                  type="button"
                  key={`${index + 1}`}
                  className={`flex items-center justify-center flex-shrink-0 w-24 h-32 overflow-hidden border-4 rounded-lg border-slate-700 ${
                    room === r ? 'border-2 border-rose-500' : 'border-2 border-slate-500'
                  }`}
                  onClick={() => setRoom(r)}
                >
                  <img src={cardImgMapping[r]} alt={r} className="flex-grow-0 w-full h-full" />
                </button>
              ))}
            </div>
          </div>
          <div className="text-rose-700 font-semibold text-xl pt-6">
            {character && `${character} did it`}
            {weapon ? ` ...with a ${weapon}` : '...'}
            {room ? ` ... at the ${room}...` : '...'}
          </div>
          {!!isOpenModalSuggest && (
            <button
              type="button"
              className="px-4 py-2 text-white transition rounded-lg bg-slate-600 hover:bg-slate-500 cursor-pointer disabled:opacity-50"
              onClick={onClickSuggest}
              disabled={!character || !weapon || !room}
            >
              Suggest
            </button>
          )}
          {!!isOpenModalAccuse && (
            <button
              type="button"
              className="px-4 py-2 text-white transition rounded-lg bg-rose-600 hover:bg-rose-500 cursor-pointer disabled:opacity-30"
              onClick={onClickAccuse}
              disabled={!character || !weapon || !room}
            >
              Accuse
            </button>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer />
    </Modal>
  );
}
