import React, { useCallback, useEffect, useState } from 'react';
import { Button, Dropdown } from 'semantic-ui-react';

const PlainTextModule = ({
    text,
    bgColor,
    color,
    editable,
    updateModule,
    deleteModule
}) => {
    const [over, setOver] = useState(false);
    const colors = [
        {
            text: 'czerwony',
            value: 'red'
        },
        {
            text: 'pomarańczowy',
            value: 'orange'
        },
        {
            text: 'żółty',
            value: 'yellow'
        },
        {
            text: 'oliwkowy',
            value: 'olive'
        },
        {
            text: 'zielony',
            value: 'green'
        },
        {
            text: 'morski',
            value: 'teal'
        },
        {
            text: 'niebieski',
            value: 'blue'
        },
        {
            text: 'fioletowy',
            value: 'violet'
        },
        {
            text: 'purpurowy',
            value: 'purple'
        },
        {
            text: 'różowy',
            value: 'pink',
        },
        {
            text: 'brązowy',
            value: 'brown',
        },
        {
            text: 'biały',
            value: 'white',
        },
        {
            text: 'szary',
            value: 'grey',
        },
        {
            text: 'czarny',
            value: 'black',
        },
    ]
    return (
        <div 
            onMouseEnter={()=>setOver(true)}
            onMouseLeave={()=>setOver(false)}
            style={{
                backgroundColor: bgColor,
                color: color,
                position: 'relative',
                height: 'auto'
            }}>
            {!editable && <p style={{padding: '2.8em 0', textAlign: 'center'}}>{text}</p>}
            {editable &&
                <textarea
                    defaultValue={text}
                    onChange={(e) => updateModule({text: e.target.value})}
                    style={{
                        border: 'none',
                        textAlign: 'center',
                        backgroundColor: 'transparent',
                        color: color,
                        width: '100%',
                        height: '100%',
                        padding: '2.8em 0',
                        textAlign: 'center'
                }}/>
            }
            {editable && over &&
            <>
                <Button onClick={deleteModule} style={{
                    position: 'absolute',
                    top: 0,
                    right: 0
                }} negative>
                    Usuń
                </Button>
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                }}>
                    <Dropdown
                        placeholder='Kolor tła'
                        selection
                        options={colors}
                        onChange={(e, {value})=> updateModule({bgColor: value})}/>
                    <Dropdown
                        placeholder='Kolor tekstu'
                        selection
                        options={colors}
                        onChange={(e, {value})=> updateModule({color: value})}/>
                </div>
            </>
            }
        </div>
    );
};

export default PlainTextModule;