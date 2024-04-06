'''
All of the information about the map is taken from https://albiononline2d.com/en/map
=====================================================================================================================
For the purpose of computing the time needed for crafting items
we compute a mean distance based on the time tests and used mounts
10 running tests were made,in minute-second-milisecond format:
0.57.41
1.19.10
1.14.9
0.56.42
1.23.87
1.6.35
1.4.35
1.27.48
1.5.8
1.16.37
OBS:if the milisecond value is greater than 30,then we round it up to a second
mean_time=71.4s
=====================================================================================================================
The computed mean_time was obtained using a mount with 5s delay and +85% speed,+130% gallop-speed bonuses
mean_distance=913.2 units
=====================================================================================================================
The "cities.json" file is structred as follows:
{
    City:{
    NeighbouringCities:travel_cost,
    RefiningBonus:bonus,
    CraftingBonuses:bonuses
    }
} 
'''
DEFAULT_SPEED=5.5
MEAN_DISTANCE=913.2
class Mount:
    def __init__(self,delay,move_bonus,gallop_bonus):
        self.mount_delay=delay
        self.move_bonus=move_bonus  
        self.gallop_bonus=gallop_bonus
    def travel_time(self):
        #the estimated value shall be only an estimation
        #speed0*delay+speed1*(time_final-delay)=distance
        speed0=DEFAULT_SPEED+DEFAULT_SPEED*self.move_bonus
        speed1=DEFAULT_SPEED+DEFAULT_SPEED*self.gallop_bonus
        time_final=(MEAN_DISTANCE-self.mount_delay*speed0)/speed1 + self.mount_delay
        return time_final/60#converting in minutes
    def city_travel_time(self,map,start_city,destination_city):
        tile_time=self.travel_time()
        if destination_city in map[start_city]["NeighbouringCities"]:
            return tile_time*map[start_city]["NeighbouringCities"][destination_city]
        else:
            min_distance=1000
            neighbouring_cities=map[start_city]["NeighbouringCities"]
            for index in neighbouring_cities:
                temp=map[start_city]["NeighbouringCities"][index]
                if destination_city in map[index]["NeighbouringCities"] and min_distance>map[index]["NeighbouringCities"][destination_city]+temp:
                   min_distance=map[index]["NeighbouringCities"][destination_city]
                   distance_from_start=map[start_city]["NeighbouringCities"][index]
            min_distance=min_distance+distance_from_start
            return tile_time*min_distance