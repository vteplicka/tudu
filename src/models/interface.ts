export interface ListItem {
    title: string
    subtitle: string
    subItems: ListItem[]
    isDone: boolean
}

export interface List {
    title: string
    items: ListItem[]
}