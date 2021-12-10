import React from 'react';
import { Button } from 'react-bootstrap';
import checkIfBlackKey from '../../constants/checkIfBlackKey'
import './PianoButton.scss';

const PlayButton = ({ note, playing, startPlayingNote, stopPlayingNote, keyboardShortcut }) => {
    const eventHandlers = {
        onMouseDown: startPlayingNote,
        onMouseUp: stopPlayingNote,
        onMouseOut: stopPlayingNote,
    };
    const isBlackKey = checkIfBlackKey(note);
    const whiteKey = () => (
        <Button {...eventHandlers} className={playing ? 'white-button-playing' : 'white-button'}><p className='button-text'>{note + '-' + keyboardShortcut}</p></Button>
    );
    const blackKey = () => (
        <div className='black-button-wrp' >
            <Button {...eventHandlers} key={note} className={playing ? 'black-button-playing' : 'black-button'}><p className='button-text'>{note + '-' + keyboardShortcut}</p></Button>
        </div>
    );

    return <>
        {
            isBlackKey ? blackKey() : whiteKey()
        }
    </>
}

export default PlayButton;