var PatientNotes = artifacts.require("./PatientNotes.sol");

contract('PatientNotes', function(accounts) {
  let patientNotesInstance;
  beforeEach('set up patient notes', async () => {
    patientNotesInstance = await PatientNotes.deployed();
    await patientNotesInstance.createNote(8, "male", "DATA", {from: accounts[0]})
    await patientNotesInstance.createNote(54, "female", "DATA2", {from: accounts[0]})
    await patientNotesInstance.createNote(4, "male", "DATA5", {from: accounts[0]})
  })

  it("should get the total notes by owner", async () => {
    let storedDefaultAccountData = await patientNotesInstance.getNotesByOwner.call(accounts[0]);
    assert.isArray(storedDefaultAccountData, true, "array should be returned from getNotesByOwner");
    assert.equal(storedDefaultAccountData.length, 3, "Wrong number of notes per default account");
    let storedSecondaryAccountData = await patientNotesInstance.getNotesByOwner.call(accounts[1]);
    assert.equal(storedSecondaryAccountData.length, 0, "Wrong number of notes per secondary account");
  })

  it("should get the correct note data given a tokenId", async () => {
    let note = await patientNotesInstance.getNote.call(0);
    // expects age to come back as a big number object, converts it to a number
    note[0] = note[0].c[0];
    let expected = [ 8,"male","DATA",accounts[0] ];
    assert.deepEqual(note, expected, "wrong note");
  })
});
