// Place for exporting routes
import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const PAGES = {
  '/home': {
    title: 'Задания',
    content: lazy(() => import('./routes/Home'))
  },
  '/': {
    content: props => <Redirect to="/home" />
  },
  '/airplanes': {
    title: 'Самолёты',
    content: lazy(() => import('./routes/Airplanes'))
  },
  '/students': {
    title: 'Студенты',
    content: lazy(() => import('./routes/Students'))
  },
  '/meteor': {
    title: 'Метеорит',
    content: lazy(() => import('./routes/Meteor'))
  }
};

export default PAGES;
