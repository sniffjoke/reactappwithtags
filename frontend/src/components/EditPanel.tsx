import React, {FC, Fragment, useEffect, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {EditPanelProps} from "../models/editpanel/EditPanel";
import Moment from "react-moment";

const EditPanel: FC<EditPanelProps> = ({
                                           open,
                                           setOpen,
                                           note,
                                           updatedNote,
                                           updateNote,
                                           setUptatedNote,
                                           globalId,
                                       }) => {
    const [tagArr, setTagArr] = useState<string[]>()

    useEffect(() => {
        setTagArr(note.tagsArray)
    }, [note])

    const onChangeName = (e: any) => {
        let arrOfTags: string[]
        let changeValueArr = e.target.value
        let varArray: string[] = changeValueArr.split(' ')
        arrOfTags=varArray.filter(item => item[0] === '#')
        setTagArr(arrOfTags.filter(item => item.length > 1))
        setUptatedNote(e.target.value)
    }


    const onUpdateNote = async (text: any) => {
        if (tagArr) {
            const updateTags = tagArr.join(' ').replace(/[.?,!%&]/g, '').split(' ')
            const note = {
                text,
                tagsArray: updateTags
            }
            await updateNote(globalId, note)

        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4">
                                            <button
                                                type="button"
                                                className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="absolute -inset-2.5"/>
                                                <span className="sr-only">Close panel</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true"/>
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div
                                        className="flex h-full flex-col overflow-y-scroll bg-emerald-500 py-6 shadow-xl"
                                    >
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title
                                                className="text-base font-semibold leading-6 text-gray-900 flex justify-between">
                                                <div>
                                                    Редактирование заметки от:
                                                </div>
                                                <Moment format="DD.MM.YYYY HH:mm">
                                                    {note.createdAt}
                                                </Moment>
                                            </Dialog.Title>
                                        </div>

                                        <div>
                                            <div className="relative mt-6 flex-1 px-4">
                                                {
                                                    note && note
                                                        ?
                                                        <textarea
                                                            defaultValue={note.text}
                                                            // value={newNote}
                                                            onChange={onChangeName}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            placeholder={'Заметка...'}
                                                            required
                                                        />
                                                        :
                                                        <div>
                                                            Ничего не передано для редактирования
                                                        </div>
                                                }
                                            </div>
                                        </div>

                                        <div className={'flex justify-start px-4 py-4'}>
                                            <div className={'py-2 px-1'}>
                                                <p>Введенные теги:&nbsp;</p>
                                            </div>
                                            <div className={'flex justify-center'}>
                                                {tagArr && tagArr.map(item =>
                                                    <div className={'flex justify-between items-center'} key={item}>
                                                        <div
                                                            className={'bg-rose-300 rounded-xl py-2 px-1'}>{item.replace(/[.?,%&]/g, '')}</div>
                                                        <div>&nbsp;</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className={'flex justify-between'}>
                                            <div className={'py-2 px-4'}>
                                                <button
                                                    onClick={() => setOpen(false)}
                                                    type="submit"
                                                    className="w-max text-black bg-indigo-500 font-medium rounded-lg text-sm w-[200px] px-5 py-2.5 text-center
                                                                hover:bg-indigo-700
                                                                focus:ring-4 focus:outline-none focus:ring-blue-300
                                                                dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-blue-800"
                                                >
                                                    Отмена
                                                </button>
                                            </div>
                                            <div className={'py-2 px-4'}>
                                                <button
                                                    onClick={() => onUpdateNote(updatedNote)}
                                                    type="submit"
                                                    className="w-max text-black bg-indigo-500 font-medium rounded-lg text-sm w-[200px] px-5 py-2.5 text-center
                                                                hover:bg-indigo-700
                                                                focus:ring-4 focus:outline-none focus:ring-blue-300
                                                                dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-blue-800"
                                                >
                                                    Принять
                                                </button>
                                            </div>
                                        </div>


                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default EditPanel;
