import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

//react-bootstrap
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import {
  dbLinkAll,
  dbLinkRejected,
  dbLinkUnaccepted,
  dbLinkInProgress,
  dbLinkDone,
} from '../getElements/getElements';

//firebase
import { linkToFirebase } from '../../services/dbLinks';
import { storage } from '../../firebase';

import tresh from '../../img/icons/alternate-trash.svg';

import './problemIdPopups.css';

const StartPopup = (props) => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState(null);

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
    await deleteProblem(`${linkToFirebase}/${dbLinkRejected}`);
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
          .post(`${linkToFirebase}/${dbLinkAll}.json`, {
            ...props.data,
            comment: input,
          })
          .catch(() => alert('Не удалось переместить заявку'));
        await axios
          .post(`${linkToFirebase}/${dbLinkInProgress}.json`, {
            ...props.data,
            comment: input,
          })
          .then(() => alert('Заявка перешла в раздел "в процессе"'))
          .catch(() => alert('Не удалось переместить заявку'));
      });
  };

  const imagesDelete = () => {
    storage
      .ref(`${props.linkForImg}`)
      .listAll()
      .then((res) => {
        res.items.forEach((item) => {
          storage.ref(item.location.path_).delete();
        });
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
          <Form.Control
            type="text"
            placeholder="Комментарий"
            style={{ marginTop: '28px' }}
            onChange={(e) => setInput(e.target.value)}
          />
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
                await imagesDelete();
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

const EndBtn = (props) => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState({});
  const [num, setNum] = useState(0);
  const [input, setInput] = useState(null);

  const deleteProblem = async (dbLink) => {
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
    await deleteProblem(`${linkToFirebase}/${dbLinkRejected}`);
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
          .forEach(async (arr) => {
            await axios.delete(
              `${linkToFirebase}/${dbLinkDone}/${arr.id}.json`
            );
          });

        await axios
          .post(`${linkToFirebase}/${dbLinkAll}.json`, {
            ...props.data,
            comment: input,
          })
          .catch(() => alert('Не удалось переместить заявку'));
        await axios
          .post(`${linkToFirebase}/${dbLinkDone}.json`, {
            ...props.data,
            comment: input,
          })
          .then(() => {
            alert('Заявка перешла в раздел "выполнено"');
          })
          .catch(() => {
            alert('Не удалось переместить заявку');
          });
      });
  };

  const imgHandleChange = (e) => {
    if (e.target.files[0]) {
      setImage({ ...image, [num]: e.target.files[0] });
      setNum(num + 1);
    }
  };
  const imgHandleUpload = async () => {
    await storage
      .ref(`${props.linkForImg}`)
      .listAll()
      .then((res) => {
        res.items.forEach((item) => {
          storage.ref(item.location.path_).delete();
        });
      });

    const setFireRef = (i) => {
      if (image[i]) {
        storage.ref(`${props.linkForImg}/${image[i].name}`).put(image[i]);
      }
    };

    for (let i = 0; i < 7; i++) {
      setFireRef(i);
    }
  };

  return (
    <>
      <Button
        variant="light"
        onClick={() => setShow(true)}
        style={{ boxShadow: 'none' }}
      >
        Закончить выполнение
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Прикрепите фото</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Заявка перейдет в раздел "выполнено"
          <Form.Control
            type="text"
            placeholder="Комментарий"
            style={{ marginTop: '28px' }}
            onChange={(e) => setInput(e.target.value)}
          />
          <Form.Control
            type="file"
            onChange={imgHandleChange}
            style={{ marginTop: '15px' }}
          />
          <Form.Control
            type="file"
            onChange={imgHandleChange}
            style={{ marginTop: '15px' }}
          />
          <Form.Control
            type="file"
            onChange={imgHandleChange}
            style={{ marginTop: '15px' }}
          />
          <Form.Control
            type="file"
            onChange={imgHandleChange}
            style={{ marginTop: '15px' }}
          />
          <Form.Control
            type="file"
            onChange={imgHandleChange}
            style={{ marginTop: '15px' }}
          />
          <Form.Control
            type="file"
            onChange={imgHandleChange}
            style={{ margin: '15px 0 12px 0' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Отмена
          </Button>
          <Link to="/">
            <Button
              variant="primary"
              onClick={async () => {
                setShow(false);
                await imgHandleUpload();
                await transferProdlem();
                await setTimeout(() => {
                  window.location.reload();
                }, 500);
              }}
            >
              Подтвердить
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const RejectedPopup = (props) => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState(null);

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
    await deleteProblem(`${linkToFirebase}/${dbLinkRejected}`);
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
          .post(`${linkToFirebase}/${dbLinkAll}.json`, {
            ...props.data,
            comment: input,
          })
          .catch(() => alert('Не удалось переместить заявку'));
        await axios
          .post(`${linkToFirebase}/${dbLinkRejected}.json`, {
            ...props.data,
            comment: input,
          })
          .then(() => alert('Заявка перешла в раздел "отклоненные"'))
          .catch(() => alert('Не удалось переместить заявку'));
      });
  };

  const imagesDelete = () => {
    storage
      .ref(`${props.linkForImg}`)
      .listAll()
      .then((res) => {
        res.items.forEach((item) => {
          storage.ref(item.location.path_).delete();
        });
      });
  };

  return (
    <>
      <Button
        variant="light"
        onClick={() => setShow(true)}
        style={{ boxShadow: 'none' }}
      >
        Отклонить
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <ModalHeader closeButton style={{ border: 'none' }} />
        <ModalBody>
          Заявка перейдет в раздел "отклоненные" и ей будет присвоен
          соответствующий статус о выполнении
          <Form.Control
            type="text"
            placeholder="Комментарий"
            style={{ marginTop: '28px' }}
            onChange={(e) => setInput(e.target.value)}
          />
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
                await imagesDelete();
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
    await deleteProblem(`${linkToFirebase}/${dbLinkRejected}`);
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

  const imagesDelete = () => {
    storage
      .ref(`${props.linkForImg}`)
      .listAll()
      .then((res) => {
        res.items.forEach((item) => {
          storage.ref(item.location.path_).delete();
        });
      });
  };

  return (
    <>
      <Button
        variant="light"
        onClick={() => {
          setShow(true);
        }}
        className="tresh-btn"
      >
        Удалить
        <img src={tresh} alt="tresh" />
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <ModalHeader closeButton style={{ border: 'none' }} />
        <ModalBody style={{paddingBottom: '60px'}}>
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
                await imagesDelete();
                await transferProdlem();
                await alert('Заявка удалена');
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
};

const MainPopup = (props) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setShow(true)}
        className="tresh-btn"
      >
        Переместить
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <ModalHeader closeButton style={{ border: 'none' }} />
        <ModalBody
          className="modal-body-main-popup"
          style={{ padding: '0 10px 20px 10px' }}
        >
          <StartPopup
            onFadePopup={() => setShow(false)}
            dbLink={props.dbLink}
            linkForImg={props.linkForImg}
            id={props.id}
            data={props.startData}
          />
          <EndBtn
            onFadePopup={() => setShow(false)}
            dbLink={props.dbLink}
            linkForImg={props.linkForImg}
            id={props.id}
            data={props.endData}
          />
          <RejectedPopup
            onFadePopup={() => setShow(false)}
            dbLink={props.dbLink}
            linkForImg={props.linkForImg}
            id={props.id}
            data={props.rejectedData}
          />
          <DeleteBtn
            onFadePopup={() => setShow(false)}
            dbLink={props.dbLink}
            id={props.id}
            linkForImg={props.linkForImg}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export { MainPopup };
