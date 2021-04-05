import React from 'react';
import { Card, Button, Modal } from 'antd';
import { FormOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGraduate, faPlus } from '@fortawesome/free-solid-svg-icons'
import NewStudentForm from './components/NewStudentForm';
import classes from './styles.module.scss';

class Student {
  static freeID = 0;

  constructor(name, group, course, bookNumber, ukrLang, pe, engLang) {
    this.id = Student.freeID++; // Уникальный номер-идентификатор
    this.name = name; // ФИО
    this.group = group; // Группа
    this.course = course; // Курс
    this.bookNumber = bookNumber; // Номер зачётной книжки
    this.rating = {
      ukrLang, // Оценка с украинского языка
      pe, // Оценка с физ. культуры
      engLang // Оценка с английского языка
    };

    const rating = Object.values(this.rating);
    this.averageRating = rating.reduce((sum, current) => sum + current, 0) / rating.length;
  }
};

let students = [
  new Student('Иван Иванов', 'КГ-1001', 2, 111, 10, 10, 9),
  new Student('Василий Васильев', 'КГ-1001', 2, 222, 8, 8, 9),
  new Student('Михаил Иванов', 'НГ-1001', 1, 333, 9, 8, 7),
  new Student('Григорий Иванов', 'НГ-1401', 1, 444, 2, 4, 5),
  new Student('Марк Антонович', 'ОГ-1201', 1, 555, 12, 1, 6),
  new Student('Игорь Ли', 'ОГ-1101', 3, 666, 1, 1, 12),
  new Student('Иван Иванов', 'ДГ-1501', 3, 777, 3, 10, 5)
];

class Students extends React.Component {
  state = {
    newStudentVisible: false
  };

  newStudentCreatedHandler = info => {
    this.setState({ newStudentVisible: false });
    students.push(new Student(
      info.name, info.group, info.course, info.bookNumber, info.ukrLang, info.pe, info.engLang
    ));
    this.forceUpdate();
  };

  addHandler = e => {
    this.setState({ newStudentVisible: true });
  };

  summaryHandler = e => {
    const filteredByCource = students.filter(student => student.course <= 2);
    const filteredByRating = students.filter(student => student.averageRating >= 8);

    Modal.info({
      title: 'Итоги по студентам:',
      content: (
        <div>
          <ol>
            <li>Студенты, которые учатся на 1-м или 2-м курсе:
              <ol>
                {
                  filteredByCource.length ? filteredByCource.map(student =>
                    <li>{student.name} ({student.course} курс)</li>
                  ) : <li>*Пусто*</li>
                }
              </ol>
            </li>
            <li>Студенты со средним баллом 8 и больше:
              <ol>
                {
                  filteredByRating.length ? filteredByRating.map(student =>
                    <li>{student.name} (~{student.averageRating.toFixed(2)})</li>
                  ) : <li>*Пусто*</li>
                }
              </ol>
            </li>
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
        students.splice(index, 1);
        this.forceUpdate();
      },
      cancelText: 'Отмена',
      onCancel() {}
    });
  };

  render() {
    return (
      <div className={classes.wrap}>
        <NewStudentForm
          visible={this.state.newStudentVisible}
          onCreate={this.newStudentCreatedHandler}
          onCancel={() => {
            this.setState({ newStudentVisible: false });
          }}
        />
        <div className={classes.ctrl}>
          <Button type="primary" size="large" onClick={this.addHandler}><FontAwesomeIcon icon={faPlus} /></Button>
          <Button type="primary" size="large" onClick={this.summaryHandler}><FormOutlined />Обработка</Button>
        </div>
        <div className={classes.students}>
          {
            students.map((student, index) =>
              <Card
                key={student.id}
                hoverable
                className={classes.card}
                title={<div className={classes.title}>
                  <FontAwesomeIcon icon={faUserGraduate} /> {student.name}
                </div>}
                extra={
                  <Button onClick={() => this.deleteHandler(index)}><DeleteOutlined /></Button>
                }
              >
                <ul>
                  <li><strong>ФИО:</strong> <em>{student.name}</em></li>
                  <li><strong>Группа:</strong> <em>{student.group}</em></li>
                  <li><strong>Курс:</strong> <em>{student.course}</em></li>
                  <li><strong>Номер зачётной книжки:</strong> <em>{student.bookNumber}</em></li>
                  <li><strong>Оценки:</strong>
                    <ul>
                      <li><strong>Украинский язык:</strong> <em>{student.rating.ukrLang}</em></li>
                      <li><strong>Физ. культура:</strong> <em>{student.rating.pe}</em></li>
                      <li><strong>Английский язык:</strong> <em>{student.rating.engLang}</em></li>
                    </ul>
                  </li>
                  <li><strong>Средний балл:</strong> <em>{student.averageRating.toFixed(2)}</em></li>
                </ul>
              </Card>
            )
          }
        </div>
      </div>
    );
  }
};

export default Students;
