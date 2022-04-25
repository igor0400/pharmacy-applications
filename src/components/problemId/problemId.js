import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useApplicationsService from '../../services/ApplicationsService';

import { StartPopup, EndBtn, DeleteBtn } from '../popups/problemIdPopups';
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

  const stylesAddres = (arr) => {
    let style;

    if (arr.substring(0, 2) === 'АД') {
      style = { color: 'rgb(0, 177, 31)' };
    } else if (arr.substring(0, 2) === 'ФЗ') {
      style = { color: 'rgb(3, 123, 228)' };
    }

    return style;
  };

  const imgAddres = (arr) => {
    let img;

    if (arr.substring(0, 2) === 'АД') {
      img = greenPlus;
    } else if (arr.substring(0, 2) === 'ФЗ') {
      img = bluePlus;
    }

    return img;
  };

  const imgText = (arr) => {
    let imgText;

    if (arr === 'Cрочно') {
      imgText = lightningPrioritet;
    } else {
      imgText = lightning;
    }

    return imgText;
  };

  const stylesText = (arr) => {
    let styles;

    if (arr === 'Cрочно') {
      styles = { color: '#C55300' };
    }

    return styles;
  };

  const pharmacyName = (arr) => {
    let name;

    if (arr.substring(0, 2) === 'АД') {
      name = (
        <div className="flex">
          <img className="m-4-3" src={greenPlus} alt="plus" />
          <p className="m-0" style={{ color: 'rgb(0, 177, 31)' }}>
            Для Бережливых
          </p>
        </div>
      );
    } else if (arr.substring(0, 2) === 'ФЗ') {
      name = (
        <div className="flex">
          <img className="m-3-3" src={bluePlus} alt="plus" />
          <p className="m-0" style={{ color: 'rgb(3, 123, 228)' }}>
            Формула Здоровья
          </p>
        </div>
      );
    }

    return name;
  };

  const statusIcon = (arr) => {
    let img;

    if (arr === 'Не принято') {
      img = problemred;
    } else if (arr === 'В процессе') {
      img = problemyellow;
    } else if (arr === 'Выполнено') {
      img = problemgreen;
    }

    return img;
  };

  const prioritetIcon = (arr) => {
    let img;

    if (arr === 'Cрочно') {
      img = redPrioritet;
    } else if (arr === 'Не срочно') {
      img = lightPrioritet;
    }

    return img;
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
          path={`/${props.pathLink}/${arr.city}/${arr.addres}/${arr.id}`}
        >
          <div className="problemIdCard-wrapper">
            <div className="problemIdCard-top">
              <div className="problemIdCard-top-title flex">
                <img className="m-4-3" src={imgAddres(arr.addres)} alt="plus" />
                <h5 className="m-0" style={stylesAddres(arr.addres)}>
                  {arr.addres}
                </h5>
              </div>
              <div className="problemIdCard-top-city flex">
                <img src={city} alt="city" />
                <p className="m-0">{arr.city}</p>
              </div>
              <div className="problemIdCard-top-descr flex">
                <img
                  className="m-6-3"
                  src={imgText(arr.prioritet)}
                  alt="lightning"
                />
                <p className="m-0" style={stylesText(arr.prioritet)}>
                  {arr.problem}
                </p>
              </div>
              <div className="problemIdCard-top-btns">
                <StartPopup
                  dbLink={props.dbLink}
                  id={arr.id2}
                  data={{ ...arr, status: 'В процессе', dateDone: dateDone() }}
                />
                <EndBtn
                  dbLink={props.dbLink}
                  id={arr.id2}
                  data={{
                    ...arr,
                    status: 'Выполнено',
                    dateDone: dateDone(),
                  }}
                />
                <DeleteBtn dbLink={props.dbLink} id={arr.id2} />
              </div>
            </div>
            <div className="problemIdCard-bottom">
              <p className="fz-10 m-0">Аптечная сеть</p>
              <div className="default">{pharmacyName(arr.addres)}</div>
              <p className="fz-10 m-0">Статус выполнения</p>
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
                      <p className="fz-10 m-0">Начало выполнения</p>
                      <div className="problemIdCard-bottom-date">
                        {arr.dateDone}
                      </div>
                    </>
                  ) : arr.status === 'Выполнено' ? (
                    <>
                      <p className="fz-10 m-0">Время выполнения</p>
                      <div className="problemIdCard-bottom-date">
                        {arr.dateDone}
                      </div>
                    </>
                  ) : null}
                </>
              ) : null}

              <p className="fz-10 m-0">Срочность</p>
              <div className="problemIdCard-bottom-prioritet flex">
                <img
                  src={prioritetIcon(arr.prioritet)}
                  alt="prioritet"
                  className="m-3-3"
                />
                <p className="m-0">{arr.prioritet}</p>
              </div>
              <p className="fz-10 m-0">Ф. И. О.</p>
              <div className="default flex">
                <p className="m-0">{arr.name}</p>
              </div>
              <p className="fz-10 m-0">Должность</p>
              <div className="default flex">
                <p className="m-0">{arr.position}</p>
              </div>
              <p className="fz-10 m-0">Номер телефона</p>
              <div className="default flex">
                <p className="m-0">{arr.phone}</p>
              </div>
              <p className="fz-10 m-0">Заявка от</p>
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

export default ProblemId;
