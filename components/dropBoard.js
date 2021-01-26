import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import DisplayModule from './displayModule';


const DropBoard = ({ item, content, setContent }) => {
    const [{isOver}, drop] = useDrop({
        accept: [
            'header',
            'headerImage',
            'imageLeftText',
            'imageRightText',
            'plainText',
        ],
        drop: (item) => {
            setContent([...content, item]);
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
      })
      
    return (
        <div
            style={{
                width: '100%',
                minHeight: '80vh',
                height: '100%',
                backgroundColor: '#eee',
            }}
            ref={drop}>
                {content.length === 0 && <p>Umieść tutaj moduł</p>}
                {content && 
                content.map((item, index) => (
                    <DisplayModule 
                        key={index}
                        index={index} 
                        params={item}
                        editable
                        updateModule={(state) => {
                            let newContent = [...content];
                            newContent[index] = {
                                ...content[index],
                                ...state
                            }
                            setContent(newContent);
                        }}
                        deleteModule={() => {
                            setContent(content.filter((element, i) => i !== index));
                        }} />
                    
                ))}
        </div>
    )
}

export default DropBoard;