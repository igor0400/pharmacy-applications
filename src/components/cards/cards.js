import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { storage } from '../../firebase';

import LoadingSmall from '../loading/LoadingSmall';
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

  return (
    <Card className="cards">
      <Card.Body style={{ padding: '10px 15px 10px 10px' }}>
        <div className="image">
          <Image linkToFolder={props.imageLink} />
        </div>
        <div className="cards-descr">
          <Card.Title style={{ fontSize: '17px', margin: '0 0 5px' }}>
            <img src={props.imgTitle} alt="clock" className="cards-img1" />
            {props.title}
          </Card.Title>
          <Card.Text className="flex">
            <img src={imgText()} alt="clock" className="cards-img2" />
            {props.text}
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

function Image(props) {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storage
      .ref(props.linkToFolder)
      .listAll()
      .then((result) => {
        const promises = [];
        result.items.forEach((imageRef) => {
          promises.push(imageRef.getDownloadURL());
        });
        return Promise.all(promises);
      })
      .then((urlsArray) => {
        setLoading(false);
        setLinks(urlsArray);
      });
  }, []);

  const spinner = loading ? (
    <div className="image-loading">
      <LoadingSmall />
    </div>
  ) : null;

  return (
    <>
      {spinner}
      {!spinner ? (
        links[0] ? (
          <img src={links[0]} className="image-picture" />
        ) : (
          <div className="padding"></div>
        )
      ) : null}
    </>
  );
}

export default Cards;
