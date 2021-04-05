import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classes from './styles.module.scss';

const LoadingFallback = props => {
  return (
    <Spin
      className={classes.wrap}
      indicator={<LoadingOutlined
        style={{fontSize: props.size}}
        spin
      />}
      delay={props.delay || 0}
    />
  );
};

export default LoadingFallback;
