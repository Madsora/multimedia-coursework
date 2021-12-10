import json
from flask import Flask, send_file, request
import os
from datetime import datetime
from pydub import AudioSegment

app = Flask(__name__, static_url_path='')


if not os.path.exists('songs'):
    os.mkdir('songs')


def make_melody(melody):
    print(melody)
    duration = melody[-1]['time'] + 2000
    audio = AudioSegment.silent(duration=duration)
    for m in melody:
        note = m['note']
        note_audio = AudioSegment.from_wav(f'/home/anna/multimedia-cw/multimedia-coursework/virtual-piano/server/notesAudio/{note}.wav')
        audio = audio.overlay(note_audio, position=m['time'])

    melody_name = datetime.now().strftime('%H-%M-%S_%d-%m-%Y')
    print(melody_name)
    melody_path = f'/home/anna/multimedia-cw/multimedia-coursework/virtual-piano/server/songs/{melody_name}.mp3'
    audio.export(melody_path, format='mp3')
    print(melody_path)
    return melody_path

@app.route('/download/<path:fn>')
def send_song(fn):
    data = request.args.get('notes')
    melody = json.loads(data.replace('_', '#'))
    print(melody)
    melody = [m for m in melody if m['action'] == 'down']

    path = make_melody(melody)
    return send_file(path)


@app.route('/note/<note>')
def send_note(note):
    converted_note = note.replace('_', '#')
    path = f'/home/anna/multimedia-cw/multimedia-coursework/virtual-piano/server/notesAudio/{converted_note}.wav'
    return send_file(path)


app.run(port=3030)
