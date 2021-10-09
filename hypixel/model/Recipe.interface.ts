import { Item } from "./Item.interface";

export interface Recipe{
    slot1:Item;
    slot2:Item;
    slot3:Item;
    slot4:Item;
    slot5:Item;
    slot6:Item;
    slot7:Item;
    slot8:Item;
    slot9:Item;
    slots: Item[];
    finalItem:Item;
}