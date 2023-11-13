import { useState, useRef } from 'react';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Overlay from 'react-bootstrap/Overlay';

function UserRibbon({ users, currentPlayer }: { users: any[]; currentPlayer: string }) {
  const target = useRef(null);

  return (
    <div style={{ paddingBottom: '12px', paddingTop: '5px' }}>
      <Container>
        <Row className="justify-content-md-center">
          {users?.map((user) => (
            <Col xs md="2">
              <Card
                bg={'Dark'.toLowerCase()}
                key="Dark"
                text={'Dark'.toLowerCase() === 'light' ? 'dark' : 'white'}
                style={{ width: '7rem' }}
                className="mb-2"
              >
                <Card.Title>{user}</Card.Title>
                <Card.Body style={{ position: 'relative' }}>
                  <Card.Img
                    ref={target}
                    variant="top"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmV_GMmai8gMADcJbWJgdA7VNIEN1Bx1strQ&usqp=CAU"
                  />
                  {user === currentPlayer ? (
                    <Spinner
                      animation="grow"
                      style={{ position: 'absolute', top: '45px', right: '40px' }}
                    />
                  ) : (
                    ''
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default UserRibbon;
