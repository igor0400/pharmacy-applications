import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useApplicationsService from '../../services/ApplicationsService';
import Fancybox from '../../fancybox/Fancybox';

import { MainPopup } from '../popups/problemIdPopups';

// firebase
import { storage } from '../../firebase';

import './problemId.css';

import greenPlus from '../../img/icons/green-plus.svg';
import bluePlus from '../../img/icons/blue-plus.svg';
import city from '../../img/icons/city-grey.svg';
import clock from '../../img/icons/clock.svg';
import lightning from '../../img/icons/lightning.svg';
import lightningPrioritet from '../../img/icons/lightning-prioritet.svg';
import problemred from '../../img/icons/red.svg';
import problemyellow from '../../img/icons/yellow.svg';
import problemgreen from '../../img/icons/green.svg';
import problemgrey from '../../img/icons/grey.svg';
import lightPrioritet from '../../img/icons/alert-error.svg';
import redPrioritet from '../../img/icons/alert-error-red.svg';

const ProblemId = (props) => {
  const [applications, setApplications] = useState([]);
  const { getApplications } = useApplicationsService();

  useEffect(() => {
    getApplications(props.dbLink).then((response) => {
      const data = [];

      for (let key in response) {
        data.push({ ...response[key], id: key });
      }

      setApplications(data);
    });
  }, []);

  const getAddressParams = (arr) => {
    switch (arr.substring(0, 2)) {
      case 'АД':
        return {
          stylesAddress: { color: 'rgb(0, 177, 31)' },
          imgAddress: greenPlus,
          pharmacyName: (
            <div className="flex">
              <img className="m-4-3" src={greenPlus} alt="plus" />
              <p className="m-0" style={{ color: 'rgb(0, 177, 31)' }}>
                Для Бережливых
              </p>
            </div>
          ),
        };
      case 'ФЗ':
        return {
          stylesAddress: { color: 'rgb(3, 123, 228)' },
          imgAddress: bluePlus,
          pharmacyName: (
            <div className="flex">
              <img className="m-3-3" src={bluePlus} alt="plus" />
              <p className="m-0" style={{ color: 'rgb(3, 123, 228)' }}>
                Формула Здоровья
              </p>
            </div>
          ),
        };
      default:
        return {
          stylesAddress: { color: '#000000' },
          imgAddress: null,
          pharmacyName: 'нет',
        };
    }
  };

  const getPrioritetParams = (arr) => {
    switch (arr) {
      case 'Cрочно':
        return { imgText: lightningPrioritet, prioritetIcon: redPrioritet };
      case 'Не срочно':
        return { imgText: lightning, prioritetIcon: lightPrioritet };
      default:
        return { imgText: null, prioritetIcon: null };
    }
  };

  const statusIcon = (arr) => {
    switch (arr) {
      case 'Не принято':
        return problemred;
      case 'В процессе':
        return problemyellow;
      case 'Выполнено':
        return problemgreen;
      case 'Отклонено':
        return problemgrey;
      default:
        return null;
    }
  };

  const dateDone = () => {
    function plusZero(value) {
      if (value < 10) {
        value = '0' + value;
      }
      return value;
    }

    const now = new Date();
    const day = plusZero(now.getDate());
    const month = plusZero(now.getMonth() + 1);
    const year = now.getFullYear();
    const hours = plusZero(now.getHours());
    const minutes = plusZero(now.getMinutes());
    const seconds = plusZero(now.getSeconds());

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="problemIdCard">
      {applications.map((arr, i) => (
        <Route
          key={i}
          exact
          path={`/${props.pathLink}/${arr.city}/${arr.address}/${arr.id}`}
        >
          <div className="problemIdCard-wrapper">
            <div className="problemIdCard-top">
              <div className="problemIdCard-top-title flex">
                <img src={getAddressParams(arr.address).imgAddress} alt="plus" />
                <h5
                  className="m-0"
                  style={getAddressParams(arr.address).stylesAddress}
                >
                  {arr.address}
                </h5>
              </div>
              <div className="problemIdCard-top-city flex">
                <img src={city} alt="city" />
                <p className="m-0">{arr.city}</p>
              </div>
              <div className="problemIdCard-top-descr flex">
                <img
                  className="m-6-3"
                  src={getPrioritetParams(arr.prioritet).imgText}
                  alt="lightning"
                />
                <p className="m-0">{arr.problem}</p>
              </div>
              <MainPopup
                dbLink={props.dbLink}
                linkForImg={`${arr.city} ${arr.address} ${arr.id2}`}
                id={arr.id2}
                idFirebase={arr.id}
                startData={{
                  ...arr,
                  status: 'В процессе',
                  dateDone: dateDone(),
                }}
                endData={{
                  ...arr,
                  status: 'Выполнено',
                  dateDone: dateDone(),
                }}
                rejectedData={{
                  ...arr,
                  status: 'Отклонено',
                }}
              />
            </div>
            <div className="problemIdCard-bottom">
              <p className="fz-12 m-0">Аптечная сеть</p>
              <div className="default">
                {getAddressParams(arr.address).pharmacyName}
              </div>
              <p className="fz-12 m-0">Статус выполнения</p>
              <div className="problemIdCard-bottom-status flex">
                <img
                  src={statusIcon(arr.status)}
                  alt="status"
                  className="m-0-3"
                />
                <p className="m-0">{arr.status}</p>
              </div>
              {arr.dateDone ? (
                <>
                  {arr.status === 'В процессе' ? (
                    <>
                      <p className="fz-12 m-0">Начало выполнения</p>
                      <div className="problemIdCard-bottom-date">
                        {arr.dateDone}
                      </div>
                    </>
                  ) : arr.status === 'Выполнено' ? (
                    <>
                      <p className="fz-12 m-0">Время выполнения</p>
                      <div className="problemIdCard-bottom-date">
                        {arr.dateDone}
                      </div>
                    </>
                  ) : null}
                </>
              ) : null}

              <p className="fz-12 m-0">Срочность</p>
              <div className="problemIdCard-bottom-prioritet flex">
                <img
                  src={getPrioritetParams(arr.prioritet).prioritetIcon}
                  alt="prioritet"
                  className="m-3-3"
                />
                <p className="m-0">{arr.prioritet}</p>
              </div>

              {arr.comment ? (
                <>
                  <p className="fz-12 m-0">Комментарий</p>
                  <div className="default flex">
                    <p className="m-0">{arr.comment}</p>
                  </div>
                </>
              ) : null}

              <ImagesCollection
                linkToFolder={`${arr.city} ${arr.address} ${arr.id2}`}
              />

              <p className="fz-12 m-0">Ф. И. О.</p>
              <div className="default flex">
                <p className="m-0">{arr.name}</p>
              </div>
              <p className="fz-12 m-0">Должность</p>
              <div className="default flex">
                <p className="m-0">{arr.position}</p>
              </div>
              <p className="fz-12 m-0">Номер телефона</p>
              <div className="default flex">
                <p className="m-0">{arr.phone}</p>
              </div>
              <p className="fz-12 m-0">Заявка от</p>
              <div className="default flex">
                <img src={clock} alt="clock" className="m-3-3" />
                <p className="m-0">{arr.date}</p>
              </div>
            </div>
          </div>
        </Route>
      ))}
    </div>
  );
};

function Images(props) {
  const [links, setLinks] = useState([]);

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
        setLinks(urlsArray);
      });
  }, []);

  return (
    <div className="images">
      {links.map((item, i) => (
        <div key={i}>
          <p className="images-title fz-12">Фото №{i + 1} о выполнении</p>
          <img data-fancybox="gallery" src={item} className="images-img" />
        </div>
      ))}
    </div>
  );
}

function ImagesCollection(props) {
  return (
    <div className="images-collection">
      <Fancybox>
        <Images linkToFolder={props.linkToFolder} />
      </Fancybox>
    </div>
  );
}

export default ProblemId;
