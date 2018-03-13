pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/NoteOwnership.sol";

contract TestNoteOwnership {

  NoteOwnership noteOwnership = NoteOwnership(DeployedAddresses.NoteOwnership());

  // function testItGetsBalanceOf() public {
  //   noteOwnership.createNote(8, "male", "DATA");

  //   uint expected = 1;

  //   Assert.equal(noteOwnership.balanceOf(tx.origin), expected, "It should get the balance of a contract");
  // }

}
