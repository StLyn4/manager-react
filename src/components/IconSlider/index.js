import React from 'react';
import { Slider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './styles.module.scss';

class IconSlider extends React.Component {
  state = {
    value: 0,
  };

  handleChange = value => {
    this.setState({ value });
    this.props.onChange && this.props.onChange(value);
  };

  render() {
    const { max, min } = this.props;
    const value = this.props.value || this.state.value;
    const mid = ((max - min) / 2).toFixed(5);
    const { preIcon, nextIcon } = this.props;
    const preClassName = value >= mid ? '' : classes['icon-active'];
    const nextClassName = value >= mid ? classes['icon-active'] : '';

    return (
      <div className={classes.wrap}>
        <FontAwesomeIcon icon={preIcon} className={[classes.icon, preClassName].join(' ')} />
        <Slider {...this.props} onChange={this.handleChange} value={value} className={classes.slider} />
        <FontAwesomeIcon icon={nextIcon} className={[classes.icon, nextClassName].join(' ')} />
      </div>
    );
  }
}

export default IconSlider;
