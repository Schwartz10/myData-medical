const PatientNotes = artifacts.require("./PatientNotes.sol");

module.exports = function(deployer) {
  deployer.deploy(PatientNotes);
};

// this syntax will allow you to migrate your contracts to the blockchain in the truffle config file, by running truffle migrate
