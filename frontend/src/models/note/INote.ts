export type INote = {
    createdAt?: string
    text: string
    updatedAt?: string
    user?: string
    _id: string
}

export type INoteProps = {
    item: INote
    arr: string[]
}
