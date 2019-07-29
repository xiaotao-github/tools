Highcharts.theme = {
  colors: ['#FFF500', '#0093DD', '#DD137B', '#00923F', '#24CBE5', '#64E572', 
           '#FF9655', '#FFF263', '#6AF9C4'],
  chart: {
      backgroundColor: {
          linearGradient: [0, 0, 500, 500],
          stops: [
              [0, 'rgb(37, 37, 37)'],
              [1, 'rgb(39, 39, 39)']
          ]
      },
      plotBorderColor: '#ccc',
      plotBorderWidth: 1,
      spacingTop: 0,
      spacingBottom: 0,
      spacingRight: 0,
      spacingLeft: 0,
      showAxes: false
  },
  credits: {
    text: '风标教育',
    href: 'http://www.fengbiaoedu.com'
  },
  xAxis: {
    lineWidth :0,//去掉x轴线
    tickWidth:0,//去掉刻度
    labels: {
      enabled: false
    },//去掉刻度数字
    crosshair: true,
    gridLineWidth: 0,
    //gridLineColor: '#4a4a4a',
    //tickPixelInterval: 20
  },
  yAxis: {
    lineWidth :0,//去掉x轴线
    tickWidth:0,//去掉刻度
    labels: {
      enabled: false
    },//去掉刻度数字
    crosshair: true,
    gridLineWidth: 0,
    plotLines: [{ // summer months - treat from/to as numbers
      color: '#fff',
      width: 1,
      value: 0
    }]
    //gridLineColor: '#4a4a4a',
    //tickPixelInterval: 20
  },
  title: null,
  subtitle: {
      style: {
          color: '#ccc',
          font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
      }
  },
  legend: {
      itemStyle: {
          font: '9pt Trebuchet MS, Verdana, sans-serif',
          color: '#ccc'
      },
      itemHoverStyle:{
          color: 'gray'
      }   
  },
};

// 使主题配置生效
Highcharts.setOptions(Highcharts.theme);