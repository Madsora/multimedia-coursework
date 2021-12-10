import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

const PlayButton = ({ setStartPlaying, isPlaying, startPlaying }) => {
    return <Button className={ isPlaying ? 'playing' : ''} onClick={() => setStartPlaying(!startPlaying)} variant="primary"><FontAwesomeIcon icon={faPlay} /></Button>
}

export default PlayButton;