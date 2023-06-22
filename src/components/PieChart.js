import Chart from 'chart.js/auto';
import { fetchData } from '../utils/data';

function getRandom() {
    return Math.floor(Math.random()*256);
}

function createPieData(dataJson) {
    const pieData = {};
    dataJson.forEach(dataPoint => {
        if(pieData.hasOwnProperty(dataPoint.Occupation)){
            pieData[dataPoint.Occupation].count++;
        }
        else {
            pieData[dataPoint.Occupation] = {
                label: dataPoint.Occupation,
                count: 1,
                backgroundColor: `rgb(${getRandom()}, ${getRandom()}, ${getRandom()})`
            }
        }
    });
    return Object.values(pieData);
}

async function pieChartFunction() {
    const rawData = await fetchData();

    const pieData = createPieData(rawData);

    const config = {
        type: 'doughnut',
        data:  {
            labels: pieData.map(dataPoint => dataPoint.label),
            datasets: [{
              label: 'Population by Occupation',
              data: pieData.map(dataPoint => dataPoint.count),
              backgroundColor: pieData.map(dataPoint => dataPoint.backgroundColor),
              hoverOffset: 4
            }]
        },
    };

    return new Chart(
        document.getElementById('pieChart'),
        config
    );
}

function PieChart() {
    return (
        <div>
            <button onClick={ pieChartFunction } className="button">Pie Chart</button>
            <canvas id="pieChart"> </canvas>
        </div>
    );
}

export default PieChart;