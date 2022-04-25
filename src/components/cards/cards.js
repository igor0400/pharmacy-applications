import Card from 'react-bootstrap/Card';

import './cards.css';

const Cards = (props) => {
  const imgText = () => {
    let imgText;

    if (props.prioritet === 'Cрочно') {
      imgText = props.imgPrioritet;
    } else {
      imgText = props.imgText;
    }

    return imgText;
  };

  const styles = () => {
    let styles;

    if (props.prioritet === 'Cрочно') {
      styles = { color: '#C55300' };
    }

    return styles;
  };

  return (
    <Card className="cards">
      <Card.Body>
        <Card.Title style={{ fontSize: '17px', margin: '0 0 5px' }}>
          <img src={props.imgTitle} alt="clock" className="cards-img1" />
          {props.title}
        </Card.Title>
        <Card.Text className="flex" style={styles()}>
          <img src={imgText()} alt="clock" className="cards-img2" />
          {props.text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Cards;
