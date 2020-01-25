

import React, { Component } from 'react';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FlightPage from '../flightPage/flightPage';
import { items } from '../../data/data';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import FlightSlider from '../FlightSlider/flightSlider';
import APIConfig from '../../JSON_file/urls.json'
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '',
      originCity: '',
      destCity: '',
      deptDate: '',
      retDate: '',
      passengerCount: 1,
      items: items
    };
    moment.updateLocale('en', {
      calendar: {
        sameElse: 'Do MMM YYYY'
      }
    });
  }

async componentDidMount(){
 const response = await fetch(APIConfig.configUrl.flight_get_data, {
          method: 'GET',
          headers: {
            'Content-Type': 'Application/JSON'
          },
        })
        const res =  await response.json();
        if(res){
          console.log("Data Feched comming")
        }else{
          alert("Data Not Feched...")
        }
}

  handleChangeSlider = (obj) => {

    this.setState({
      sliderRangeObj: obj
    });

    const objToMatch = {
      originCity: this.state.originCity,
      destCity: this.state.destCity
    };

    let filteredData = this.findByMatchingProperties(items, objToMatch);
    filteredData = filteredData.filter(this.filterByPrice);
    this.setState({
      items: filteredData
    });
  }

  filterByPrice = (item) => {
    return (item.price >= this.state.sliderRangeObj.lowerBound && item.price <= this.state.sliderRangeObj.upperBound);
  }

  handleChangeOriginCity = (event) => {
    const objToMatch = {
      originCity: event.target.value
    };

    const filteredData = this.findByMatchingProperties(items, objToMatch);
    if (filteredData.length !== 0) {
      this.setState({
        originCity: event.target.value,
        items: filteredData
      });
    }
  }

  handleChangeDestCity = (event) => {
    const destCity = event.target.value ? event.target.value : "";
    const objToMatch = {
      originCity: this.state.originCity,
      destCity: destCity
    };

    const filteredData = this.findByMatchingProperties(items, objToMatch);

    if (filteredData.length !== 0) {
      this.setState({
        destCity: event.target.value,
        items: filteredData
      });
    }
  }

  handleSubmit = (event) => {
    alert("Results filtered");
  }

  handleSelect = (index, last) => {
    this.setState({
      selectedTab: index
    });
  }

  handlePassengerCountChange = (event) => {
    this.setState({ passengerCount: event.target.value });
  }

  handleStartDateChange = (date) => {
    this.setState({
      startDate: date
    });
  }

  findByMatchingProperties = (arrObj, matchingObj) => {
    return arrObj.filter(function (entry) {
      return Object.keys(matchingObj).every(function (key) {
        return (entry[key].toUpperCase().indexOf(matchingObj[key].toUpperCase()) === 0);
      });
    });
  }

  handleEndDateChange = (date) => {
    this.setState({
      endDate: date
    });
  }

  render() {

    var originCity = this.state.originCity ? this.state.originCity : "";
    var destCity = this.state.destCity ? this.state.destCity : "";
    var headerElem = "";
    var startDate = this.state.startDate ? "Depart: " + this.state.startDate.toString().slice(4, 15) : "";
    if (!!originCity && !!destCity) {
      headerElem =
        <div>
          <h5> {this.state.originCity} > {this.state.destCity} </h5>
        </div>
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Flight Search</h2>
        </div>
        <div className="container">
          <div className="one-third column">
            <Tabs onSelect={this.handleSelect}>
              <TabList>
                <Tab>One Way</Tab>
                <Tab>Return</Tab>
              </TabList>

              <TabPanel>
                <div className="Item">
                  <form>
                    <input className="row" type="text" value={this.state.originCity} onChange={this.handleChangeOriginCity} placeholder="Enter Origin City" />
                    <input className="row" type="text" value={this.state.destCity} onChange={this.handleChangeDestCity} placeholder="Enter Destination City" />
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleStartDateChange}
                      minDate={moment()}
                      maxDate={moment().add(30, "days")}
                      placeholderText="Departure Date" />
                    <input className="row" type="text" value={this.state.passengerCount} onChange={this.handlePassengerCountChange} placeholder="Passengers" />
                    <input type="submit" value="Search" onClick={this.handleSubmit}/>
                  </form>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="Item">
                  <form onSubmit={this.handleSubmit}>
                    <input className="row" type="text" value={this.state.originCity} onChange={this.handleChangeOriginCity} placeholder="Enter Origin City" />
                    <input className="row" type="text" value={this.state.destCity} onChange={this.handleChangeDestCity} placeholder="Enter Destination City" />
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleStartDateChange}
                      minDate={moment()}
                      maxDate={moment().add(30, "days")}
                      placeholderText="Departure Date" />
                    <DatePicker
                      selected={this.state.endDate}
                      onChange={this.handleEndDateChange}
                      minDate={moment()}
                      maxDate={moment().add(30, "days")}
                      placeholderText="Return Date" />
                    <input className="row" type="text" value={this.state.passengerCount} onChange={this.handlePassengerCountChange} />
                    <input className="row" type="submit" value="Search" />
                  </form>
                </div>
              </TabPanel>
            </Tabs>
            <div>
              <div className="label">
                <label><h5>Refine Flight Search</h5></label>
                <FlightSlider onChange={this.handleChangeSlider} />
              </div>
            </div>

          </div>
          <div className="two-thirds column">
            <div className="header">
              <div className="Item-left">
                {headerElem}
              </div>
              <div className="Item-right">
                {startDate}
              </div>
            </div>
            <main>
              <FlightPage items={this.state.items} />
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
