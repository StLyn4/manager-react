import React from 'react';
import { Card, Button, message } from 'antd';
import { HistoryOutlined } from '@ant-design/icons';
import IconSlider from '../../../components/IconSlider';
import { faDove, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons'
import classes from './styles.module.scss';

// Enum для шкалы Торино
const TorinoScale = {
  WHITE:        0,
  GREEN:        1,
  YELLOW_NORM:  2,
  YELLOW:       3,
  YELLOW_DANG:  4,
  ORANGE_NORM:  5,
  ORANGE:       6,
  ORANGE_DANG:  7,
  RED_NORM:     8,
  RED:          9,
  RED_DANG:     10
};

class Meteor extends React.Component {
  state = {
    dangLevel: 0
  };

  changeHandler = value => {
    this.setState({ dangLevel: value });
  };

  resultHandler = e => {
    // Вывод уведомления в замисимости от уровня угрозы, на 2 секунды
    switch (this.state.dangLevel) {
      case TorinoScale.WHITE:
        message.success('Всё в порядке, риска нет. Уровень угрозы: 0', 2);
        break;
      case TorinoScale.GREEN:
        message.success('Стоит бы проверить. Уровень угрозы: 1', 2);
        break;
      case TorinoScale.YELLOW_NORM:
        message.success('Хмм, интересно. Уровень угрозы: 2', 2);
        break;
      case TorinoScale.YELLOW:
        message.warning('Отправляем пару людей на проверку. Уровень угрозы: 3', 2);
        break;
      case TorinoScale.YELLOW_DANG:
        message.warning('Отправляем целый корпус на проверку. Уровень угрозы: 4', 2);
        break;
      case TorinoScale.ORANGE_NORM:
        message.warning('Есть небольшая угроза. Уровень угрозы: 5', 2);
        break;
      case TorinoScale.ORANGE:
        message.error('Здесь становится опасно. Уровень угрозы: 6', 2);
        break;
      case TorinoScale.ORANGE_DANG:
        message.error('Он небезопасен. Уровень угрозы: 7', 2);
        break;
      case TorinoScale.RED_NORM:
        message.error('Небольшой риск столкновения. Уровень угрозы: 8', 2);
        break;
      case TorinoScale.RED:
        message.error('На вашем месте я бы искал новую планету. Уровень угрозы: 9', 2);
        break;
      case TorinoScale.RED_DANG:
        message.error('*Шипение рации* Уровень угрозы: СПАСЕНИЯ НЕТ', 2);
        break;
      default:
        message.info('Данные введены неверно, значение должно быть в диапазоне от 0 до 10, включительно', 2);
    }
  };

  render() {
    return (
      <div className={classes.wrap}>
        <Card title="Выберите уровень опасности для определения последующих действий:" className={classes.card}>
          <IconSlider
            value={this.state.dangLevel}
            min={0}
            max={10}
            preIcon={faDove}
            nextIcon={faSkullCrossbones}
            onChange={this.changeHandler}
          />
        </Card>
        <Button type="primary" onClick={this.resultHandler}><HistoryOutlined />Рассчитать</Button>
      </div>
    );
  }
}

export default Meteor;
