import {IUser} from "../models/IUser";
import {makeAutoObservable} from 'mobx'
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import {API_URL} from "../interceptors";
import axios from "axios";
import {INote} from "../models/note/INote";

export default class Store {
    user = {} as IUser

    notes = [] as INote[]

    isAuth = false
    isLoading = false
    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setUser(user: IUser) {
        this.user = user
    }

    setLoading(bool: boolean) {
        this.isLoading = bool
    }

    async registration(name: string, email: string, password: string) {
        try {
            const response = await AuthService.registration(name, email, password)
            localStorage.setItem('accessToken', response.data.tokens.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e:any) {
            throw new Error('Неправильные данные, возможно данный email уже используется другим пользователем')
        }
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('accessToken', response.data.tokens.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e:any) {
            throw new Error('Неправильные данные')
        }
    }

    async logout() {
        try {
            await AuthService.logout()
            localStorage.removeItem('accessToken')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (e:any) {
            console.log(e.response?.data?.message)
        }
    }


    async addNote(note: INote) {
        try {
            await UserService.addNote(note)
            this.notes.push(note)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async updateNote(id:string, note: INote) {
        try {
            await UserService.updateNote(id, note)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async deleteNote(id: string) {
        try {
            await UserService.deleteNote(id)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get(`${API_URL}/users/refresh`, {withCredentials: true})
            if (response.data.token !== undefined) {
                localStorage.setItem('accessToken', response.data.token)
            this.setAuth(true)
            this.setUser(response.data.user)
            } else {
                throw new Error('Пожалуйста авторизуйтесь')
            }
        } catch (e:any) {
            throw new Error('Пожалуйста авторизуйтесь')
        } finally {
            this.setLoading(false)
        }
    }


}
