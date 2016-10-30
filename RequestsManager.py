import requests as rq

class DMRequests():
    def __init__(self,routesURL="https://bloomington.doublemap.com/map/v2/routes"
                    ,stopsURL="https://bloomington.doublemap.com/map/v2/stops"
                    ,bussesURL="https://bloomington.doublemap.com/map/v2/buses"):
        self.routesURL=routesURL
        self.stopsURL=stopsURL
        self.bussesURL=bussesURL

    def getRequestJSON(self,URL):
        requestLst=rq.get(URL).json()
        return(requestLst)

    def getAllRoutes(self):
        return(self.getRequestJSON(self.routesURL))

    def getAllStops(self):
        return(self.getRequestJSON(self.stopsURL))

    def getAllBusses(self):
        return(self.getRequestJSON(self.bussesURL))

    def getRoute(self,conditioning,value):
        return([route for route in self.getAllRoutes() if str(route[conditioning])==str(value)])

    def getStop(self,conditioning,value):
        return([stop for stop in self.getAllStops() if str(stop[conditioning])==str(value)])

    def getBus(self,conditioning,value):
        return([bus for bus in self.getAllBusses() if str(bus[conditioning])==str(value)])
