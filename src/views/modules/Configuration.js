import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Draggable from '../drag&drop/Draggable';
import Section from '../drag&drop/Section';
import Droppable from '../drag&drop/Droppable';

function Configuration(props) {
    return (
       
        <Droppable/>
       
    );
}

export default Configuration;