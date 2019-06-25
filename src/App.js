import React, { useEffect } from 'react';
import ReactHighCharts from 'react-highcharts';

import './App.css';

const config = {
  chart: {
    type: 'spline'
  },
  title: {
    text: '',

  },
  xAxis: {
    type: 'datetime'
  },
  yAxis: {
    title: {
      text: 'Price (USD)'
    }
  },
  legend: {
    enabled: false
  },
  exporting: {
    enabled: false
  },
  series: [{
    name: 'Live Ethereum Price [USD]',
    data: []
  }]
};

function App() {
  let ref = React.createRef();

  useEffect(() => {
    setInterval(() => {
      fetch('https://api.cryptonator.com/api/ticker/eth-usd')
        .then((res) => res.json())
        .then((data) => {
          let chart = ref.current.getChart();
          chart.series[0].addPoint({ x: data.timestamp * 1000, y: Number(data.ticker.price) })
        })
        .catch(err => console.error(`ERROR: FAILED TO GET TICKER PRICE ${err}`))
    }, 3000)
  }, [ref]);

  return (
    <div className="App">
      <ReactHighCharts  config={config} ref={ref}/>
    </div>
  );
}



export default App;
