import React, { useState } from 'react';
import { Button, Dropdown, Header, Item, Label, Segment } from 'semantic-ui-react';

// za pomocą props przekazuję parametry - text, bgColor, color,
// editable mówi, czy dany moduł można edytować, wykorzystywany przy edytowaniu strony
// dodałem setText, bo inaczej chyba nie da się edytować :/ i tak się nie da xd

const HeaderModule = ({
    text,
    imageURL,
    color,
    index,
    deleteModule,
    updateModule,
    editable,
    }) => {
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
    const [over, setOver] = useState(false);
    function handleImage(image) {
        const formData = new FormData();
        formData.append('file', image);
        fetch('/api/upload', {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
              updateModule({imageURL: data.url});
          })
          .catch(error => {
            console.error(error)
          })
    }
    return (
        <div 
            onMouseEnter={()=>setOver(true)}
            onMouseLeave={()=>setOver(false)}
            style={{
                backgroundImage: `url('${imageURL}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                padding: '2.8em 0',
                position: 'relative'
            }}>
            <Header as='h1' textAlign='center' style={{color}}>
                {/* Gdy nie jest edytowalny */}
                {!editable && text}
                {/* Input, aby można było edytować tekst */}
                {editable &&
                    <input type='text' 
                        defaultValue={text}
                        onChange={(e) => updateModule({text: e.target.value})}
                        style={{
                            border: 'none',
                            textAlign: 'center',
                            backgroundColor: 'transparent',
                            fontWeight: '500',
                            color: color,
                            width: '100%'
                    }}/>
                }
            </Header>
            {/* Przycisk do usuwania modułu, tylko wyświetlany w panelu admina */}
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
                        placeholder='Kolor tekstu'
                        selection
                        options={colors}
                        onChange={(e, {value})=> updateModule({color: value})}/>
                    <Button as='label' htmlFor={`fileInput_${index}`} style={{ cursor: 'pointer'}}>
                        Zmień tło
                    </Button>
                    <input type='file' id={`fileInput_${index}`} style={{ display: 'none' }} accept="image/*"
                        onChange={(e) => {
                            if (e.target.files[0])
                                handleImage(e.target.files[0])
                        }} />
                </div>
            </>
            }
        </div>
    );
};

export default HeaderModule;