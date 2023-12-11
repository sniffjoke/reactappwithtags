import {INote} from "../note/INote";

export interface EditPanelProps {
    open: boolean
    setOpen:(open: boolean) => void
    note: INote
    updateNote: (id: string, note: INote) => void

    updatedNote: INote

    setUptatedNote: (updatedNote: INote) => void

    globalId: string

}
