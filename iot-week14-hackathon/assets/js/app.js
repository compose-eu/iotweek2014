var rooms = {};
var tabTypes = ['aq', 'temp', 'press'];

//creates and initializes the heatmap
var heatmap, heatmapHistorical;

var historicalCounter = 0;
var historicalData = [
  { time: '12 midnight', ludgate: 16, america: 17, warwick: 16, salisbury: 15 },
  { time: '2 am', ludgate: 15, america: 17, warwick: 17, salisbury: 15 },
  { time: '4 am', ludgate: 16, america: 16, warwick: 17, salisbury: 15 },
  { time: '6 am', ludgate: 17, america: 17, warwick: 18, salisbury: 16 },
  { time: '8 am', ludgate: 18, america: 21, warwick: 18, salisbury: 16 },
  { time: '10 am', ludgate: 22, america: 26, warwick: 20, salisbury: 20 },
  { time: '12 noon', ludgate: 24, america: 26, warwick: 23, salisbury: 20 },
  { time: '2 pm', ludgate: 24, america: 28, warwick: 24, salisbury: 20 },
  { time: '4 pm', ludgate: 24, america: 30, warwick: 24, salisbury: 22 },
  { time: '6 pm', ludgate: 23, america: 28, warwick: 21, salisbury: 21 },
  { time: '8 pm', ludgate: 21, america: 20, warwick: 18, salisbury: 18 },
  { time: '10 pm', ludgate: 17, america: 18, warwick: 16, salisbury: 15 }
];


$(document).ready(function() {
  init();

  // Initialise first tab (temperature) on page load
  setupHeatmap();
  fillGraphs('temp');

  // Act on change of tab
  $('.map-tabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var tabType = $(e.target).attr('href').replace('#', '');
    if(tabType == 'hist') {
      setupHistoricalHeatmap();
    }
  });

  // Act on change of graph tab
  $('.graph-tabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var tabType = $(e.target).attr('href').replace('#', '');
    fillGraphs(tabType);
  });
});

function setHeader(xhr) {
  xhr.setRequestHeader('authorization', 'NDJkODA3MGEtOWU1ZS00YTczLThiNmEtZDk0Y2IwMWFmYWM2NDFjNmZjMjMtMmU3NS00ZDM3LWIwMWItMDFmZjJjM2Q4Y2My');
}

function init() {
    rooms.list = ['ludgate', 'america', 'warwick', 'salisbury'];

    rooms.ludgate = {};
    rooms.ludgate.data = {};
    rooms.ludgate.x = 74;
    rooms.ludgate.y = 21;
    rooms.ludgate.width = 320;
    rooms.ludgate.length = 60;
    rooms.ludgate.name = 'ludgate';
    rooms.ludgate.apiCode = '140310375942706d56d0216a94e53be95b679d6b3db7e';
    rooms.ludgate.temp = $('.ludgate.temp');
    rooms.ludgate.co2 = $('.ludgate.co2');
    rooms.ludgate.aq = $('.ludgate.aq');

    rooms.america = {};
    rooms.america.data = {};
    rooms.america.x = 393;
    rooms.america.y = 21;
    rooms.america.width = 310;
    rooms.america.length = 60;
    rooms.america.name = 'america';
    rooms.america.apiCode = '140310325466366d226ff41f64f369322c36af1290a71';
    rooms.america.temp = $('.america.temp');
    rooms.america.co2 = $('.america.co2');
    rooms.america.aq = $('.america.aq');

    rooms.warwick = {};
    rooms.warwick.data = {};
    rooms.warwick.x = 74;
    rooms.warwick.y = 83;
    rooms.warwick.width = 320;
    rooms.warwick.length = 223;
    rooms.warwick.name = 'warwick';
    rooms.warwick.apiCode = '14031688985961792f8c2deff4f7cb0a53e5c7724bb7d';
    rooms.warwick.temp = $('.warwick.temp');
    rooms.warwick.co2 = $('.warwick.co2');
    rooms.warwick.aq = $('.warwick.aq');

    rooms.salisbury = {};
    rooms.salisbury.data = {};
    rooms.salisbury.x = 394;
    rooms.salisbury.y = 83;
    rooms.salisbury.width = 310;
    rooms.salisbury.length = 223;
    rooms.salisbury.name = 'salisbury';
    rooms.salisbury.apiCode = '1403106555662a47afeaac19941b68a0a807ea9764cce';
    rooms.salisbury.temp = $('.salisbury.temp');
    rooms.salisbury.co2 = $('.salisbury.co2');
    rooms.salisbury.aq = $('.salisbury.aq');

    var heatmapConfig = {
      element: $("#heatmapArea")[0],
      radius: 30,
      opacity: 50
    };
    heatmap = h337.create(heatmapConfig);
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
        var iInc = data.length < 30 ? 1 : data.length / (data.length / 10);
        //for(var i = 0; i < data.length - iInc - 1; i+= iInc) {
        for(var i = 0; i < data.length; i++) {
          if(data[i].channels && data[i].channels[tabTypeInCompose]) {
            var date = moment(data[i].lastUpdate, 'X');
            if(!date.isBefore(moment().subtract('hours', 12))) {
              var dateTime = date.format("YYYY-MM-DD HH:mm:ss");
              dataPoints.push({ timestamp: dateTime, value: data[i].channels[tabTypeInCompose]['current-value'] });
            }
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

function getHeatmapData(room) {
  $.ajax({
    url: 'http://api.servioticy.com/' + room.apiCode + '/streams/room-condition',
    type: 'GET',
    dataType: 'json',
    success: function(returned) {
      if(returned && returned.data) {
        var data = returned.data;
        var heatmapData = [];

        var lastIndex = data.length - 1;
        var currentReading = data[lastIndex];
        for(var j = 0; j < tabTypes.length; j++)
        {
          var tabTypeInCompose = getTabTypeInCompose(tabTypes[j]);
          if(currentReading.channels && currentReading.channels[tabTypeInCompose]) {
            var value = currentReading.channels[tabTypeInCompose]['current-value'];
            room.data[tabTypes[j]] = value;
          }
        }

        var totalScore = (0.00002 * room.data.press) + (0.6 * room.data.temp) + (1.2 * room.data.aq);
        room.totalScore = totalScore;

        var count = 0;
        for(var x = room.x + 30; x < room.x + room.width - 5; x += 40) {
          for(var y = room.y + 30; y < room.y + room.length - 10; y += 20) {
            heatmap.store.addDataPoint(x, y, totalScore);
            count++;
          }
        }
        return heatmapData;
      }
      else {
        console.log('No data returned.');
      }
    },
    error: function() { console.log('error!'); },
    beforeSend: setHeader
  });
}

function setupHeatmap() {
  for(var i = 0; i < rooms.list.length; i++) {
    var room = rooms[rooms.list[i]];
    room.heatmapData = getHeatmapData(room);
  }
}

function setupHistoricalHeatmap() {
  var heatmapConfigHist = {
    element: $("#heatmapAreaHist")[0],
    radius: 30,
    opacity: 50
  };

  heatmapHistorical = h337.create(heatmapConfigHist);
  populateHistoricalData();
  window.setInterval(function() { populateHistoricalData() }, 1500);
}

function populateHistoricalData() {
  var historicalHeatmapData = { max: 27, data: [] };

  console.log(historicalCounter);
  if(historicalCounter > historicalData.length - 1) {
    console.log('resetting');
    historicalCounter = 0;
  }

  for(var i = 0; i < rooms.list.length; i++) {
    var room = rooms[rooms.list[i]];
    for(var x = room.x + 30; x < room.x + room.width - 5; x += 40) {
      for(var y = room.y + 30; y < room.y + room.length - 10; y += 20) {
        historicalHeatmapData.data.push({ x: x, y: y, count: historicalData[historicalCounter][room.name] });
      }
    }
  }

  $('.time').html(historicalData[historicalCounter].time);
  var progressBar = $('.progress-bar');
  progressBar.attr('aria-valuenow', historicalCounter * 10).css('width', historicalCounter * (100/11) + '%');

  if(historicalCounter < 9 && historicalCounter > 3) {
    progressBar.attr('class', 'progress-bar progress-bar-danger');
  }
  if(historicalCounter < 6 || (historicalCounter > 8 && historicalCounter < 10)) {
    progressBar.attr('class', 'progress-bar progress-bar-warning');
  }
  if(historicalCounter < 4 || historicalCounter == 11) {
    progressBar.attr('class', 'progress-bar progress-bar-info');
  }
  heatmapHistorical.store.setDataSet(historicalHeatmapData);

  historicalCounter++;
}
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

  //heatmap.store.setDataSet(data);
