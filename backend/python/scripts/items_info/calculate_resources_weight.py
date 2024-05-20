#All artefacts are 2.0 kg so i mannually written them
tier       = open("output/text/items_tier.txt","r")
level      = open("output/text/items_level.txt","r")
res_weight = open("output/text/resource_weight.txt","w")

#           T2  T3  T4  T5  T6  T7  T8
resource =[0.2,0.3,0.5,0.8,1.1,1.7,2.6]

for i,j in zip(tier,level):
    i=int(i)-2
    out = resource[i]
    res_weight.write(str(out)+"\n")
    