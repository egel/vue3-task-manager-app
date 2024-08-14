import { ref } from "vue";
import { defineStore } from "pinia";
import { Item } from "../services/api";

/**
 * Define dummy initial list
 */
function initStore(): Array<Item> {
  return [
    {
      id: 1,
      title: "Title 1",
      description: "Some description 1",
      dueDate: "2011-10-05T14:48:00.000Z",
      status: "pending",
    },
    {
      id: 2,
      title: "Title 2",
      description: "Some description 2",
      dueDate: "2011-10-05T15:48:00.000Z",
      status: "in progress",
    },
    {
      id: 3,
      title: "Title 3",
      description: "Some description 3",
      dueDate: "2011-10-06T16:48:00.000Z",
      status: "completed",
    },
  ];
}

export const useItemsStore = defineStore("items", {
  state: () => ({
    items: initStore(),
  }),
  actions: {
    addItem(item: Item) {
      this.items.push(item);
    },
    deleteItem(itemID: number) {
      this.items = this.items.filter((object: Item) => {
        return object.id !== itemID;
      });
    },
  },
});
