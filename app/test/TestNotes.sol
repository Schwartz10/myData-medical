pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/PatientNotes.sol";

contract TestNotes {
  PatientNotes patientNotes = PatientNotes(DeployedAddresses.PatientNotes());

//   function testItCreatesANote() public {
//     NoteCreation noteCreation = NoteCreation(DeployedAddresses.NoteCreation());

//     noteCreation.createNote(8, "male", "DATA");
//     Note expected { age: 8, gender: "male", encryptedData: "DATA" }
}
