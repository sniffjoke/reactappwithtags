import React, {FC} from 'react';
import {INoteProps} from "../models/note/INote";

const NoteItem: FC<INoteProps> = ({item, arr}) => {
    return (
        <div className={'flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'}>
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{item._id}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.text}</p>
                {arr && arr.map(item =>
                    <p>{item}</p>
                )}
            </div>
        </div>
    );
};

export default NoteItem;
