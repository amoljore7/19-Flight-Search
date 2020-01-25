import React from 'react'
import Tooltip from 'rc-slider/assets/index.css'
import Slider from 'rc-slider';
const style = { margin: 15 };

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

class FlightSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lowerBound: 0,
      upperBound: 100,
      value: [0, 100]
    };
  }
    
  onSliderChange = (value) => {
    if (typeof this.props.onChange === 'function') {
        this.props.onChange({lowerBound: value[0]*100, upperBound: value[1]*100});
    }
    this.setState({
      value,
    });
  }


  render() {
    return (
      <div style={style}>
        <Range allowCross={false} value={this.state.value} onChange={this.onSliderChange}  tipFormatter={value => `${value*100}`} />
      </div>
    );
  }
}

FlightSlider.propTypes = {
  onChange: React.PropTypes.func
};

export default FlightSlider;
