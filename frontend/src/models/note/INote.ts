export type INote = {
    createdAt?: string
    text: string
    updatedAt?: string
    user?: string
    _id?: string
    tagsArray?: string[]
}

export type INoteProps = {
    item: INote,
    index: number
    onAddTag: (e: string) => void
    onEditPanel: () => void
    onEditIndex: (i: number) => void
    notes: INote[]
    setNotes: (notes: INote[]) => void
    onRemoveNote: (id: string) => void
}
