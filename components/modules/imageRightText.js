import React, { useState } from 'react';
import { Button, Dropdown, Grid, Image } from 'semantic-ui-react';

const ImageRightTextModule = ({
    text,
    imageURL,
    bgColor,
    color,
    index,
    updateModule,
    deleteModule,
    editable}) => {
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
        <Grid padded style={{
            backgroundColor: bgColor,
            position: 'relative'
            }}
            onMouseEnter={()=>setOver(true)}
            onMouseLeave={()=>setOver(false)}
        >
            <Grid.Row>
                <Grid.Column width='8'>
                    {!editable && <p style={{color: color}}>{text}</p>}
                    {editable && <textarea defaultValue={text} onChange={(e) => updateModule({text: e.target.value})} style={{
                        width: '100%', 
                        height: '100%', 
                        backgroundColor: 'transparent', 
                        border: 'none', 
                        resize: 'none',
                        color: color}} />}
                </Grid.Column>
                <Grid.Column width='8'>
                    {!editable && <Image src={imageURL} />}
                    {editable &&
                    <>
                        <label htmlFor={`fileInput_${index}`} style={{ cursor: 'pointer'}}>
                            <Image src={imageURL} />
                        </label>
                        <input type='file' id={`fileInput_${index}`} style={{ display: 'none' }} accept="image/*"
                            onChange={(e) => {
                                if (e.target.files[0])
                                    handleImage(e.target.files[0])
                            }} />
                    </>
                    }
                </Grid.Column>
            </Grid.Row>
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
        </Grid>
    )
};

export default ImageRightTextModule;