$(document).ready(function() {
  initGraphs();

  // Initialise first tab (temperature) on page load
  setupHeatmap($('#heatmapArea')[0]);
  fillGraphs('temp');

  // Act on change of tab
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var tabType = $(e.target).attr('href').replace('#', '');

    var heatmap = $('.heatmap.' + tabType);
    if(heatmap) {
      setupHeatmap(heatmap[0]);
    }

    fillGraphs(tabType);
  });
});

function setHeader(xhr) {
  xhr.setRequestHeader('authorization', 'NDJkODA3MGEtOWU1ZS00YTczLThiNmEtZDk0Y2IwMWFmYWM2NDFjNmZjMjMtMmU3NS00ZDM3LWIwMWItMDFmZjJjM2Q4Y2My');
}

function initGraphs() {
    var graphs = {};

    graphs.ludgate = {};
    graphs.ludgate.temp = $('.ludgate.temp');
    graphs.ludgate.co2 = $('.ludgate.co2');
    graphs.ludgate.aq = $('.ludgate.aq');

    graphs.america = {};
    graphs.america.temp = $('.america.temp');
    graphs.america.co2 = $('.america.co2');
    graphs.america.aq = $('.america.aq');

    graphs.warwick = {};
    graphs.warwick.temp = $('.warwick.temp');
    graphs.warwick.co2 = $('.warwick.co2');
    graphs.warwick.aq = $('.warwick.aq');

    graphs.salisbury = {};
    graphs.salisbury.temp = $('.salisbury.temp');
    graphs.salisbury.co2 = $('.salisbury.co2');
    graphs.salisbury.aq = $('.salisbury.aq');
}

function fillGraphs(tabType) {
  var tabTypeInCompose = tabType;
  if(tabType === 'aq') {
    tabTypeInCompose = 'air-quality';
  }
  if(tabType === 'temp') {
    tabTypeInCompose = 'temperature';
  }
  if(tabType === 'press') {
    tabTypeInCompose = 'pressure';
  }

  $.ajax({
    url: 'http://api.servioticy.com/140310375942706d56d0216a94e53be95b679d6b3db7e/streams/room-condition',
    type: 'GET',
    dataType: 'json',
    success: function(returned) {
      if(returned && returned.data) {
        var data = returned.data;
        var dataPoints = [];
        for(var i = 0; i < data.length; i+= 5) {
          if(data[i].channels && data[i].channels[tabTypeInCompose]) {
            dataPoints.push({ timestamp: data[i].lastUpdate, value: data[i].channels[tabTypeInCompose]['current-value'] });
          }
        }

        console.log(dataPoints);
        Morris.Line({
          element: 'america-' + tabType,
          data: dataPoints,
          xkey: 'timestamp',
          ykeys: ['value'],
          labels: [tabTypeInCompose],
          lineColors: ['#fff'],
          lineWidth: 2,
          pointSize: 4,
          gridLineColor: 'rgba(255,255,255,.5)',
          resize: true,
          gridTextColor: '#fff',
          xLabels: "15min",
          xLabelFormat: function(d) {
            return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov', 'Dec'][d.getMonth()] + ' ' + d.getDate() + ' - ' + d.getHours() + ':' + d.getMinutes();
          },
          dateFormat: function(d) {
            d = new Date(d);
            console.log(d.getTime());
            return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov', 'Dec'][d.getMonth()] + ' ' + d.getDate() + ' - ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
          }
        });
      }
      else {
        console.log('No data returned.');
      }
    },
    error: function() { console.log('error!'); },
    beforeSend: setHeader
  });

  // $.getJSON('/devices/' + $('#deviceIdBox').val() + '/data', function(results) {
  //   console.log(results);
  //   Morris.Line({
  //     element: 'hero-graph',
  //     data: results,
  //     xkey: 'timestamp',
  //     ykeys: ['v'],
  //     labels: ['Temperature'],
  //     lineColors: ['#fff'],
  //     lineWidth: 2,
  //     pointSize: 4,
  //     gridLineColor: 'rgba(255,255,255,.5)',
  //     resize: true,
  //     gridTextColor: '#fff',
  //     xLabels: "15min",
  //     xLabelFormat: function(d) {
  //       return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov', 'Dec'][d.getMonth()] + ' ' + d.getDate() + ' - ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  //     },
  //     // dateFormat: function(d) {
  //     //   d = new Date(d);
  //     //   return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov', 'Dec'][d.getMonth()] + ' ' + d.getDate();
  //     // }
  //   });
  // });
}

function setupHeatmap(element) {
  // heatmap configuration
  var config = {
      element: element ? element : $("#heatmapArea")[0],
      radius: 30,
      opacity: 50
  };

  //creates and initializes the heatmap
  var heatmap = h337.create(config);

  // let's get some data
  // var data = {
  //     max: 20,
  //     data: [
  //         { x: 10, y: 20, count: 18 },
  //         { x: 25, y: 25, count: 14 },
  //         { x: 50, y: 30, count: 20 }
  //         // ...
  //     ]
  // };

  var generateData = function(){
      var max = (Math.random()*100+1) >> 0,
          data = [],
          length = 200,
          width = heatmap.get("width"),
          height = heatmap.get("height");

      while(length--){
          data.push({
              x: (Math.random()*width) >> 0,
              y: (Math.random()*height) >> 0,
              count: (Math.random()*max) >> 0
          });
      }

      return {
          max: max,
          data: data
      };
  };

  var data = generateData();

  heatmap.store.setDataSet(data);
}
