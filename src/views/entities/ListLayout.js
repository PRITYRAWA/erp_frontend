import React, { useCallback, useState } from 'react';
import { Card, Wrapper, Input, Label, FormHeader, Table, ListHeader, TableHeader, SubTable, Modal } from '../../components'
import { ListItem } from '../drag&drop/ListItem';
import FormModal from '../model_views/FormModal';
import ListModal from '../model_views/ListModal';

function ListLayout(props) {

    const [headers, setHeaders] = useState(props.headers)
    const [addMode, setAddMode] = useState(false)
    const [exportMode, setExportMode] = useState(false)
    const [visible, setVisMode] = useState(true)

    const movePetListItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = headers[dragIndex]
            const hoverItem = headers[hoverIndex]
            // Swap places of dragItem and hoverItem in the fields array
            setHeaders(headers => {
                const updatedFields = [...headers]
                updatedFields[dragIndex] = hoverItem
                updatedFields[hoverIndex] = dragItem
                return updatedFields
            })
        },
        [headers],
    )

    let setVisible = (Mode) => {
        setVisMode(Mode)
    }

    return (
        <Wrapper>
            <Card top={20}>
                <TableHeader title={props.title} headerIcon={props.icon} tableMode={props.tableMode} visible={visible} setVisible={setVisible} toggleAddMode={() => { }} toggleExportMode={() => { }} />
                {headers.map((column, indx) => {
                    return <ListItem key={column.id}
                        index={indx}
                        label={column.label}
                        column={column.column}
                        moveListItem={movePetListItem} />
                })}
            </Card>
            <></>
        </Wrapper>
    );
}

export default ListLayout;