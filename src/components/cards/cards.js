import { Component } from 'react';
import Card from 'react-bootstrap/Card';

import './cards.css';

class Cards extends Component {
   imgText() {
      let imgText;

      if (this.props.prioritet === 'Cрочно') {
         imgText = this.props.imgPrioritet;
      } else {
         imgText = this.props.imgText;
      }

      return imgText;
   }

   styles() {
      let styles;

      if (this.props.prioritet === 'Cрочно') {
         styles = { color: '#C55300' };
      }

      return styles;
   }

   render() {
      return (
         <Card className="cards">
            <Card.Body>
               <Card.Title style={{ fontSize: '17px', margin: '0 0 5px' }}>
                  <img
                     src={this.props.imgTitle}
                     alt="clock"
                     className="cards-img1"
                  />
                  {this.props.title}
               </Card.Title>
               <Card.Text className="flex" style={this.styles()}>
                  <img
                     src={this.imgText()}
                     alt="clock"
                     className="cards-img2"
                  />
                  {this.props.text}
               </Card.Text>
            </Card.Body>
         </Card>
      );
   }
}

export default Cards;
