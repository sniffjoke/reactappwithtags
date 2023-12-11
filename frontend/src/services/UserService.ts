import $api from "../interceptors";
import {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";
import {INote} from "../models/note/INote";


export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>('/users/me')
    }

    static async getNotes(): Promise<AxiosResponse<INote[]>> {
        return $api.get('/notes')
    }

    static async addNote(note: INote) {
        return $api.post('/notes', {...note})
    }

    static async updateNote(id: string, note: INote) {
        return $api.put(`/notes/${id}`, {...note})
    }

    static async deleteNote(id: string) {
        return $api.delete(`/notes/${id}`)
    }
}
