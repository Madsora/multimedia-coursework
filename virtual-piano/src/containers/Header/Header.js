import React from 'react';
import DownloadButton from '../../components/DownloadButton/DownloadButton';
import PlayButton from '../../components/PlayButton/PlayButton';
import RecordButton from '../../components/RecordButton/RecordButton';
import './Header.scss';

const Header = ({isRecording, setRecording, isPlaying, startPlaying, setStartPlaying, recordedNotes}) => {
    return <div className="top-part">
        <div className='header'>
            <header>VIRTUAL PIANO</header>
            <div className="buttons-block">
                <DownloadButton recordedNotes={recordedNotes}/>
                <PlayButton setStartPlaying={setStartPlaying} isPlaying={isPlaying} startPlaying={startPlaying}/>
                <RecordButton setRecording={setRecording} isRecording={isRecording}/>
            </div>
        </div>
    </div>
}

export default Header;