pragma solidity ^0.4.18;
import "../node_modules/zeppelin-solidity/contracts/ownership/Ownable.sol";

contract Payable is Ownable {
  function withdraw() external onlyOwner {
    owner.transfer(this.balance);
  }
}
