import { Link } from 'react-router-dom';

import './header.css';

import logo from '../../img/fsimage.jpg';

const Header = () => {
   return (
      <Link to="/" className="a">
         <div className="header">
            <img src={logo} alt="logo" className="header-logo" />
            <h3 className="header-text">Тех. заявки</h3>
         </div>
      </Link>
   );
};

export default Header;
