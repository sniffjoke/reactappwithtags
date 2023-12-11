import React, {FC, useState} from 'react';
import {INoteProps} from "../models/note/INote";
import Moment from "react-moment";
import {GrEdit} from "react-icons/gr";
import {FaTrashAlt} from "react-icons/fa";


const NoteItem: FC<INoteProps> = ({
                                      item,
                                      index,
                                      onAddTag,
                                      onEditPanel,
                                      onEditIndex,
                                      setNotes,
                                      notes,
                                      onRemoveNote
                                  }) => {

    const editItem = (i: number) => {
        onEditPanel()
        onEditIndex(i)
    }

    // @ts-ignore
    const [idForRemove, setIdForRemove] = useState<string>(item._id)

    const removeItem = async (id: string) => {
        await onRemoveNote(id)
        setNotes(notes.filter(item => item._id !== id))
    }

    return (
        <div
            className={'flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800'}>
            <div className="flex flex-col justify-between p-4 leading-normal">
                <div className={'flex justify-between'}>
                    <div onClick={() => editItem(index)}
                         className={'cursor-pointer text-white text-2xl hover:text-amber-500'}><GrEdit/></div>
                    <div onClick={() => removeItem(idForRemove)}
                         className={'cursor-pointer text-white text-2xl hover:text-rose-500'}><FaTrashAlt/></div>
                </div>
                <div className={'pt-4'}>
                    <div
                        className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white"
                    >
                        <Moment format="DD.MM.YYYY HH:mm">
                            {item.createdAt}
                        </Moment>
                    </div>
                </div>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.text}</p>
                <div className={'flex justify-evenly'}>
                    {item.tagsArray && item.tagsArray.map((item, index_sub) =>
                        <div
                            key={`${index_sub}_${index}`}
                            onClick={() => onAddTag(item)}
                            className={'cursor-pointer hover:text-emerald-700 text-emerald-500'}
                        >
                            {item}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
