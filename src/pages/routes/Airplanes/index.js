import React from 'react';
import { Card, Button, Modal } from 'antd';
import { FormOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane, faPlus } from '@fortawesome/free-solid-svg-icons'
import NewAirplaneForm from './components/NewAirplaneForm';
import classes from './styles.module.scss';

class Airplane {
  static freeID = 0;

  constructor(model, crew, passengers, boardNumber, MFR, maximumSpeed, numberOfEngines) {
    this.id = Airplane.freeID++; // Уникальный номер-идентификатор
    this.model = model; // Название / Модель
    this.crew = crew; // Кол-во экипажа
    this.passengers = passengers; // Кол-во пассажиров
    this.boardNumber = boardNumber; // Номер борта
    this.characteristics = {
      MFR, // Максимальная дальность полёта
      maximumSpeed, // Максимальная скорость
      numberOfEngines // Количество двигателей
    };
  }
};

let airplanes = [
  new Airplane('model-1', 2, 20, 11, 1400, 100, 2),
  new Airplane('model-2', 4, 40, 22, 1700, 100, 3),
  new Airplane('model-3', 6, 60, 33, 1800, 120, 4),
  new Airplane('model-4', 8, 80, 44, 2200, 170, 5),
  new Airplane('model-5', 10, 100, 55, 2700, 120, 6),
  new Airplane('model-6', 12, 120, 66, 3000, 130, 8),
];

class Airplanes extends React.Component {
  state = {
    newAirplaneVisible: false
  };

  newAirplaneCreatedHandler = info => {
    this.setState({ newAirplaneVisible: false });
    airplanes.push(new Airplane(
      info.model, info.crew, info.passengers, info.boardNumber, info.MFR, info.maximumSpeed, info.numberOfEngines
    ));
    this.forceUpdate();
  };

  addHandler = e => {
    this.setState({ newAirplaneVisible: true });
  };

  summaryHandler = e => {
    const filtered = airplanes.filter(
      airplane => airplane.characteristics.MFR >= 1700 && airplane.characteristics.MFR <= 2200
    );

    Modal.info({
      title: 'Итоги по авиапарку:',
      content: (
        <div>
          <ol>
            <li>Бортовые номера: {airplanes.map(airplane => airplane.boardNumber).join(', ') || '*Пусто*'}</li>
            <li>Названия и бортовые номера самолётов с дальностью полёта от 1700 до 2200 км:
              <ol>
                {
                  filtered.length ? filtered.map(airplane =>
                    <li key={airplane.id}>{airplane.model} #{airplane.boardNumber} ({airplane.characteristics.MFR} км)</li>
                  ) : <li>*Пусто*</li>
                }
              </ol>
            </li>
            <li>Общая пассажировместимость: {airplanes.reduce((sum, airplane) => sum + airplane.passengers, 0)}</li>
          </ol>
        </div>
      ),
      onOk() {},
    });
  };

  deleteHandler = index => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить запись?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      onOk: () => {
        airplanes.splice(index, 1);
        this.forceUpdate();
      },
      cancelText: 'Отмена',
      onCancel() {}
    });
  };

  render() {
    return (
      <div className={classes.wrap}>
        <NewAirplaneForm
          visible={this.state.newAirplaneVisible}
          onCreate={this.newAirplaneCreatedHandler}
          onCancel={() => {
            this.setState({ newAirplaneVisible: false });
          }}
        />
        <div className={classes.ctrl}>
          <Button type="primary" size="large" onClick={this.addHandler}><FontAwesomeIcon icon={faPlus} /></Button>
          <Button type="primary" size="large" onClick={this.summaryHandler}><FormOutlined />Обработка</Button>
        </div>
        <div className={classes.airplanes}>
          {
            airplanes.map((airplane, index) =>
              <Card
                key={airplane.id}
                hoverable
                className={classes.card}
                title={<div className={classes.title}>
                  <FontAwesomeIcon icon={faPlane} /> {airplane.model}
                </div>}
                extra={
                  <Button onClick={() => this.deleteHandler(index)}><DeleteOutlined /></Button>
                }
              >
                <ul>
                  <li><strong>Модель:</strong> <em>{airplane.model}</em></li>
                  <li><strong>Количество экипажа:</strong> <em>{airplane.crew}</em></li>
                  <li><strong>Количество пассажиров:</strong> <em>{airplane.passengers}</em></li>
                  <li><strong>Номер борта:</strong> <em>{airplane.boardNumber}</em></li>
                  <li><strong>Характеристики:</strong>
                    <ul>
                      <li><strong>Максимальная дальность полёта:</strong> <em>{airplane.characteristics.MFR}</em></li>
                      <li><strong>Максимальная скорость:</strong> <em>{airplane.characteristics.maximumSpeed}</em></li>
                      <li><strong>Количество двигателей:</strong> <em>{airplane.characteristics.numberOfEngines}</em></li>
                    </ul>
                  </li>
                </ul>
              </Card>
            )
          }
        </div>
      </div>
    );
  }
};

export default Airplanes;
