import React, {FC, useContext, useEffect, useState} from 'react';
import {SiSharp} from "react-icons/si";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import NoteItem from "../components/NoteItem";
import {INote} from "../models/note/INote";


const Dashboard: FC = () => {
    const {store} = useContext(Context)
    const [notes, setNotes] = useState<INote[]>([])
    const [newNote, setNewNote] = useState<string>('')

    const [refFind, setRefFind] = useState('')
    const [tagArr, setTagArr] = useState<string[]>([])

    const navigate = useNavigate()

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         store.checkAuth()
    //     } else {
    //         navigate('/login')
    //     }
    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5000/api/goals')
            return setNotes(response.data);
        };

        fetchData()
            // make sure to catch any error
            .catch(console.error);
    }, [])

    let aloneArr: string[] = []

    const onChangeName = (e: any) => {
        setRefFind(e.target.value)
        let varArr = e.target.value
        let varArray: string[] = varArr.split(' ')
        varArray.map(item => {
            if (item[0] === '#') aloneArr.push(item)
        })
        setTagArr(aloneArr)
        setNewNote(e.target.value)
    }

    let i = 'a'
    const onCreateNoteSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setNotes([
            ...notes,
            {_id: i, text: newNote}
        ]);
    }

    return (
        <>
            <input type="text" onChange={onChangeName}/>
            <section className={'flex justify-center'}>
                <div className={'pt-10'}>
                    <h1 className={'flex justify-center text-3xl font-serif  text-indigo-600'}>
                        <SiSharp/>&nbsp;Добро пожаловать, пользователь Никита
                    </h1>
                    <div className={'py-5'}>
                        <p className={'font-sans'}>Создавайте заметки, помечая нужные словами знаком '#', например #tag,
                            для более удобного фильтра по своим тегам</p>
                    </div>
                </div>

            </section>

            <form className="max-w-sm mx-auto" onSubmit={onCreateNoteSubmit}>


                <div className="mb-5">
                    <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Создайте заметку
                    </label>
                    <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={'Заметка...'}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="text-black bg-indigo-500 font-medium rounded-lg text-sm w-full sm:w-[200px] px-5 py-2.5 text-center
                    hover:bg-indigo-700
                    focus:ring-4 focus:outline-none focus:ring-blue-300
                    dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-blue-800"
                >
                    Создать заметку
                </button>
            </form>
            <section className={'grid grid-cols-4 gap-4 px-5 py-10'}>
                {
                    notes && notes.map(item =>
                        <NoteItem item={item} arr={tagArr}/>
                    )
                }
            </section>
        </>
    );
};

export default Dashboard;
