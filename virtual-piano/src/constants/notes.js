const TONES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const OCTAVES = [1, 2, 3, 4, 5, 6, 7];

let notes = [];

OCTAVES.forEach((octave) => {
  const notesInOctave = TONES.map(tone => `${tone}${octave}`);
  notes.push(...notesInOctave);
}, []);

export default notes;
