def exists(item,container):
    if any(i in item for i in container):return True
    return False

input = open("input.txt","r")
out_id = open("output/text/items_id.txt","w")
out_ign = open("output/text/items_ign.txt","w")

blacklisted_items = ["ROCK", "STONEBLOCK"] 
must_have=["T2_","T3_","T4_","T5_","T6_","T7_","T8_"]
data = []
line_list = []
item_names = []

for i in input:
    data.append(i.strip("\n"))

for i in data:
    line_list.append(i.split(":"))
    
for i in range(0,len(line_list)):
    if not exists(line_list[i][1],blacklisted_items) and exists(line_list[i][1],must_have):
        line_list[i][1] = str(line_list[i][1]).strip()
        line_list[i][2] = str(line_list[i][2]).strip()
        out_id.write(line_list[i][1]+"\n")
        out_ign.write(line_list[i][2]+"\n")

input.close()
out_id.close()
out_ign.close()