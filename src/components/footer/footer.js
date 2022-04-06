import { Link } from 'react-router-dom';

import './footer.css';

import tools from '../../img/icons/tools.svg';

const Footer = () => {
   return (
      <Link to="/" className='a'>
         <div className="footer">
            <img src={tools} alt="tools" />
            <p>Тех. заявки</p>
         </div>
      </Link>
   );
};

export default Footer;
