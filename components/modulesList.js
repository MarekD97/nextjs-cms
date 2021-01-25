import React from 'react';
import { useDrag } from 'react-dnd';

import Header from './modules/header';
import HeaderImage from './modules/headerImage';
import ImageLeftText from './modules/imageLeftText';
import ImageRightText from './modules/imageRightText';
import PlainText from './modules/plainText';

const ModulesList = () => {
    const imageUrl = 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg';
    return (
        <>
            <hr style={{width: '100%'}} />
            <DragItem type='header'>
                <Header text='Nagłówek' bgColor='white'/>
            </DragItem>
            <hr style={{width: '100%'}} />
            <DragItem type='headerImage'>
                <HeaderImage text='Nagłówek ze zdjęciem w tle' imageURL={imageUrl} bgColor='white' />
            </DragItem>
            <hr style={{width: '100%'}} />
            <DragItem type='imageLeftText'>
                <ImageLeftText text='Tekst ze zdjęciem po lewej stronie' imageURL={imageUrl} bgColor='white'/>
            </DragItem>
            <hr style={{width: '100%'}} />
            <DragItem type='imageRightText'>
                <ImageRightText text='Tekst ze zdjęciem po prawej stronie' imageURL={imageUrl} bgColor='white'/>
            </DragItem>
            <hr style={{width: '100%'}} />
            <DragItem type='plainText'>
                <PlainText text='Zwykły tekst' />
            </DragItem>
        </>
    );
};

export default ModulesList;

export const DragItem = ({ children, type }) => {
    const [{isDragging}, drag] = useDrag({
        item: {...children.props, type: type},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    return (
        <span ref={drag} style={{cursor: 'pointer'}}>{children}</span>
    )
}