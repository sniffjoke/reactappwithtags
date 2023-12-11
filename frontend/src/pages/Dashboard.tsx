import React, {FC, useContext, useEffect, useState} from 'react';
import {SiSharp} from "react-icons/si";
import {Context} from "../index";
import {Link} from "react-router-dom";
import NoteItem from "../components/NoteItem";
import {INote} from "../models/note/INote";
import MultiSelect from "../components/MultiSelect";
import {observer} from "mobx-react-lite";
import $api from "../interceptors";
import EditPanel from "../components/EditPanel";
import {toast} from "react-toastify";


const Dashboard: FC = () => {
    const {store} = useContext(Context)
    const [notes, setNotes] = useState<INote[]>([])
    const [open, setOpen] = useState<boolean>(false)

    //Sort items
    const [activeSearch, setActiveSearch] = useState<boolean>(false)
    const [sortedNotes, setSortedNotes] = useState<INote[]>([])
    const [tagArr, setTagArr] = useState<string[]>([])

    //Edit items
    const [updatedNote, setUpdatedNote] = useState<INote>({} as INote)
    const [newNote, setNewNote] = useState<string>('')
    const [editItem, setEditItem] = useState<INote>({} as INote)
    const [globalId, setGlobalId] = useState<string>('')

    //Multiselected tags
    const [selectedItems, setSelectedItems] = useState<string[]>([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await $api.get('http://localhost:5000/api/notes')
                if (!activeSearch) {
                    return setNotes(response.data);
                } else {
                    return setNotes(sortedNotes)
                }
            } catch (e) {
                let error = e as Error
                toast.error(error.message)
            }
        };

        if (!selectedItems.length) {
            setActiveSearch(false)
        }

        fetchData()
            .catch(console.error);
    }, [activeSearch, selectedItems, setNotes, sortedNotes, open, setOpen])


    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            store.checkAuth()
        }
    }, [])


    //Create items
    const onChangeName = (e: any) => {
        let arrOfTags: string[]
        let changeValueArr = e.target.value
        let varArray: string[] = changeValueArr.split(' ')
        arrOfTags=varArray.filter(item => item[0] === '#')
        setTagArr(arrOfTags.filter(item => item.length > 1))
        setNewNote(e.target.value)
    }
    const onCreateNoteSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const updateTags = tagArr.join(' ').replace(/[.?!,%&]/g, '').split(' ')
        const note = {
            text: newNote,
            tagsArray: updateTags
        }
        setNotes([
            ...notes,
            note
        ]);
        setNewNote('')
        setTagArr([])
        return await store.addNote(note)
    }

    //Sort items
    const onAddTagToMultiSelect = (newTag: string) => {
        if (selectedItems.includes(newTag)) {
            toast.error('Данный #тег уже присутсвует в списке')
        } else {
            setSelectedItems([
                ...selectedItems,
                newTag
            ]);
        }
    }
    const searchItems = (tag: string[]) => {
        let arrNewTags = []
        let newArr: INote[] = []
        for (let y: number = 0; y < selectedItems.length; y++) {
            arrNewTags.push(notes.filter(item => item.tagsArray?.includes(tag[y])))
        }
        for (let i: number = 0; i < arrNewTags.length; i++) {
            arrNewTags[i].map((item: INote) => newArr.push(item))
        }
        const res = newArr.reduce((o: INote[], i: INote) => {
            if (!o.find((v: INote) => v._id === i._id)) {
                o.push(i);
            }
            return o;
        }, []);
        setSortedNotes(res)
        setActiveSearch(true)
    }

    //Edit Items
    const onEditPanel = () => {
        setOpen(!open)
    }
    const onEditIndex = (index: number) => {
        setEditItem(notes[index])
        // @ts-ignore
        setGlobalId(notes[index]._id)
    }
    const onUpdateNote = async (id: string, note: INote) => {
        await store.updateNote(id, note)
    }
    const onRemoveNote = async (id: string) => {
        await store.deleteNote(id)
    }
    const onRemoveTagFromMultiSelect = (item: string) => {
        const filtered = selectedItems.filter((e) => e !== item);
        setSelectedItems(filtered);
        // searchItems(selectedItems)
    }
    const onRemoveAllTagsFromMultiSelect = () => {
        setSelectedItems([])
        setActiveSearch(false)
    }

    return (
        <>
            {
                !store.isAuth
                    ?
                    // Spinner
                    <section className={'flex justify-center'}>
                        <div className={'pt-10'}>
                            <h1 className={'flex justify-center text-3xl font-serif  text-indigo-600'}>
                                <SiSharp/>&nbsp;Пожалуйста, авторизуйтесь:&nbsp;
                                <Link to={'login'} className={'text-bold underline'}>Войти</Link>
                            </h1>
                            <div role="status" className={'flex justify-center'}>
                                <svg aria-hidden="true"
                                     className="inline w-10 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </section>
                    :
                    <>
                        {/*Title*/}
                        <section className={'flex justify-center'}>
                            <div className={'pt-10'}>
                                <h1 className={'flex justify-center text-3xl font-serif  text-indigo-600'}>
                                    <SiSharp/>&nbsp;Добро пожаловать
                                </h1>
                                <div className={'py-5'}>
                                    <p className={'font-sans'}>Создавайте заметки, помечая нужные словами знаком '#',
                                        например #tag,
                                        для более удобного фильтра по своим заметкам.</p>
                                </div>
                            </div>

                        </section>

                        {/*Create note*/}
                        <section className={'pb-5'}>
                            <form className="max-w-sm mx-auto" onSubmit={onCreateNoteSubmit}>


                                <div className="mb-5">
                                    <label
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
                                                value={tagArr.join(' ').replace(/[.?,!%&]/g, '')}
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

                        {/*Tags*/}
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

                        {/*Render items*/}
                        <section className={'grid grid-cols-4 gap-4 px-5 py-10 sm:grid-cols-2 sm:gap-2'}>
                            {
                                notes && notes.map((item, index) =>
                                    <NoteItem
                                        key={`${index}_${item._id}`}
                                        item={item}
                                        index={index}
                                        onAddTag={onAddTagToMultiSelect}
                                        onEditPanel={onEditPanel}
                                        onEditIndex={onEditIndex}
                                        setNotes={setNotes}
                                        notes={notes}
                                        onRemoveNote={onRemoveNote}
                                    />
                                )
                            }
                        </section>

                        {/*Sidebar*/}
                        <section>
                            <EditPanel
                                open={open}
                                setOpen={setOpen}
                                note={editItem}
                                updateNote={onUpdateNote}
                                updatedNote={updatedNote}
                                setUptatedNote={setUpdatedNote}
                                globalId={globalId}
                            />
                        </section>
                    </>
            }
        </>
    );
};

export default observer(Dashboard);
