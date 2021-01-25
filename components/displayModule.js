import React from 'react';

import Header from './modules/header';
import HeaderImage from './modules/headerImage';
import ImageLeftText from './modules/imageLeftText';
import ImageRightText from './modules/imageRightText';
import PlainText from './modules/plainText';

const DisplayModule = ({params, editable, updateModule, deleteModule, index}) => {
    switch(params.type) {
        case 'header': return (
            <Header 
                text={params.text} 
                bgColor={params.bgColor} 
                color={params.color} 
                editable={editable}
                updateModule={updateModule}
                deleteModule={deleteModule}
                />
                );
        case 'headerImage': return (
            <HeaderImage 
                text={params.text} 
                imageURL={params.imageURL} 
                color={params.color} 
                editable={editable}
                updateModule={updateModule}
                deleteModule={deleteModule}
                />
                );
        case 'imageLeftText': return (
            <ImageLeftText 
                text={params.text} 
                imageURL={params.imageURL} 
                bgColor={params.bgColor} 
                color={params.color} 
                editable={editable}
                index={index}
                updateModule={updateModule}
                deleteModule={deleteModule}
                />
                );
        case 'imageRightText': return (
            <ImageRightText 
                text={params.text} 
                imageURL={params.imageURL} 
                bgColor={params.bgColor} 
                color={params.color} 
                editable={editable}
                index={index}
                updateModule={updateModule}
                deleteModule={deleteModule}
                />
                );
        case 'plainText': return (
            <PlainText 
                text={params.text} 
                bgColor={params.bgColor} 
                color={params.color} 
                editable={editable}
                index={index}
                updateModule={updateModule}
                deleteModule={deleteModule}
                />);
    }
};

export default DisplayModule;