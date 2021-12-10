import React, { useState } from 'react';
import Header from '../containers/Header/Header';
import Piano from '../containers/Piano/Piano';
import './MainPage.scss';

const MainPage = () => {
  const [isRecording, setRecording] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [startPlaying, setStartPlaying] = useState(false);
  const [recordedNotes, setRecordedNotes] = useState([]);


  return <div className="main-page">
    <Header 
      setRecording={setRecording} 
      isRecording={isRecording} 
      isPlaying={isPlaying}
      startPlaying={startPlaying}
      setStartPlaying={setStartPlaying}
      recordedNotes={recordedNotes}
    />
    <Piano 
      isRecording={isRecording} 
      setPlaying={setPlaying} 
      startPlaying={startPlaying} 
      isPlaying={isPlaying} 
      recordedNotes={recordedNotes}
      setRecordedNotes={setRecordedNotes}
      />
  </div>
}

export default MainPage;