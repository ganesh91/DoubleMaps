import requests as rq
from collections import defaultdict

class DMRequests():
    def __init__(self,routesURL="https://bloomington.doublemap.com/map/v2/routes"
                    ,stopsURL="https://bloomington.doublemap.com/map/v2/stops"
                    ,bussesURL="https://bloomington.doublemap.com/map/v2/buses",
                    weatherURL="http://api.openweathermap.org/data/2.5/weather?q=Bloomington,in&appid=f485cc4fc090851b32593c34e3468d13"):
        self.routesURL=routesURL
        self.stopsURL=stopsURL
        self.bussesURL=bussesURL
        self.weatherURL=weatherURL

    def getRequestJSON(self,URL):
        requestLst=rq.get(URL).json()
        return(requestLst)

    def getAllRoutes(self):
        return(self.getRequestJSON(self.routesURL))

    def getAllStops(self):
        return(self.getRequestJSON(self.stopsURL))

    def getAllBusses(self):
        return(self.getRequestJSON(self.bussesURL))

    def getWeather(self):
        return(self.getRequestJSON(self.weatherURL))

    def getRoute(self,conditioning,value):
        return([route for route in self.getAllRoutes() if str(route[conditioning])==str(value)])

    def getStop(self,conditioning,value):
        return([stop for stop in self.getAllStops() if str(stop[conditioning])==str(value)])

    def getBus(self,conditioning,value):
        return([bus for bus in self.getAllBusses() if str(bus[conditioning])==str(value)])
