import { Line } from 'react-chartjs-2';
import React from 'react'
import 'chartjs-adapter-date-fns'
import { Chart } from 'chart.js';
import Zoom from 'chartjs-plugin-zoom';

Chart.register(Zoom)
const options = {
    scales: {
        x: {
            type: 'time',
            
            time: {
                unit: 'month'
            },
            grid: {
                display: false
            }

        },
        // grid: {
        //     drawTicks: false
        // }
    },
    plugins: {
        zoom: {
            zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true
                },
                mode: 'xy',
            },
            pan: {
                enabled: true,
                mode: 'xy'
            },
            limits: {
                x: {min: 1262353464000, max: Date.now(), minRange: 50},
                y: {min: 0, max: 5000, minRange: 50}
            },
        }
    }
};

const RatingGraph = ({datasets, progress}) => {
    if (datasets.length===0) {
        if (progress.total===0) return (<></>)
        return (<div className='rating'>
            <h2>Fetching rating changes {progress.done}/{progress.total}</h2>
        </div>)
    }
    const data = {
        datasets: datasets,
    };
    return (
    <div className='rating'>
        <div className='header'>
            <h1 className='title'>Rating Changes</h1>
        </div>
        <Line data={data}  options={options} plugins={[Zoom]} width={900} height={400} />
    </ div>
)};

export default RatingGraph