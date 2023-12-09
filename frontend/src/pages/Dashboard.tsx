import React, {FC, useContext, useEffect, useState} from 'react';
import {SiSharp} from "react-icons/si";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import NoteItem from "../components/NoteItem";
import {INote} from "../models/note/INote";
import MultiSelect from "../components/MultiSelect";
import {observer} from "mobx-react-lite";


const Dashboard: FC = () => {
    const {store} = useContext(Context)
    const [notes, setNotes] = useState<INote[]>([])
    const [newNote, setNewNote] = useState<string>('')
    const [activeSearch, setActiveSearch] = useState<boolean>(false)
    const [sortedNotes, setSortedNotes] = useState<INote[]>([])

    const [refFind, setRefFind] = useState('')
    const [tagArr, setTagArr] = useState<string[]>([])
    const navigate = useNavigate()

    //Selected tags with mouse button
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            store.checkAuth()
        } else {
            navigate('/login')
        }
    }, [])
    console.log(store.isAuth)

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5000/api/notes')
            if (!activeSearch) {
                return setNotes(response.data);
            } else {
                return setNotes(sortedNotes)
            }
        };
        if (!selectedItems.length) {
            setActiveSearch(false)
        }

        fetchData()
            .catch(console.error);
    }, [activeSearch, selectedItems])

    const onChangeName = (e: any) => {
        let aloneArr: string[] = []
        setRefFind(e.target.value)
        let varArr = e.target.value
        let varArray: string[] = varArr.split(' ')
        varArray.map(item => {
            if (item[0] === '#') aloneArr.push(item)
        })
        setTagArr(aloneArr)
        setNewNote(e.target.value)
    }
    const onCreateNoteSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setNotes([
            ...notes,
            {text: newNote, tagsArray: tagArr}
        ]);
        setNewNote('')
        setTagArr([])
        return await store.addNote(newNote, tagArr)
    }

    //Tags in MultiSelect
    const onAddTagToMultiSelect = (newTag: string) => {
        if (selectedItems.includes(newTag)) {
            console.log('Данный #тег уже присутсвует в списке')
        } else {
            setSelectedItems([
                ...selectedItems,
                newTag
            ]);
        }
    }

    const onRemoveTagFromMultiSelect = (item: string) => {
        const filtered = selectedItems.filter((e) => e !== item);
        setSelectedItems(filtered);
        searchItems(selectedItems)
    }

    const onRemoveAllTagsFromMultiSelect = () => {
        setSelectedItems([])
        setActiveSearch(false)
    }

    //Sort items
    const searchItems = (tag: string[]) => {
        let arrNewTags: any = []
        for (let y: number = 0; y < selectedItems.length; y++) {
            arrNewTags.push(notes.find(item => item.tagsArray?.includes(tag[y])))
        }
        const res = arrNewTags.reduce((o: INote[], i: INote) => {
            if (!o.find((v: INote) => v._id === i._id)) {
                o.push(i);
            }
            return o;
        }, []);
        setSortedNotes(res)
        setActiveSearch(true)
    }


    return (
        <>
            <section className={'flex justify-center'}>
                <div className={'pt-10'}>
                    <h1 className={'flex justify-center text-3xl font-serif  text-indigo-600'}>
                        <SiSharp/>&nbsp;Добро пожаловать, пользователь Никита
                    </h1>
                    <div className={'py-5'}>
                        <p className={'font-sans'}>Создавайте заметки, помечая нужные словами знаком '#', например #tag,
                            для более удобного фильтра по своим заметкам.</p>
                    </div>
                </div>

            </section>
            <section className={'pb-5'}>
                <form className="max-w-sm mx-auto" onSubmit={onCreateNoteSubmit}>


                    <div className="mb-5">
                        <label
                            htmlFor="confirmPassword"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Создайте заметку (просто начните писать):
                        </label>
                        <textarea
                            value={newNote}
                            onChange={onChangeName}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder={'Заметка...'}
                            required
                        />
                        <div className={'flex justify-start'}>
                            <p>Введенные теги:&nbsp;</p>
                            <div>
                                <input
                                    type="text"
                                    value={tagArr.join(' ').replace(/[.,%]/g, '')}
                                    disabled
                                    className={'bg-inherit'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={'flex justify-center'}>
                        <button
                            type="submit"
                            className="text-black bg-indigo-500 font-medium rounded-lg text-sm w-full w-[200px] px-5 py-2.5 text-center
                    hover:bg-indigo-700
                    focus:ring-4 focus:outline-none focus:ring-blue-300
                    dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-blue-800"
                        >
                            Создать заметку
                        </button>
                    </div>
                </form>
            </section>
            <hr className={'pt-3'}/>
            <section>
                <MultiSelect
                    selectedItems={selectedItems}
                    onRemoveTag={onRemoveTagFromMultiSelect}
                    onRemoveAllTags={onRemoveAllTagsFromMultiSelect}
                />
                <div className={'flex justify-center'}>
                    <div
                        className="text-black bg-indigo-500 font-medium rounded-lg
                        text-sm w-full w-[200px] px-5 py-2.5 text-center cursor-pointer
                        hover:bg-indigo-700
                        focus:ring-4 focus:outline-none focus:ring-blue-300
                        dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-blue-800"
                        onClick={() => searchItems(selectedItems)}
                    >
                        Применить фильтр(ы)
                    </div>
                </div>
            </section>
            <section className={'grid grid-cols-4 gap-4 px-5 py-10 sm:grid-cols-2 sm:gap-2'}>
                {
                    notes && notes.map((item, index) =>
                        <NoteItem
                            key={`${index}_${item._id}`}
                            item={item}
                            index={index}
                            onAddTag={onAddTagToMultiSelect}
                        />
                    )
                }
            </section>
        </>
    );
};

export default observer(Dashboard);
