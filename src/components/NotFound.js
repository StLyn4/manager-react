import { useLocation } from 'react-router-dom';

const NotFound = props => {
  const { pathname } = useLocation();
  document.title = 'Not Found (404)';
  return (
    <h1>Совпадений не найдено: {pathname}</h1>
  );
};

export default NotFound;
