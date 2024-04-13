'''
The travel cost is computed based on a computed mean time per tiles and the number of traversed tiles
The number of traversed tiles was computed by taking into consideration the different danger levels
Minimum danger was prioritised,not the shortest path
'''
import json
import mount
file_input=open("../../../json/cities.json")
map_graph=json.load(file_input)
test_mount=mount.Mount(5,0.85,1.3)
print(test_mount.city_travel_time(map_graph,"Caerlon","Lymhurst"))