import React from 'react';
import './Item.css';
import logo from './ItemLogo.svg';

class Flight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingText: 'Book Flight'
    }
  }
  onClickHandler = () => {
    this.setState({
      bookingText: 'Booked'
    })
    alert("Flight Booked successfully..")
  }
  render() {
    return (
      <div className="Item">
        <div className="Item-left">
          <h5>Rs. {this.props.item.price}</h5>
          <div>{this.props.item.flightNumber}</div>
          <div className="Item-price">{this.props.item.originCityCode} > {this.props.item.destCityCode} </div>
          <div className="Item-description">Depart: {this.props.item.deptDateTime}</div>
          <div className="Item-description">Arrive: {this.props.item.retDateTime}</div>
        </div>

        <div className="Item-right">
          <div className="Item-image" >
            <img src={logo} className="Item-logo" alt="logo" />
          </div>
          <button className="Item-book" onClick={this.onClickHandler}>{this.state.bookingText}</button>
        </div>
      </div>
    )
  }
}

export default Flight;
