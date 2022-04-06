import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import { Component } from 'react';

import './appItem.css';

class AppItemIcon extends Component {
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
               <img
                  src={this.props.img}
                  alt={this.props.altImg}
                  className="app-item-img"
               />
               <div className="app-item-text" style={this.props.stylesArr}>
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

export default AppItemIcon;
