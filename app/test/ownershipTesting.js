const NoteOwnership = artifacts.require("./NoteOwnership.sol");

contract('NoteOwnership', function(accounts) {
  let noteOwnershipInstance;
  before('create patient notes', async () => {
    noteOwnershipInstance = await NoteOwnership.deployed();
    await noteOwnershipInstance.createNote(8, "male", "DATA", {from: accounts[0]})
    await noteOwnershipInstance.createNote(54, "female", "DATA2", {from: accounts[0]})
    await noteOwnershipInstance.createNote(4, "male", "DATA5", {from: accounts[0]})
    await noteOwnershipInstance.createNote(4, "female","DATA1", {from: accounts[1]})
  })

  it("should get the total notes by owner", async () => {
    let storedDefaultAccountData = await noteOwnershipInstance.getNotesByOwner.call(accounts[0]);
    assert.isArray(storedDefaultAccountData, true, "array should be returned from getNotesByOwner");
    assert.equal(storedDefaultAccountData.length, 3, "Wrong number of notes per default account");
    let storedSecondaryAccountData = await noteOwnershipInstance.getNotesByOwner.call(accounts[1]);
    assert.equal(storedSecondaryAccountData.length, 1, "Wrong number of notes per secondary account");
    let storedThirdAccountData = await noteOwnershipInstance.getNotesByOwner.call(accounts[2]);
    assert.equal(storedThirdAccountData.length, 0, "Wrong number of notes per third account");
  })

  it("should get the correct note data given a tokenId", async () => {
    let note = await noteOwnershipInstance.getNote.call(0);
    // expects age to come back as a big number object, converts it to a number
    note[0] = note[0].c[0];
    let expected = [ 8,"male","DATA",accounts[0] ];
    assert.deepEqual(note, expected, "wrong note");
  })

  it("should get the total tokens owned by owner", async () => {
    let defaultAccountTokenBalance = await noteOwnershipInstance.balanceOf.call(accounts[0]);
    assert.equal(defaultAccountTokenBalance, 3, "Wrong number of notes per secondary account");
    let secondaryAccountTokenBalance = await noteOwnershipInstance.balanceOf.call(accounts[1]);
    assert.equal(secondaryAccountTokenBalance, 1, "Wrong number of notes per secondary account");
    let storedThirdAccountData = await noteOwnershipInstance.balanceOf.call(accounts[2]);
    assert.equal(storedThirdAccountData, 0, "Wrong number of notes per third account");
  })

  it("should find the correct owner of a token", async () => {
    const tokenOwner = await noteOwnershipInstance.ownerOf.call(1);
    assert.equal(tokenOwner, accounts[0], "expected a different owner");
  })

  it("should transfer tokens properly", async () => {
    await noteOwnershipInstance.transfer(accounts[1], 1);
    const tokenOwner = await noteOwnershipInstance.ownerOf.call(1);
    assert.equal(tokenOwner, accounts[1], "token did not transfer properly");
    assert.notEqual(tokenOwner, accounts[0], "token did not transfer properly");
  })

  /*
  This test below should test the onlyOwnerOf modifier to make sure it's doing it's job, but I haven't figure out the correct syntax to do so yet

  it("should not allow for token transfer by accounts without ownership", async () => {
    await noteOwnershipInstance.transfer(accounts[1], 1, {from: accounts[1]});
    const tokenOwner = await noteOwnershipInstance.ownerOf.call(1);
    assert.equal(tokenOwner, accounts[1], "token did not transfer properly");
    assert.notEqual(tokenOwner, accounts[0], "token did not transfer properly");
  })
  */

  it("should properly approve tokens", async () => {
    await noteOwnershipInstance.approve(accounts[0], 2);
    const isApproved = await noteOwnershipInstance.isApproved.call(2);
    assert.equal(isApproved, true, "token was not approved correctly");
    const isNotApproved = await noteOwnershipInstance.isApproved.call(1);
    assert.equal(isNotApproved, false, "token was not approved correctly");
  })

  // this test DOES NOT properly test the takeOwnership function because we (as far as I have researched) have no way of approving a token for someone other than accounts[0]. We do however, still see the event logged and it appears as though all is working properly
  it("should properly transfer ownership when an approved address takes it, and clear the Approval for the token",
  async () => {
    await noteOwnershipInstance.takeOwnership(2);
    const tokenOwner = await noteOwnershipInstance.ownerOf.call(2);
    assert.equal(tokenOwner, accounts[0], "token did not transfer properly");
    const isApproved = await noteOwnershipInstance.isApproved.call(2);
    assert.equal(isApproved, false, "token's approval was not cleared");
  })
});
