var routeIdList=[];

console.log(routeIdList);

function titleCase(str) {
var splitStr = str.toLowerCase().split(' ');
for (var i = 0; i < splitStr.length; i++) {
   splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
  return splitStr.join(' '); }

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
  var bus_count = 0;
//   $.getJSON("/api/busses",function(data){
//       for (var i=0;i<data.length;i++){
//         if ($.inArray(data[i].id,routeIdList) != -1){
//           count++;
//           console.log("Success");
//         }
//       }
//   })
//   return (bus_count)
// };
};

function count_stops_last_min(){
  //function for counting stops served in last minute
};


function animate_progressbar(){
  var currValue=parseInt(document.getElementById("progress").value);
  if (currValue+20 > 100){
    document.getElementById("progress").value=0;
  }else{
    document.getElementById("progress").value=currValue+20;
  }
}

window.setInterval(function(){
  animate_progressbar();
},1000);

function load_weather(){
    $.getJSON("/weather",function(data) {
      document.getElementById("temp").innerHTML=data.main.temp;
      document.getElementById("min_temp").innerHTML=data.main.temp_min;
      document.getElementById("max_temp").innerHTML=data.main.temp_max;
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

  init_map().setView([51.505, -0.09], 13);
  document.getElementById("temp").innerHTML=load_weather();
  load_routes();
