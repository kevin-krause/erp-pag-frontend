/* eslint-disable react/prop-types */
import ReactApexChart from 'react-apexcharts';

const Chart = ({ chartData, chartOptions }) => {
    return (
        <div id="chart">
            <ReactApexChart options={chartOptions} series={[{ data: chartData }]} type="area" height={420} />
        </div>
    );
};

export default Chart;