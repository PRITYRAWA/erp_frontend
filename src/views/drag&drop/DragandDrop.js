import React, { useEffect } from 'react'
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AiOutlineMenu } from 'react-icons/ai'




function DragandDrop(props) {



    const [characters, setUpdateCharacters] = useState(props.dragdrop);
    // const [dubCharacters, setDubCharacters] = useState([...props.dragdrop]);
    // const [defCharacters, defUpdateCharacters] = useState([...props.dragdrop]);


    //This to Re-Position the required and default field 
    useEffect(() => {
        let filterData = characters.filter((value) => {
            return value.visibility === "required" || value.visibility === "default"

        })
        filterData.map((data, index) => {


            data.position = index + 1
        })


        let data = [...characters, ...filterData]
        let newdata = [...new Set(data)]
        let newElee = [...newdata]


        for (let i = 0; i < filterData.length; i++) {
            newElee.splice(i, 0, filterData[i])
        }
        setUpdateCharacters([...new Set(newElee)])

    }, [])





    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // updateCharacters(items);
        setUpdateCharacters(items)

        if (result.source.index > result.destination.index || result.destination.index > result.source.index) {
            items.map((value, idx) => {
                value.position = idx + 1
            })
        }

        props.dragdropColumns(items)
    }


    return (
        <div className="App">
            <div className="App-header">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="characters">
                        {(provided) => (
                            <div className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                {characters.map((value, index) => {
                                    return (
                                        <Draggable key={value.id} draggableId={value.id} index={index}>
                                            {(provided) => (
                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <div className="styel" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0px" }}>
                                                        <div className='input_label' style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                            <div className="characters-thumb">
                                                                {value.visibility == "required" ?
                                                                    <input type="checkbox" key={index} className="checkOn" value={value.label} onClick={(e) => { props.getValue(e, value) }}
                                                                        defaultChecked={value.check} ></input> : <></>
                                                                }
                                                                {value.visibility == "default" ?
                                                                    <input type="checkbox" key={index} className="checkOn" value={value.label} onClick={(e) => { props.getValue(e, value) }}
                                                                        checked disabled ></input> : <></>}
                                                                {value.visibility == "optional" ?
                                                                    <input type="checkbox" key={index} className="checkOn" value={value.label} onClick={(e) => { props.getValue(e, value) }}  ></input> : <></>
                                                                }
                                                            </div>
                                                            <label className='labelOn' >
                                                                {value.label}
                                                            </label>
                                                        </div>

                                                        <AiOutlineMenu style={{ marginRight: "14px", width: "22px", height: "22px" }} />
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

        </div>
    );
}







export default DragandDrop