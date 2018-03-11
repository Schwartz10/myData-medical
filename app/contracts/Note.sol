pragma solidity ^0.4.19;

import "../node_modules/zeppelin-solidity/ownership/Ownable.sol";
import "../node_modules/zeppelin-solidity/math/SafeMath.sol";

contract Note is Ownable {
  // @dev using SafeMath for all uints to avoid over/underflow
  using SafeMath for uint256;

  event NewNote(uint256 noteId, string gender, uint8 age, address creator);

  // @param a note represents medical data for each patient - eventually patients will be able to publicize and privatize certain aspects of their data
  struct Note {
    uint8 age;
    string gender;
    string encryptedData;
    address creater;
  }

  // @param to keep track of all the notes created in this smart contract
  Note[] public notes;

  // @dev we can find and update the note's owner // owner's note count on creation and on transfer events
  mapping (uint => address) noteToOwner;
  mapping(address => uint) ownerNoteCount;

  // @notice we make this function internal because we might want to add extra validations
  function _createNote(uint8 _age, string _gender, string _encryptedData) internal {
    uint id = notes.push(Note(_age, _gender, _encryptedData, msg.sender)) - 1;
    noteToOwner[id] = msg.sender;
    ownerNoteCount[msg.sener] = ownerNoteCount[msg.sender].add(1);
  }

  function createNote(uint8 _age, string _gender, string _encryptedData) public {
    // @notice we can add require statements in the future about the msg.sender to make sure he or she isn't restricted for some reason here
    _createNote(_age, _gender, _encryptedData);
    NewNote(_age, _gender, _encryptedData, msg.sender);
  }
}
