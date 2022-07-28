import AppItem from '../appItem/AppItem';
import ApplicationsBadge from '../badges/applicationsBadge';
import { Link } from 'react-router-dom';

import problemred from '../../img/icons/red.svg';
import problemyellow from '../../img/icons/yellow.svg';
import problemgreen from '../../img/icons/green.svg';
import problemgrey from '../../img/icons/grey.svg';

const arrMainPage = [
  {
    dbLink: 'all',
    pathLink: 'citiesAll',
    text: 'Все заявки',
  },
  {
    dbLink: 'rejected',
    pathLink: 'citiesRejected',
    text: 'Отклоненные',
    img: problemgrey,
  },
  {
    dbLink: 'unaccepted',
    pathLink: 'citiesUnaccepted',
    text: 'Непринятые',
    img: problemred,
  },
  {
    dbLink: 'inProgress',
    pathLink: 'citiesInProgress',
    text: 'В процессе',
    img: problemyellow,
  },
  {
    dbLink: 'done',
    pathLink: 'citiesDone',
    text: 'Выполнено',
    img: problemgreen,
  },
];

function MainPage() {
  return (
    <>
      {arrMainPage.map(({ pathLink, dbLink, text, img }, i) => (
        <Link to={`/${pathLink}`} className="a" key={i}>
          <AppItem
            text={text}
            altImg="problem"
            img={img}
            badge={<ApplicationsBadge dbLink={dbLink} />}
          />
        </Link>
      ))}
    </>
  );
}

export default MainPage;
