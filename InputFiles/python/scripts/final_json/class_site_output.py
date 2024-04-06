import json

class SiteOutput:    
    def __init__(self,ign, recepie, time, profit,
                 roi,carring_capacity,quality, 
                 revision,city_sell, city_craft):
        self.ign = ign
        self.time = time
        self.profit = profit
        self.roi = roi
        self.carring_capacity = carring_capacity
        self.quality = quality
        self.revision = revision
        self.city_sell = city_sell
        self.city_craft = city_craft
        self.recepie = recepie
   
