import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

import './AppItem.css';

const AppItem = (props) => {
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
        {props.img ? (
          <img src={props.img} alt={props.altImg} className="app-item-img" />
        ) : null}
        <div className="app-item-text" style={props.stylesArr}>
          {props.text}
        </div>
      </div>
      <Badge variant="primary" bg="secondary" pill>
        {props.badge}
      </Badge>
    </ListGroup.Item>
  );
};

export default AppItem;
