
import React from 'react';
import './flightPage.css';
import Flight from '../flight/flight';

function FlightPage({ items }) {
  let length = items.length;


  if (length > 0) {
    return (
      <ul className="ItemPage-items">
        {items.map(item =>
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
  items: React.PropTypes.array.isRequired
};

export default FlightPage;
