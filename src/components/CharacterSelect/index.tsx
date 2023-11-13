import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import React from 'react'; 
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Stack from 'react-bootstrap/Stack';
library.add(fas) 




function CharacterSelectModal(props: {inputValue: number, onInputValueChange: (arg0: any) => void; }) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const [value, changeValue] = useState(props);

    
  const characterSet = {
    "Miss.Scarlett": "",
    "Colonel Mustard": "",
    "Mrs.White": "",
    "Mr.Green": "",
    "Mrs.Peacock":"",
    "Professor Plum":"",
  };


  return (
    <>
    <Modal  centered = {true}  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Blow the die for good luck!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Stack direction="horizontal" gap={3}>
                <div className="p-2">First item    
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={characterSet["Miss.Scarlett"]} />
                            <Card.Body>
                                <Card.Title>"Miss. Scarlett"</Card.Title>
                            <Button onClick ={() =>changeValue("Miss.Scarlett")} variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
                <div className="p-2">Second item</div>
                <div className="p-2">Third item</div>
            </Stack>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CharacterSelectModal;






