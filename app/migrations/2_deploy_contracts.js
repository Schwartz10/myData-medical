const NoteOwnership = artifacts.require("./NoteOwnership.sol");

module.exports = function(deployer) {
  deployer.deploy(NoteOwnership);
};

// this syntax will allow you to migrate your contracts to the blockchain in the truffle config file, by running truffle migrate
