import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

import './DownloadButton.scss';

const DownloadButton = ({ recordedNotes }) => {
    const downloadBlob = (blob, filename) => {
        let a = document.createElement('a');
        a.download = filename;
        a.href = blob;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }

    const downloadMelody = () => {
        let url = 'http://127.0.0.1:3030/download/melody.mp3?notes=' + JSON.stringify(recordedNotes)
        while (url.includes('#')) {
            url = url.replace('#', '_')
        }
        window.open(url, "_blank")
    }

    return <Button variant="success"><FontAwesomeIcon icon={faDownload} onClick={downloadMelody} /></Button>
}

export default DownloadButton;