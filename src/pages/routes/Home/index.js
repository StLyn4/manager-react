import { Card } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGraduate, faPlane, faMeteor } from '@fortawesome/free-solid-svg-icons'
import classes from './styles.module.scss';

const Home = props => {
  return (
    <div className={classes.wrap}>
      <Card
        hoverable
        className={classes.card}
        title={<FontAwesomeIcon className={classes.title} icon={faPlane} />}
        onClick={() => props.history.push('/airplanes')}
      >
        <Card.Meta title="Самолёты" description={<span>Задание №1<br />Управление авиапарком</span>} />
      </Card>
      <Card
        hoverable
        className={classes.card}
        title={<FontAwesomeIcon className={classes.title} icon={faUserGraduate} />}
        onClick={() => props.history.push('/students')}
      >
        <Card.Meta title="Студенты" description={<span>Задание №2<br />Управление студентами</span>} />
      </Card>
      <Card
        hoverable
        className={classes.card}
        title={<FontAwesomeIcon className={classes.title} icon={faMeteor} />}
        onClick={() => props.history.push('/meteor')}
      >
        <Card.Meta title="Метеорит" description={<span>Задание №3<br />На Землю падает метеорит!</span>} />
      </Card>
    </div>
  );
};

export default Home;
