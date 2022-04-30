import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './header.css';

import logo from '../../img/fsimage.jpg';
import arrow from '../../img/icons/arrow-left.svg';

const paths = [
  '/:path',
  '/:path/:city',
  '/:path/:city/:addres',
  '/:path/:city/:addres/:id',
];

const Header = () => {
  return (
    <div className="header">
      <Route exact path="/">
        <div style={{ marginLeft: '40px' }}></div>
      </Route>
      {paths.map((item, i) => (
        <Route exact path={item} key={i}>
          <img
            src={arrow}
            alt="arrow"
            className="arrow-left"
            onClick={() => window.history.back()}
          />
        </Route>
      ))}
      <Link to="/">
        <div className="header-main">
          <img src={logo} alt="logo" className="header-logo" />
          <h3 className="header-text">Тех. заявки</h3>
        </div>
      </Link>
      <div></div>
    </div>
  );
};

export default Header;
