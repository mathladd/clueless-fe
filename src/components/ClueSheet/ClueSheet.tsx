import React, { useEffect, useRef, Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import styles from './ClueSheet.module.css';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Clue Sheet</Modal.Title>
      </Modal.Header>
      ``
      <Modal.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th />
              <th>user 1</th>
              <th>user 2</th>
              <th>user 3</th>
              <th>user 4</th>
              <th>user 5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th colSpan={6}>Who?</th>
            </tr>
            <tr>
              <td>Mrs. Peacock</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Mr. Green</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Mrs. White</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Col. Mustard</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Mrs. Scarlet</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <th colSpan={6}>What?</th>
            </tr>
            <tr>
              <td>Knife</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Candle Stick</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Revolve</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Rope</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Lead Pipe</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Wrench</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <th colSpan={6}>Where?</th>
            </tr>
            <tr>
              <td>Study</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Hall</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Lounge</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Library</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Billard Room</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Dining Room</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Conservatory</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Ball Room</td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td>Kitchen </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
              <td className={styles.tablecell}>
                <input type="checkbox" />
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: 'center' }}>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function ClueSheet() {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <>
      <Button
        style={{ width: '11rem', height: '6rem' }}
        size="lg"
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        Clue Sheet
      </Button>

      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
