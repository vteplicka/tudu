import { defineStore } from 'pinia'
import type { List, ListItem } from '../models/interface'

export const useListStore = defineStore('lists', {
  state: () => ({ lists: [] as List[] }),

  actions: {
    addList (listTitle: string) {
      const newList: List = {
        title: listTitle,
        items: []
      }
      this.lists.push(newList)
    },

    discardList (listIndex: number) {
      this.lists.splice(listIndex, 1)
    },

    addItem (listIndex: number, itemTitle: string, itemIndex: number | null = null) {
      const newItem: ListItem = {
        title: itemTitle,
        subtitle: '',
        subItems: [],
        isDone: false
      }

      if (itemIndex === null) {
        this.lists[listIndex].items?.push(newItem)
      } else {
        this.lists[listIndex].items[itemIndex].subItems?.push(newItem)
      }
    },

    deleteItem (listIndex: number, itemIndex: number, subitemIndex: number | null = null) {
      if (subitemIndex === null) {
        this.lists[listIndex].items?.splice(itemIndex, 1)
      } else {
        this.lists[listIndex].items[itemIndex].subItems?.splice(subitemIndex, 1)
      }
    },

    markAsDone (listIndex: number, itemIndex: number, subitemIndex: number | null = null) {
      if (subitemIndex === null) {
        this.lists[listIndex].items[itemIndex].isDone = true

        if (this.lists[listIndex].items[itemIndex].subItems?.length) {
          this.lists[listIndex].items[itemIndex].subItems = this.lists[listIndex].items[itemIndex].subItems.map(
            (subItem => {
              return {
                ...subItem,
                isDone: true
              }
            })
          )
        }
      } else {
        this.lists[listIndex].items[itemIndex].subItems[subitemIndex].isDone = true
      }
    },

    editItem (listIndex: number, itemIndex: number, subitemIndex: number | null = null, item: ListItem) {
      if (subitemIndex === null) {
        this.lists[listIndex].items[itemIndex] = item
      } else {
        this.lists[listIndex].items[itemIndex].subItems[subitemIndex] = item
      }
    }
  }
})
