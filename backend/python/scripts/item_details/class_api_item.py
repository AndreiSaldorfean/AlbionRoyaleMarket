import class_item
import json
class ApiItem(class_item.Item):
    def __init__(self,obj,id, crafting_tax, revision_buy, revision_sell,
                 quality,price_sell, price_buy, city_sell, city_buy, city_craft):
        
        super().__init__(obj.ign, obj.item_value,obj.weight, 
                         obj.recipe, obj.recipe_amounts,
                         obj.category,obj.crafting_station)
        self.id = id
        self.quality = quality
        self.crafting_tax = crafting_tax
        self.revision_buy = revision_buy
        self.revision_sell = revision_sell
        self.price_sell = price_sell
        self.price_buy = price_buy
        self.city_sell = city_sell
        self.city_buy = city_buy
        self.city_craft = city_craft
        
    def __init__(self,id, ign, item_value, weight, recipe,
                 category,crafting_station, 
                 crafting_tax,quality, revision_sell, 
                 revision_buy, price_sell, price_buy,
                 city_sell, city_buy, city_craft):
        self.id = id
        self.ign = ign
        self.item_value = item_value
        self.weight = weight
        self.recipe = recipe
        self.category = category
        self.crafting_station = crafting_station
        self.quality = quality
        self.crafting_tax = crafting_tax
        self.revision_buy = revision_buy
        self.revision_sell = revision_sell
        self.price_sell = price_sell
        self.price_buy = price_buy
        self.city_sell = city_sell
        self.city_buy = city_buy
        self.city_craft = city_craft

    def toJSON(self):
        return json.dumps({self.id: self.__dict__}, indent=4)
   
