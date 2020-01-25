
import React from 'react';
import './flightPage.css';
import Flight from '../flight/flight';

function FlightPage({ flightItems }) {
  let length = flightItems.length;


  if (length > 0) {
    return (
      <ul className="ItemPage-items">
        {flightItems.map(item =>
          <li key={item.id} className="ItemPage-item">
            <Flight item={item} />
          </li>
        )}
      </ul>
    );
  } else {
    return (
      <ul className="ItemPage-items">
        <label>
          <h5>There are no flights available.</h5>
        </label>
      </ul>
    );
  }

}
FlightPage.propTypes = {
  flightItems: React.PropTypes.array.isRequired
};

export default FlightPage;
