import React, { useState, useEffect, Fragment } from "react";
import PianoButton from '../PianoButton/PianoButton';
import getNoteKeyboard from '../../constants/getNoteKeyboard';

const useAudio = () => {
    const [audio, setAudio] = useState(null);
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    const setNote = (note) => setAudio(new Audio('http://127.0.0.1:3030/note/' + note.replace('#', '_'))) ;

    useEffect(() => {
        if (audio && playing) {
            audio.play();
        }
    },
        [playing, audio]
    );

    return [playing, toggle, setNote];
};


const Player = ({ notesRange, keyboardMap, isRecording, startPlaying, setPlaying, isPlaying, recordedNotes, setRecordedNotes}) => {
    const [playing, toggle, setNote] = useAudio(null);
    const [playingNotes, setPlayingNotes] = useState([]);
    const [startDate, setStartDate] = useState(null);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    }, []);

    useEffect(() => {
        if (isRecording) {
            setRecordedNotes([]);
            setStartDate(new Date());
        }
        else {
            setStartDate(new Date());
        }
    }, [isRecording]);


    const convertNoteFromKey = (keyboardKey) => {
        return keyboardMap[keyboardKey.toUpperCase()];
    };

    const handleKeyDown = (key) => {
        if (!key.repeat) {
            const note = convertNoteFromKey(key.key);
            if (note) {
                if (isRecording) {
                    const curDate = new Date();
                    setRecordedNotes([...recordedNotes, { key: key.key, note, time: curDate - startDate, action: 'down' }]);
                }
                setPlayingNotes([...playingNotes, note]);
                console.log(note);
                setNote(note);
                toggle();
            }
        }
    };

    const handleKeyUp = (key) => {
        if (!key.repeat) {
            if (isRecording) {
                const curDate = new Date();
                console.log('-')
                console.log(recordedNotes);
                setRecordedNotes([...recordedNotes, { key: key.key, time: curDate - startDate, action: 'up' }]);
            }
            const note = convertNoteFromKey(key.key);
            if (note) {
                setPlayingNotes(playingNotes.filter(playingNote => playingNote !== note));
                toggle();
            }
        }
    }

    const getKeyBoardKey = (text) => {
        const textArray = text.split('-');
        return textArray[1];
    }

    const onPlayNoteStart = (e) => {
        if (!e.repeat) {
            const text = e.target.innerText.toLowerCase();
            const key = getKeyBoardKey(text);
            handleKeyDown({ key })
        }
    };

    const onPlayNoteEnd = (e) => {
        if (!e.repeat) {
            const text = e.target.innerText.toLowerCase();
            const key = getKeyBoardKey(text);
            handleKeyUp({ key });
        }
    };
    const hangePlayingState = () => {
        setPlaying(!isPlaying);
        console.log(recordedNotes);
        recordedNotes.map((data) => {
            console.log(data);
            setTimeout(() => {
                if (data.action === 'down') {
                    handleKeyDown({ key: data.key })
                } else {
                    handleKeyUp({ key: data.key })
                }
            }, data.time)
        })
        if (recordedNotes.length > 0)
        setTimeout(() => {
            setPlaying(!isPlaying);
        }, recordedNotes[recordedNotes.length - 1].time)
    }

    useEffect(() => {
        hangePlayingState();
    }, [startPlaying]);

    return (
        <>
            {
                notesRange.map(note => (
                    <Fragment key={note}>
                        <PianoButton
                            note={note}
                            playing={playingNotes.includes(note)}
                            startPlayingNote={onPlayNoteStart}
                            stopPlayingNote={onPlayNoteEnd}
                            keyboardShortcut={getNoteKeyboard(keyboardMap, note)}
                        />
                    </Fragment>
                ))
            }
        </>
    );
};

export default Player;