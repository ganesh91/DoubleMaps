var routeIdList=[];
var busIdList=[];
var stopIdList={}
var stop_count_last_minv=0;
var stop_timer=0;

function titleCase(str) {
var splitStr = str.toLowerCase().split(' ');
for (var i = 0; i < splitStr.length; i++) {
   splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
  return splitStr.join(' '); }

function makeRoutePath(){
  var paths=[];
  $.getJSON("/api/routes",function(data){
    for (var routes=0;routes<data.length;routes++){
      if (routeIdList.indexOf(data[routes].id)!=-1){
        for(var i=0;i<data[routes].path.length-1;i=i+2){
          paths.push([data[routes].path[i],data[routes].path[i+1]]);
        };
        var polyLine=L.polyline(paths).addTo(map);
      };
    };
  });
};

function manage_route_id_list(routeId){
  var resultList=[];
  var isPresent=false;
  for (var i=0;i<routeIdList.length;i++){
    if (routeId == routeIdList[i]){
      isPresent=true;
    }else{
      resultList.push(routeIdList[i]);
    }
  };
  if (isPresent){
    routeIdList=resultList;
  }else{
    resultList.push(routeId);
    routeIdList=resultList;
    makeRoutePath();
  }
}

function load_routes(){
  var buildString="";
  $.getJSON("/api/routes",function(data){
      for (var i=0;i<data.length;i++){
        buildString=buildString+'<div class="form-check">'+
                        '<label class="form-check-label">'+
                        '<input class="form-check-input" type="checkbox" value="'+data[i].id+'"'+' onchange=manage_route_id_list('+data[i].id+')>'+
                        data[i].name+
                        '</div></label>';
      };
      document.getElementById("routelist").innerHTML=buildString;

  });
};

function update_stattiles(){
  // Query the JSON /api/routes, /api/busses  and /api/stops and count the number of items and display it
  //for the # of busses tiles and # of route tiles and # of stops
  $.getJSON("/api/busses",function(data){
    var bus_count = 0;
      for (var i=0;i<data.length;i++){
          bus_count++;
      }
    document.getElementById("running").innerHTML=bus_count;
  });
  $.getJSON("/api/routes",function(data){
    var routes_count = 0;
    var stops_count=0;
      for (var i=0;i<data.length;i++){
          routes_count++;
          for(var stops=0;stops<data[i].stops.length;stops++){
            stops_count++;
          }
      }
    document.getElementById("routes").innerHTML=routes_count;
    document.getElementById("stops").innerHTML=stops_count;
  });
};

function count_stops_last_min(){
  $.getJSON('/api/busses',function(data){
    for (var i=0;i<data.length;i++){
      if (data[i].lastStop != stopIdList[data[i].id]){
        stop_timer++;
        stop_count_last_minv++;
        stopIdList[data[i].id]=data[i].lastStop;
      }
    }
  });
};


function animate_progressbar(){
  var currValue=parseInt(document.getElementById("progress").value);
  if (currValue+20 > 100){
    document.getElementById("progress").value=0;
    animate_markers(markers);
  }else{
    document.getElementById("progress").value=currValue+20;
  }
}

function animate_stopcounts(){
  if (stop_timer > 5){
    document.getElementById("stopsserved").innerHTML=stop_count_last_minv;
    stop_timer=0;
    stop_count_last_minv=0;
  }else{
    count_stops_last_min();
  }
}

function load_weather(){
    $.getJSON("/weather",function(data) {
      document.getElementById("temp").innerHTML=Math.round((data.main.temp*(9/5))-459.67,-2);
      document.getElementById("min_temp").innerHTML=Math.round((data.main.temp_min*(9/5))-459.67,-2);
      document.getElementById("max_temp").innerHTML=Math.round((data.main.temp_max*(9/5))-459.67,-2);
      document.getElementById("weatherevent").innerHTML=titleCase(data.weather[0].description);
      document.getElementById("imageid").src='http://openweathermap.org/img/w/'+data.weather[0].icon+'.png';
    });
  }
  function init_map() {
    var map = L.map('mapid');
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 21, attribution: osmAttrib});
    map.addLayer(osm);

    return(map);
  };

  update_stattiles();

  var map=init_map().setView([39.19204, -86.537728], 13);
  document.getElementById("temp").innerHTML=load_weather();
  load_routes();
  var markers = new L.LayerGroup().addTo(map);

  window.setInterval(function(){
    animate_progressbar();
  },1000);

  window.setInterval(function(){
    animate_stopcounts();
  },5000);

  function animate_markers(layer){
    layer.clearLayers();
    for(var i=0; i<routeIdList.length;i++){
      $.getJSON('/api/bus/route/'+routeIdList[i],function(data){
        for (var bus=0;bus<data.length;bus++){
          var marker = L.marker([data[bus].lat, data[bus].lon]);
          layer.addLayer(marker);
        };
      });
    }
  };
