import React from 'react';
import ReactApexChart from 'react-apexcharts';

const CommonChart = ({values,label}) => {
    const series = [
        {
            name: 'Mood Score',
            data: values
        }
    ];

    const options = {
        chart: {
            type: 'area',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            // type: 'datetime',
            categories: label
        },
    };

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="area" />
        </div>
    );
};

export default CommonChart;
