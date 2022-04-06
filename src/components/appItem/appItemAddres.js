import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Component } from 'react';

import './appItem.css';

class AppItemAddres extends Component {
   render() {
      return (
         <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start app-item"
            style={{
               borderTop: 'none',
               borderLeft: 'none',
               borderRight: 'none',
               borderBottom: '1px solid rgb(199, 199, 199)',
            }}
         >
            <div className="app-item-wrapper ms-2 me-auto">
               <div
                  className="app-item-addres-text"
                  style={this.props.stylesArr}
               >
                  <img
                     src={this.props.img}
                     alt="plus"
                     style={{ paddingRight: '3px' }}
                  />
                  {this.props.text}
               </div>
            </div>
            <Badge variant="primary" bg="secondary" pill>
               {this.props.badge}
            </Badge>
         </ListGroup.Item>
      );
   }
}
export default AppItemAddres;
