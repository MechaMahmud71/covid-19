import React, { Component } from "react";
import axios from "axios";
import "./card.css";

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmed: 0,
            recovered: 0,
            deaths: 0,
            externalData: false
        };
    }

    componentDidMount = () => {
        async function getData() {
            try {
                const result = await axios.get(`https://covid19.mathdro.id/api`);
                const data = await result.data;
                //console.log(data);
                return data;
            } catch (error) {
                console.log(error);
            }
        }

        let globalData;

        getData().then(data => {
            globalData = data;
            this.setState({
                confirmed: globalData.confirmed.value,
                recovered: globalData.recovered.value,
                deaths: globalData.deaths.value
            });
        });
    };

    render() {

        const calanderDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

        const date = new Date();
        let currentDayNumber = date.getDay();
        let currentday = calanderDays[currentDayNumber];
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



        const capitalize = (s) => {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }

        const dayName = capitalize(currentday);
        const year = date.getFullYear();
        const dayNumber = date.getDate();
        const month = months[date.getMonth()];

        console.log(month);








        return (
            <div className="card-container">
                <div className="subContainer infected-container">
                    <p className="header infetcted-header">Infected</p>
                    {
                        this.props.externalData ? <p className="value infected-value">{this.state.confirmed}</p> : <p className="value infected-value">{this.props.confirmed}</p>
                    }

                    <p className="date infected-date">{dayName},{dayNumber} {month} {year} </p>
                    <p className="description infected-decription">
                        Number of Active cases of COVID-19
          </p>
                </div>
                <div className="subContainer recovered-container">
                    <p className="header recovered-header">Recovered</p>
                    {
                        this.props.externalData ? <p className="value recovered-value">{this.state.recovered}</p> : <p className="value recovered-value">{this.props.recovered}</p>
                    }
                    <p className="date recovered">{dayName},{dayNumber} {month} {year}</p>
                    <p className="description recovered-decription">
                        Number of Recoverd cases of COVID-19
          </p>
                </div>
                <div className="subContainer deaths-container">
                    <p className="header deaths-header">Deaths</p>
                    {
                        this.props.externalData ? <p className="value deaths-value">{this.state.deaths}</p> : <p className="value deaths-value">{this.props.deaths}</p>
                    }
                    <p className="date deaths-date">{dayName},{dayNumber} {month} {year}</p>
                    <p className="description deaths-decription">
                        Number of Death cases of COVID-19
                    </p>
                </div>
            </div>
        );
    }
}
export default Card;
