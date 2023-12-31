import { useState } from "react";

import { useAppSelector } from "../../store/hooks"

import Note from "../Note/Note";
import NotebookTitle from "./NotebookTitle/NotebookTitle";
import AddTaskForm from "./AddTaskForm/AddTaskForm";

import s from "./notebookItems.module.scss"
import Filter from "./Filter/Filter";


interface NoteboockItemsProos {
    notebookId: string
    title: string
    filter: 'all' | 'completed' | 'uncompleted'
}

const NoteboockItems: React.FC<NoteboockItemsProos> = ({  notebookId, title, filter }) => {
    
    const notes = useAppSelector(state => state.notes[notebookId])

    const [AddTaskFormIsActive, setAddTaskFormIsActive] = useState<boolean>(false)    // локальный стейт для добавления note-ы

    const [AddTaskBtnIsDisabled, setAddTaskBtnIsDisabled] = useState<boolean>(false)    // локальный стейт для блокировки AddTaskBtn

    const [activateFilter, setActivateFilter] = useState<boolean>(false)    // локальный стейт для сокрытия и открытия Filter

    const addNewTaskHandler = () => {
        if (!AddTaskBtnIsDisabled) {
            setAddTaskFormIsActive(true)        // активирует input
            setAddTaskBtnIsDisabled(true)      // блокирует кнопку активации инпута
        }
    }

    const stateCompleted = () => {
        if (filter === 'all') return null
        else if (filter === 'completed') return true
        else return false
    }
    
    const filteredNotes = () => {           // массив отфильтрованных мелких заметок
        if (stateCompleted() !== null) {
            return notes?.filter(note => note.completed === stateCompleted())
        } else return false
    } 

    const noteList =
        <ul>
            {filteredNotes()
                //@ts-ignore
                ? filteredNotes().map((note, place) => (       //создание отфильтрованных мелких заметок
                    <Note
                        notebookId={notebookId}
                        noteId={note.id}
                        noteTitle={note.title}
                        completed={note.completed}
                        key={note.id}
                        place={place}
                    />
                ))
                : notes?.map((note, place) => (       //создание мелких заметок
                    <Note
                        notebookId={notebookId}
                        noteId={note.id}
                        noteTitle={note.title}
                        completed={note.completed}
                        key={note.id}
                        place={place}
                    />
                ))
            }

            
        </ul>


    const AddTaskFormBlock = AddTaskFormIsActive ?
        <AddTaskForm
            notebookId={notebookId}
            setAddTaskFormIsActive={setAddTaskFormIsActive}
            setAddTaskBtnIsDisabled={setAddTaskBtnIsDisabled} />
        : null
    
    return (
        <div className={s.noteboockItems}
            onMouseOver={() => setActivateFilter(true)}
            onMouseLeave={() => setActivateFilter(false)}>

            <NotebookTitle                  // notebook заголовок
                notebookId={notebookId}
                title={title}
            />
            
            {noteList}{/*                         список из <Note/>                       */}

            {AddTaskFormBlock}{/*                 input для добавления новой note-ы       */}
            
            <button                             // Открывает и закрывает input для новой note-ы
                onClick={addNewTaskHandler}
                className={s.addNewTaskButton}
                disabled={AddTaskBtnIsDisabled}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.5 19.5" width="18px" height="18px"><title>add task</title><g id="Слой_2" data-name="Слой 2">
                    <g id="Слой_1-2" data-name="Слой 1"><path d="M19.5,9.75a.58.58,0,0,1-.57.57H10.32v8.61a.57.57,0,0,1-1.14,0V10.32H.57a.57.57,0,0,1,0-1.14H9.18V.57a.57.57,0,0,1,1.14,0V9.18h8.61A.58.58,0,0,1,19.5,9.75Z" /></g></g></svg>
                <div>Add new task</div>
            </button> 

            {activateFilter ? <Filter notebookId={notebookId} active={activateFilter}/> : null}
        </div> 
    )
}

export default NoteboockItems;