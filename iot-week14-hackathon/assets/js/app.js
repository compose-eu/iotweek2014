var rooms = {};

$(document).ready(function() {
  init();

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

function init() {
    rooms.list = ['ludgate', 'america', 'salisbury']; //'warwick',

    rooms.ludgate = {};
    rooms.ludgate.name = 'ludgate';
    rooms.ludgate.apiCode = '140310375942706d56d0216a94e53be95b679d6b3db7e';
    rooms.ludgate.temp = $('.ludgate.temp');
    rooms.ludgate.co2 = $('.ludgate.co2');
    rooms.ludgate.aq = $('.ludgate.aq');

    rooms.america = {};
    rooms.america.name = 'america';
    rooms.america.apiCode = '140310325466366d226ff41f64f369322c36af1290a71';
    rooms.america.temp = $('.america.temp');
    rooms.america.co2 = $('.america.co2');
    rooms.america.aq = $('.america.aq');

    rooms.warwick = {};
    rooms.warwick.name = 'warwick';
    rooms.warwick.temp = $('.warwick.temp');
    rooms.warwick.co2 = $('.warwick.co2');
    rooms.warwick.aq = $('.warwick.aq');

    rooms.salisbury = {};
    rooms.salisbury.name = 'salisbury';
    rooms.salisbury.apiCode = '1403106555662a47afeaac19941b68a0a807ea9764cce';
    rooms.salisbury.temp = $('.salisbury.temp');
    rooms.salisbury.co2 = $('.salisbury.co2');
    rooms.salisbury.aq = $('.salisbury.aq');
}

function fillGraphs(tabType) {
  for(var roomIte = 0; roomIte < rooms.list.length; roomIte++) {
    fillGraphForRoom(rooms[rooms.list[roomIte]], tabType);
  }
}

function getTabTypeInCompose(tabType) {
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

  return tabTypeInCompose;
}

function fillGraphForRoom(room, tabType) {
  var tabTypeInCompose = getTabTypeInCompose(tabType);

  $.ajax({
    url: 'http://api.servioticy.com/' + room.apiCode + '/streams/room-condition',
    type: 'GET',
    dataType: 'json',
    success: function(returned) {
      if(returned && returned.data) {
        var data = returned.data;

        var dataPoints = [];
        //var iInc = data.length < 30 ? 1 : data.length / (data.length / 10);
        //for(var i = 0; i < data.length - iInc - 1; i+= iInc) {
        for(var i = 0; i < data.length; i++) {
          if(data[i].channels && data[i].channels[tabTypeInCompose]) {
            var date = moment(data[i].lastUpdate, 'X');

            var dateTime = date.format("YYYY-MM-DD HH:mm:ss");

            dataPoints.push({ timestamp: dateTime, value: data[i].channels[tabTypeInCompose]['current-value'] });
          }
        }

        Morris.Line({
          element: room.name + '-' + tabType,
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
          xLabelFormat: function(d) {
            return d.getDate() + '/' + (d.getMonth() + 1) + ' - ' + d.getHours() + ':' + d.getMinutes();
          },
          dateFormat: function(d) {
            d = new Date(d);
            return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov', 'Dec'][d.getMonth()] + ' ' + d.getDate() + ' - ' + d.getHours() + ':' + d.getMinutes();
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
