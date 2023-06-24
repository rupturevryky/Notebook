import React from 'react';

import { useAppSelector } from "../../store/hooks"
import NoteboockItems from "../NoteboockItems/NoteboockItems";
import "./notebook.scss"

const Noteboock: React.FC = () => {

    const notebooks = useAppSelector(state => state.notebook.notebook)

    const notebookList = notebooks.map(notebook => (
        <NoteboockItems
          key={notebook.id} id={notebook.id}
          title={notebook.title} filter={notebook.filter}
          />

    ))
    

    return (
        <>
            {notebookList}
        </>
      );
};

export default Noteboock;