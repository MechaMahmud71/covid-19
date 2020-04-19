import React, { Component } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import "./chart.css";

class ChartData extends Component {
    constructor() {
        super();
        this.state = {
            country: "Global",
            actualData: [],
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: []
                },



            },



            series: [
                {
                    name: "series-1",
                    data: []
                }
            ]
        };
    }

    componentDidMount = () => {
        async function fetchData() {
            try {
                const result = await axios.get(`https://covid19.mathdro.id/api/daily`);
                const data = await result.data;

                //console.log(data);
                return data;
            } catch (error) {
                console.log(error);
            }
        }
        let dailyData;

        fetchData().then(data => {
            dailyData = data;
            const newData = dailyData.map(el => el.totalConfirmed);
            const newLables = dailyData.map(el => el.reportDate);
            const newArry = [];

            newArry.push({ data: newData, name: "Infected" });
            this.setState({
                options: {
                    ...this.state.options,
                    xaxis: {
                        categories: newLables
                    }
                },
                type: "line",

                series: newArry,
                actualData: newData
            });
        })
    }


    render() {
        console.log(this.props.options);
        console.log(this.props.state);
        return (
            <div className="chart-container">
                {
                    this.props.externalData ? (
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="area"
                            width="950"
                        />
                    ) : (
                            <Chart
                                options={this.props.options}
                                series={this.props.series}
                                type="bar"
                                width="900"
                            />
                        )
                }




            </div>
        )
    }
}

export default ChartData;
