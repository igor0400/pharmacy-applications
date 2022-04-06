import { Link } from 'react-router-dom';
import { Component } from 'react';

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

import tresh from '../../img/icons/alternate-trash.svg';

import './problemIdPopups.css';

class StartPopup extends Component {
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
               if (arr.id2 == this.props.id) {
                  return arr;
               }
            })
            .forEach((arr) => {
               axios.delete(`${dbLink}/${arr.id}.json`);
            });
      });
   }

   async transferProdlem() {
      await this.deleteProblem(
         `${/*link to firebase*/}/${dbLinkAll}`
      );
      await this.deleteProblem(
         `${/*link to firebase*/}/${dbLinkUnaccepted}`
      );
      await this.deleteProblem(
         `${/*link to firebase*/}/${dbLinkInProgress}`
      );

      await axios
         .get(
            `${/*link to firebase*/}/${dbLinkDone}.json`
         )
         .then(async (response) => {
            const applications = [];

            for (let key in response.data) {
               applications.push({ ...response.data[key], id: key });
            }

            await applications
               .filter((arr) => {
                  if (arr.id2 == this.props.id) {
                     return arr;
                  }
               })
               .forEach((arr) => {
                  axios.delete(
                     `${/*link to firebase*/}/${dbLinkDone}/${arr.id}.json`
                  );
               });

            await axios
               .post(
                  `${/*link to firebase*/}/${dbLinkAll}.json`,
                  this.props.data
               )
               .catch(() => alert(this.state.alertText));
            await axios
               .post(
                  `${/*link to firebase*/}/${dbLinkInProgress}.json`,
                  this.props.data
               )
               .then(() => {
                  alert('Заявка перешла в раздел "в процессе"');
               })
               .catch(() => alert(this.state.alertText));
         });
   }

   render() {
      return (
         <>
            <Button
               variant="light"
               onClick={() => this.handleShow()}
               style={{ boxShadow: 'none' }}
            >
               Начать выполнение
            </Button>

            <Modal show={this.state.show} onHide={() => this.handleClose()}>
               <ModalHeader closeButton style={{ border: 'none' }} />
               <ModalBody>
                  Заявка перейдет в раздел "в процессе" и ей будет присвоен
                  соответствующий статус о выполнении
               </ModalBody>
               <ModalFooter style={{ border: 'none' }}>
                  <Button
                     variant="secondary"
                     onClick={() => this.handleClose()}
                  >
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
               if (arr.id2 == this.props.id) {
                  return arr;
               }
            })
            .forEach((arr) => {
               axios.delete(`${dbLink}/${arr.id}.json`);
            });
      });
   }

   async transferProdlem() {
      await this.deleteProblem(
         `${/*link to firebase*/}/${dbLinkAll}`
      );
      await this.deleteProblem(
         `${/*link to firebase*/}/${dbLinkUnaccepted}`
      );
      await this.deleteProblem(
         `${/*link to firebase*/}/${dbLinkInProgress}`
      );

      await axios
         .get(
            `${/*link to firebase*/}/${dbLinkDone}.json`
         )
         .then(async (response) => {
            const applications = [];

            for (let key in response.data) {
               applications.push({ ...response.data[key], id: key });
            }

            await applications
               .filter((arr) => {
                  if (arr.id2 == this.props.id) {
                     return arr;
                  }
               })
               .forEach((arr) => {
                  axios.delete(
                     `${/*link to firebase*/}/${dbLinkDone}/${arr.id}.json`
                  );
               });

            await axios
               .post(
                  `${/*link to firebase*/}/${dbLinkAll}.json`,
                  this.props.data
               )
               .catch(() => alert(this.state.alertText));
            await axios
               .post(
                  `${/*link to firebase*/}/${dbLinkDone}.json`,
                  this.props.data
               )
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
                  <Button
                     variant="secondary"
                     onClick={() => this.handleClose()}
                  >
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

class DeleteBtn extends Component {
   state = {
      show: false,
      alertText: 'Не удалось удалить заявку',
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
               if (arr.id2 == this.props.id) {
                  return arr;
               }
            })
            .forEach((arr) => {
               axios.delete(`${dbLink}/${arr.id}.json`);
            });
      });
   }

   async transferProdlem() {
      await this.deleteProblem(
         `${/*link to firebase*/}/${dbLinkAll}`
      );
      await this.deleteProblem(
         `${/*link to firebase*/}/${dbLinkUnaccepted}`
      );
      await this.deleteProblem(
         `${/*link to firebase*/}/${dbLinkInProgress}`
      );

      await axios
         .get(
            `${/*link to firebase*/}/${dbLinkDone}.json`
         )
         .then(async (response) => {
            const applications = [];

            for (let key in response.data) {
               applications.push({ ...response.data[key], id: key });
            }

            await applications
               .filter((arr) => {
                  if (arr.id2 == this.props.id) {
                     return arr;
                  }
               })
               .forEach((arr) => {
                  axios.delete(
                     `${/*link to firebase*/}/${dbLinkDone}/${arr.id}.json`
                  );
               });
         });
   }

   render() {
      return (
         <>
            <div onClick={() => this.handleShow()} className="tresh-btn">
               <img src={tresh} alt="tresh" />
            </div>

            <Modal show={this.state.show} onHide={() => this.handleClose()}>
               <ModalHeader closeButton style={{ border: 'none' }} />
               <ModalBody>
                  Вы уверенны? Заявка будет удалена из всех разделов без
                  возможности возврата
               </ModalBody>
               <ModalFooter style={{ border: 'none' }}>
                  <Button
                     variant="secondary"
                     onClick={() => this.handleClose()}
                  >
                     Отмена
                  </Button>
                  <Link to="/">
                     <Button
                        variant="primary"
                        onClick={async () => {
                           this.handleClose();
                           await this.transferProdlem();
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
   }
}

export { StartPopup, EndBtn, DeleteBtn };
