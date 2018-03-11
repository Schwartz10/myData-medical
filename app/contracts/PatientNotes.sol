pragma solidity ^0.4.19;
import "./Note.sol";
/*
This contract contains helper functions that allows us to collect a patient's notes
*/

contract PatientNotes is Note {

  // @dev: getNotesByOwner will return an array of indexes associated with the total notes array
  function getNotesByOwner(address _owner) external view returns(uint[]) {
    uint[] memory result = new uint[](ownerNoteCount[_owner]);
    uint counter = 0;
    for (uint i = 0; i < notes.length; i++) {
      if (noteToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }

  //@dev makes the frontend work a little simpler to use the array returned from getNotesByOwner
  function getNote(uint _noteId) external view returns (
    uint8 age,
    string gender,
    string encryptedData,
    address creator
  ) {
    Note storage note = notes[_noteId];

    age = note.age;
    gender = note.gender;
    encryptedData = note.encryptedData;
    creator = note.creator;
  }
}
