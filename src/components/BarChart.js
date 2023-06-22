import Chart from 'chart.js/auto';
import { fetchData } from '../utils/data';

function createHistogramData(dataObject) {
    const histogramData = [
        {
            label: "0-5 years",
            minVal: 0,
            maxVal: 5,
            count: 0
        },
        {
            label: "6-12 years",
            minVal: 6,
            maxVal: 12,
            count: 0
        },
        {
            label: "13-21 years",
            minVal: 13,
            maxVal: 21,
            count: 0
        },
        {
            label: "22-29 years",
            minVal: 22,
            maxVal: 29,
            count: 0
        },
        {
            label: "30-50 years",
            minVal: 30,
            maxVal: 50,
            count: 0
        },
        {
            label: "greater than 50",
            minVal: 51,
            maxVal: Infinity,
            count: 0
        }
    ];
    dataObject.forEach(dataPoint => {
        histogramData.forEach((element, index, array) => {
            if(element.minVal <= dataPoint.Age && element.maxVal >= dataPoint.Age) {
                array[index].count = element.count+1;
            }
        })
    });

    return histogramData;
}

const barChartFunction = async function() {
    const rawData = await fetchData();

    const data = createHistogramData(rawData);

    const config = {
        type: 'bar',
        data: {
            labels: data.map(row => row.label),
            datasets: [
              {
                label: 'Distribution of Population by Age',
                data: data.map(row => row.count)
              }
            ]
        },
    };

    return new Chart(
        document.getElementById('barChart'),
        config
    );
};

function BarChart() {
    return (
        <div>
            <button onClick={ barChartFunction } className="button">Bar Chart</button>
            <canvas id="barChart"> </canvas>
        </div>
    );
}

export default BarChart;