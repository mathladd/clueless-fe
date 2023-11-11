import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

function UserRibbon({ users }: { users: any [];}) {
  return (
    <div style={{ paddingBottom: '12px', paddingTop: '5px' }}>
    <Container>
      <Row className="justify-content-md-center">
        {users?.map(
          (user) => (
            <Col xs md="2">
              <Card style={{ width: "7rem" }}>
                <Card.Title style={{ fontSize: "12px" }}>{user?.name}</Card.Title>
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmV_GMmai8gMADcJbWJgdA7VNIEN1Bx1strQ&usqp=CAU"
                  />
                </Card.Body>
              </Card>
            </Col>
          )
        )}
      </Row>
    </Container>
    </div>

  );
}

export default UserRibbon;
