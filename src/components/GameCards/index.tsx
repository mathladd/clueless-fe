import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function DarkVariantExample({ cardDeck }: { cardDeck: string[] }) {
  let cardDeckSize = cardDeck?.length;
  console.log("len", cardDeckSize);
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
      <Card
          bg={'Secondary'.toLowerCase()}
          key={'Secondary'}
          text={'Secondary'.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem', height:'25rem' }}
          className="mb-2"
        >
          
          <Card.Body>
            <Card.Title>Kitchen</Card.Title>
            <Card.Img variant="top" src="holder.js/100px180" />
          </Card.Body>
        </Card>
      </Carousel.Item>
      <Carousel.Item>
      <Card
          bg={'Secondary'.toLowerCase()}
          key={'Secondary'}
          text={'Secondary'.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem', height:'25rem' }}
          className="mb-2"
        >
          <Card.Body>
            <Card.Title>Mr. Green</Card.Title>
            <Card.Img variant="top" src="holder.js/100px180" />
          </Card.Body>
        </Card>
      </Carousel.Item>
      <Carousel.Item>
        <Card
            bg={'Secondary'.toLowerCase()}
            key={'Secondary'}
            text={'Secondary'.toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{ width: '18rem', height:'25rem' }}
            className="mb-2"
            >
        <Card.Body>
            <Card.Title>Knife</Card.Title>
            <Card.Img variant="top" src="holder.js/100px180" />
        </Card.Body>
        </Card>
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;
