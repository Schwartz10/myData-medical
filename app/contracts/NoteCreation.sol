pragma solidity ^0.4.18;

import "./Payable.sol";
import "../node_modules/zeppelin-solidity/contracts/math/SafeMath.sol";

contract NoteCreation is Payable {
  // @dev using SafeMath for all uints to avoid over/underflow
  using SafeMath for uint256;

  event NewNote(uint256 noteId, uint8 age, string metaData, string gender, string encryptedData, address creator);

  // @param a note represents medical data for each patient - eventually patients will be able to publicize and privatize certain aspects of their data
  struct Note {
    uint8 age;
    string metaData;
    string gender;
    string encryptedData;
    address creator;
  }

  // @param to keep track of all the notes created in this smart contract
  Note[] public notes;

  // @dev we can find and update the note's owner // owner's note count on creation and on transfer events
  mapping(uint => address) noteToOwner;
  mapping(address => uint) ownerNoteCount;

  // @notice we make this function internal because we might want to add extra validations
  function _createNote(uint8 _age, string _metaData, string _gender, string _encryptedData) internal {
    uint id = notes.push(Note(_age, _metaData, _gender, _encryptedData, msg.sender)) - 1;
    noteToOwner[id] = msg.sender;
    ownerNoteCount[msg.sender] = ownerNoteCount[msg.sender].add(1);
    NewNote(id, _age, _metaData, _gender, _encryptedData, msg.sender);
  }

  function createNote(uint8 _age, string _metaData, string _gender, string _encryptedData) external payable {
    // @user we create a pay what you want structure for medical tokens
    // @notice we can add require statements in the future about the msg.sender to make sure he or she isn't restricted for some reason here
    _createNote(_age, _metaData, _gender, _encryptedData);
  }
}
