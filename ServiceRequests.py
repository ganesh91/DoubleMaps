from RequestsManager import DMRequests
from flask import Flask
from flask import render_template
from flask import request
from flask import redirect,url_for
import json

app= Flask("BTMapDviz")
btmap = DMRequests()

@app.route("/")
def index():
    return render_template("doublemaps.html")

@app.route("/api/busses")
def getBusses():
    return(json.dumps(btmap.getAllBusses()))

@app.route("/api/routes")
def getRoutes():
    return(json.dumps(btmap.getAllRoutes()))

@app.route("/api/stops")
def getStops():
    return(json.dumps(btmap.getAllStops()))

@app.route("/api/bus/<conditioning>/<value>")
def getBus(conditioning,value):
    return(json.dumps(btmap.getBus(conditioning,value)))

@app.route("/api/stop/<conditioning>/<value>")
def getStop(conditioning,value):
    return(json.dumps(btmap.getStop(conditioning,value)))

@app.route("/api/route/<conditioning>/<value>")
def getRoute(conditioning,value):
    return(json.dumps(btmap.getRoute(conditioning,value)))

app.debug=True
app.run()
