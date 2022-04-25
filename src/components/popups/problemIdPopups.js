import { Link } from 'react-router-dom';
import { useState, Component } from 'react';

import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import {
  dbLinkAll,
  dbLinkUnaccepted,
  dbLinkInProgress,
  dbLinkDone,
} from '../getElements/getElements';

import { linkToFirebase } from '../../services/dbLinks';

import tresh from '../../img/icons/alternate-trash.svg';

import './problemIdPopups.css';

const StartPopup = (props) => {
  const [show, setShow] = useState(false);

  const deleteProblem = (dbLink) => {
    axios.get(`${dbLink}.json`).then((response) => {
      const applications = [];

      for (let key in response.data) {
        applications.push({ ...response.data[key], id: key });
      }

      applications
        .filter((arr) => {
          if (arr.id2 === props.id) {
            return arr;
          }
        })
        .forEach((arr) => {
          axios.delete(`${dbLink}/${arr.id}.json`);
        });
    });
  };

  const transferProdlem = async () => {
    await deleteProblem(`${linkToFirebase}/${dbLinkAll}`);
    await deleteProblem(`${linkToFirebase}/${dbLinkUnaccepted}`);
    await deleteProblem(`${linkToFirebase}/${dbLinkInProgress}`);
    await axios
      .get(`${linkToFirebase}/${dbLinkDone}.json`)
      .then(async (response) => {
        const applications = [];

        for (let key in response.data) {
          applications.push({ ...response.data[key], id: key });
        }

        await applications
          .filter((arr) => {
            if (arr.id2 === props.id) {
              return arr;
            }
          })
          .forEach((arr) => {
            axios.delete(`${linkToFirebase}/${dbLinkDone}/${arr.id}.json`);
          });

        await axios
          .post(`${linkToFirebase}/${dbLinkAll}.json`, props.data)
          .catch(() => alert('Не удалось переместить заявку'));
        await axios
          .post(`${linkToFirebase}/${dbLinkInProgress}.json`, props.data)
          .then(() => alert('Заявка перешла в раздел "в процессе"'))
          .catch(() => alert('Не удалось переместить заявку'));
      });
  };

  return (
    <>
      <Button
        variant="light"
        onClick={() => setShow(true)}
        style={{ boxShadow: 'none' }}
      >
        Начать выполнение
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <ModalHeader closeButton style={{ border: 'none' }} />
        <ModalBody>
          Заявка перейдет в раздел "в процессе" и ей будет присвоен
          соответствующий статус о выполнении
        </ModalBody>
        <ModalFooter style={{ border: 'none' }}>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Отмена
          </Button>
          <Link to="/">
            <Button
              variant="primary"
              onClick={async () => {
                setShow(false);
                await transferProdlem();
                await window.location.reload();
              }}
            >
              Подтвердить
            </Button>
          </Link>
        </ModalFooter>
      </Modal>
    </>
  );
};

const DeleteBtn = (props) => {
  const [show, setShow] = useState(false);

  const deleteProblem = (dbLink) => {
    axios.get(`${dbLink}.json`).then((response) => {
      const applications = [];

      for (let key in response.data) {
        applications.push({ ...response.data[key], id: key });
      }

      applications
        .filter((arr) => {
          if (arr.id2 === props.id) {
            return arr;
          }
        })
        .forEach((arr) => {
          axios.delete(`${dbLink}/${arr.id}.json`);
        });
    });
  };

  const transferProdlem = async () => {
    await deleteProblem(`${linkToFirebase}/${dbLinkAll}`);
    await deleteProblem(`${linkToFirebase}/${dbLinkUnaccepted}`);
    await deleteProblem(`${linkToFirebase}/${dbLinkInProgress}`);
    await axios
      .get(`${linkToFirebase}/${dbLinkDone}.json`)
      .then(async (response) => {
        const applications = [];

        for (let key in response.data) {
          applications.push({ ...response.data[key], id: key });
        }

        await applications
          .filter((arr) => {
            if (arr.id2 === props.id) {
              return arr;
            }
          })
          .forEach((arr) => {
            axios.delete(`${linkToFirebase}/${dbLinkDone}/${arr.id}.json`);
          });
      })
      .catch(() => alert('Не удалось удалить заявку'));
  };

  return (
    <>
      <div onClick={() => setShow(true)} className="tresh-btn">
        <img src={tresh} alt="tresh" />
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <ModalHeader closeButton style={{ border: 'none' }} />
        <ModalBody>
          Вы уверенны? Заявка будет удалена из всех разделов без возможности
          возврата
        </ModalBody>
        <ModalFooter style={{ border: 'none' }}>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Отмена
          </Button>
          <Link to="/">
            <Button
              variant="primary"
              onClick={async () => {
                setShow(false);
                await transferProdlem();
                await alert('Заявка удалена');
                await window.location.reload();
              }}
            >
              Подтвердить
            </Button>
          </Link>
        </ModalFooter>
      </Modal>
    </>
  );
};

class EndBtn extends Component {
  state = {
    show: false,
    alertText: 'Не удалось переместить заявку',
  };

  handleClose() {
    this.setState({ show: false });
  }
  handleShow() {
    this.setState({ show: true });
  }

  async deleteProblem(dbLink) {
    axios.get(`${dbLink}.json`).then((response) => {
      const applications = [];

      for (let key in response.data) {
        applications.push({ ...response.data[key], id: key });
      }

      applications
        .filter((arr) => {
          if (arr.id2 === this.props.id) {
            return arr;
          }
        })
        .forEach((arr) => {
          axios.delete(`${dbLink}/${arr.id}.json`);
        });
    });
  }

  async transferProdlem() {
    await this.deleteProblem(`${linkToFirebase}/${dbLinkAll}`);
    await this.deleteProblem(`${linkToFirebase}/${dbLinkUnaccepted}`);
    await this.deleteProblem(`${linkToFirebase}/${dbLinkInProgress}`);
    await axios
      .get(`${linkToFirebase}/${dbLinkDone}.json`)
      .then(async (response) => {
        const applications = [];

        for (let key in response.data) {
          applications.push({ ...response.data[key], id: key });
        }

        await applications
          .filter((arr) => {
            if (arr.id2 === this.props.id) {
              return arr;
            }
          })
          .forEach((arr) => {
            axios.delete(`${linkToFirebase}/${dbLinkDone}/${arr.id}.json`);
          });

        await axios
          .post(`${linkToFirebase}/${dbLinkAll}.json`, this.props.data)
          .catch(() => alert(this.state.alertText));
        await axios
          .post(`${linkToFirebase}/${dbLinkDone}.json`, this.props.data)
          .then(() => {
            alert('Заявка перешла в раздел "выполнено"');
          })
          .catch(() => {
            alert(this.state.alertText);
          });
      });
  }

  render() {
    return (
      <>
        <Button
          variant="outline-dark"
          onClick={() => this.handleShow()}
          style={{ boxShadow: 'none' }}
        >
          Закончить выполнение
        </Button>

        <Modal show={this.state.show} onHide={() => this.handleClose()}>
          <ModalHeader closeButton style={{ border: 'none' }} />
          <ModalBody>
            Заявка перейдет в раздел "выполнено" и ей будет присвоен
            соответствующий статус о выполнении
          </ModalBody>
          <ModalFooter style={{ border: 'none' }}>
            <Button variant="secondary" onClick={() => this.handleClose()}>
              Отмена
            </Button>
            <Link to="/">
              <Button
                variant="primary"
                onClick={async () => {
                  this.handleClose();
                  await this.transferProdlem();
                  await setTimeout(() => {
                    window.location.reload();
                  }, 500);
                }}
              >
                Подтвердить
              </Button>
            </Link>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export { StartPopup, EndBtn, DeleteBtn };
