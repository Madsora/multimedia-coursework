import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

import './RecordButton.scss'

const RecordButton = ({ setRecording, isRecording }) => {
    return <Button className={ isRecording ? 'recording' : ''} onClick={() => setRecording(!isRecording)} variant="danger">
        <FontAwesomeIcon icon={faCircle} />
    </Button>
}

export default RecordButton;