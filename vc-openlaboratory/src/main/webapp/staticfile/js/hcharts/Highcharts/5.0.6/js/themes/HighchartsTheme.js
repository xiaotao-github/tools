Highcharts.theme = {
  colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', 
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
      plotBorderWidth: 1
  },
  credits: {
    text: '风标教育',
    href: 'http://www.fengbiaoedu.com'
  },
  xAxis: {
    crosshair: true,
    gridLineWidth: 1,
    gridLineColor: '#4a4a4a',
  },
  yAxis: {
    crosshair: true,
    gridLineWidth: 1,
    gridLineColor: '#4a4a4a',
  },
  title: {
      style: {
          color: '#ccc',
          font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
      }
  },
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