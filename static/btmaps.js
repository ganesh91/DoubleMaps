var routeIdList=[];

function load_routes(){
  // var buildString='<div class="form-check">'+
  //                 '<label class="form-check-label">'+
  //                 '<input class="form-check-input" type="checkbox" value="'+">'
  $.getJSON("/api/routes",function(data){
      for (var i=0;i<data.length;i++){
        alert(data[i].name);
      }
  });
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
    var temp=-273;
    //Sanjana your code here.
    return(temp);
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
