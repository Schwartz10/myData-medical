const NoteOwnership = artifacts.require("./NoteOwnership.sol");

contract('NoteOwnership', function(accounts) {
  let noteOwnershipInstance;
  before('create patient notes', async () => {
    noteOwnershipInstance = await NoteOwnership.deployed();
    await noteOwnershipInstance.createNote(8, "metaData1", "male", "DATA", {from: accounts[0]})
    await noteOwnershipInstance.createNote(54, "metaData2", "female", "DATA2", {from: accounts[0]})
    await noteOwnershipInstance.createNote(4, "metaData3", "male", "DATA5", {from: accounts[0]})
    await noteOwnershipInstance.createNote(4, "metaData4", "female","DATA1", {from: accounts[1]})
    await noteOwnershipInstance.createNote(100, "metaData5", "female","DATA100", {from: accounts[2]})
  })

  it("should get the total notes by owner", async () => {
    let storedDefaultAccountData = await noteOwnershipInstance.getNotesByOwner.call(accounts[0]);
    assert.isArray(storedDefaultAccountData, true, "array should be returned from getNotesByOwner");
    assert.equal(storedDefaultAccountData.length, 3, "Wrong number of notes per default account");

    let storedSecondaryAccountData = await noteOwnershipInstance.getNotesByOwner.call(accounts[1]);
    assert.equal(storedSecondaryAccountData.length, 1, "Wrong number of notes per secondary account");

    let storedThirdAccountData = await noteOwnershipInstance.getNotesByOwner.call(accounts[2]);
    assert.equal(storedThirdAccountData.length, 1, "Wrong number of notes per third account");

    let storedFourthAccountData = await noteOwnershipInstance.getNotesByOwner.call(accounts[3]);
    assert.equal(storedFourthAccountData.length, 0, "Wrong number of notes per fourth account");
  })

  it("should get the correct note data given a tokenId", async () => {
    let note = await noteOwnershipInstance.getNote.call(0);
    // expects age to come back as a big number object, converts it to a number
    note[0] = note[0].c[0];
    note[1] = note[1].c[0];
    let expected = [ 8, 0, "metaData1", "male","DATA",accounts[0] ];
    assert.deepEqual(note, expected, "wrong note");
  })

  it("should get the total tokens owned by owner", async () => {
    let defaultAccountTokenBalance = await noteOwnershipInstance.balanceOf.call(accounts[0]);
    assert.equal(defaultAccountTokenBalance, 3, "Wrong number of notes per default account");

    let secondaryAccountTokenBalance = await noteOwnershipInstance.balanceOf.call(accounts[1]);
    assert.equal(secondaryAccountTokenBalance, 1, "Wrong number of notes per secondary account");

    let storedThirdAccountData = await noteOwnershipInstance.balanceOf.call(accounts[2]);
    assert.equal(storedThirdAccountData, 1, "Wrong number of notes per third account");
  })

  xit("should find the correct owner of a token", async () => {
    const tokenOwner = await noteOwnershipInstance.ownerOf.call(1);
    assert.equal(tokenOwner, accounts[0], "expected a different owner");
  })

  xit("should transfer tokens properly", async () => {
    await noteOwnershipInstance.transfer(accounts[1], 1);
    const tokenOwner = await noteOwnershipInstance.ownerOf.call(1);
    assert.equal(tokenOwner, accounts[1], "token did not transfer properly");
    assert.notEqual(tokenOwner, accounts[0], "token did not transfer properly");
  })

  xit("should revert transactions that violate the onlyOwnerOf modifier", async () => {
    await noteOwnershipInstance.transfer(accounts[1], 0, {from: accounts[1]})
    const tokenOwner = await noteOwnershipInstance.ownerOf.call(0);
    assert.equal(tokenOwner, accounts[0], "token transferred when it shouldn't have");
  })

  xit("should properly approve tokens", async () => {
    await noteOwnershipInstance.approve(accounts[0], 2);
    const isApproved = await noteOwnershipInstance.isApproved.call(2);
    assert.equal(isApproved, true, "token was not approved correctly");
    const isNotApproved = await noteOwnershipInstance.isApproved.call(1);
    assert.equal(isNotApproved, false, "token was not approved correctly");
  })

  xit("should properly transfer ownership when an approved address takes it, and clear the Approval for the token",
  async () => {
    await noteOwnershipInstance.takeOwnership(2);
    const tokenOwner = await noteOwnershipInstance.ownerOf.call(2);
    assert.equal(tokenOwner, accounts[0], "token should not have transferred");
    const isApproved = await noteOwnershipInstance.isApproved.call(2);
    assert.equal(isApproved, false, "token's approval was not cleared");
  })

  xit("should not allow people to approve tokens they don't own", async () => {
    await noteOwnershipInstance.approve(accounts[0], 4);
    const isApproved = await noteOwnershipInstance.isApproved.call(4);
    assert.equal(isApproved, false, "token should not have transferred");
  })

  xit("should not allow people to take ownership of tokens they aren't approved for", async () => {
    await noteOwnershipInstance.takeOwnership(4);
    const tokenOwner = await noteOwnershipInstance.ownerOf.call(4);
    assert.equal(tokenOwner, accounts[2], "token should not have transferred");
  })
});
