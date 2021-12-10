import NOTES from './notes'

const checkIfBlackKey = (note) => {
    return NOTES.includes(note) && note.includes('#')
}
export default checkIfBlackKey;