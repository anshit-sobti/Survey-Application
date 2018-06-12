import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import {Doughnut} from 'react-chartjs-2';

/*
expected data while creting this component
var data={
    labels: [],
    datasets:[],
    labelName:"Revenue",
    header_text:"Top 10 hotel revenue"
}*/

class PieChart extends Component{
    constructor(){
        super();
        this.state={
            data1:{
                labels: [
                    'United Airlines',
                    'Delts',
                    'Hilton Hotels'
                ],
                datasets: [{
                    data: [400, 500, 100],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            },
            data2:{
                labels: [
                    'United Airlines',
                    'Delts',
                    'Hilton Hotels'
                ],
                datasets: [{
                    data: [100, 200, 500],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            },
            data3:{
                labels: [
                    'United Airlines',
                    'Delts',
                    'Hilton Hotels'
                ],
                datasets: [{
                    data: [4, 3, 4],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }]
            }


        };

        this.chartColor = [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(57,100,230,0.6)',
            'rgba(57,100,100,0.6)',
            'rgba(100,47,56,0.6)',
        ];
    }

    createPieChartData(data){
        console.log("data :",data);
        var data = {
            labels: data.labels,
            datasets:[
                {
                    label:data.labelName,
                    data:data.datasets,
                    backgroundColor:this.chartColor
                }
            ]
        }
        return data;
    }



    render(){
        return (
            <div className="chart" style={{display:"block-inline", padding:"2%"}}>
                <div style={{float:"left"}}>
                    <Doughnut data={this.createPieChartData(this.props.data)}
                              width="350px"
                              height="350px"
                              options={{
                                  maintainAspectRatio: false
                              }}/>
                </div>
            </div>



            // <div className="chart">
            //     <Pie
            //         data={this.createPieChartData(this.props.data)}
            //         options={{
            //             title:{
            //                 display:true,
            //                 text:this.props.data.header_text,
            //                 fontSize:25
            //             },
            //             legend:{
            //                 display:true,
            //                 position:"right"
            //             }
            //         }}
            //     />
            // </div>
        )
    }
}

export default PieChart;