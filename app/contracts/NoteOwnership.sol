pragma solidity ^0.4.18;

import "./PatientNotes.sol";
import "../node_modules/zeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../node_modules/zeppelin-solidity/contracts/math/SafeMath.sol";

contract NoteOwnership is ERC721, PatientNotes {
  using SafeMath for uint256;

  event Check(address _me, uint _tokenId, bool approved);

  // Mapping from token ID to approved address
  mapping (uint256 => address) private tokenApprovals;

  /**
  * @dev Guarantees msg.sender is owner of the given token
  * @param _tokenId uint256 ID of the token to validate its ownership belongs to msg.sender
  */
  modifier onlyOwnerOf(uint256 _tokenId) {
    require(ownerOf(_tokenId) == msg.sender);
    _;
  }

  /**
  * @dev Gets the balance of the specified address
  * @param _owner address to query the balance of
  * @return uint256 representing the amount owned by the passed address
  */
  function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerNoteCount[_owner];
  }

  /**
  * @dev Gets the list of tokens owned by a given address
  * @param _owner address to query the tokens of
  * @return uint256[] representing the list of tokens owned by the passed address
  */
  function ownerOf(uint256 _tokenId) public view returns (address _owner) {
    return noteToOwner[_tokenId];
  }

  /**
  * @dev Abstracts the transfer logic into its own function to use elsewhere
  * @param _from address sending token, _to address receiving the token with token _tokenId
  */
  function _transfer(address _from, address _to, uint256 _tokenId) private {
    ownerNoteCount[_to] = ownerNoteCount[_to].add(1);
    ownerNoteCount[msg.sender] = ownerNoteCount[msg.sender].sub(1);
    noteToOwner[_tokenId] = _to;
    Transfer(_from, _to, _tokenId);
  }

  /**
  * @dev implements the public transfer function
  */
  function transfer(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    _transfer(msg.sender, _to, _tokenId);
  }

  /**
  * @dev Approves an address to claim for the ownership of the given token ID
  * @param _to address to be approved for the given token ID
  * @param _tokenId uint256 ID of the token to be approved
  */
  function approve(address _to, uint256 _tokenId) public onlyOwnerOf(_tokenId) {
    require(tokenApprovals[_tokenId] != _to);
    tokenApprovals[_tokenId] = _to;
    Approval(msg.sender, _to, _tokenId);
  }

  /**
  * @dev Allows a user to see if he or she is approved for a token before attempting to claim ownership
  * @param _tokenId uint the token potentially approved to own
  * @notice - we don't allow people to check if others are approved to take tokens, but could be changed in the future
  */
  function isApproved(uint _tokenId) public view returns (bool _approved) {
    return tokenApprovals[_tokenId] == msg.sender;
  }
  /**
  * @dev Claims the ownership of a given token ID
  * @param _tokenId uint256 ID of the token being claimed by the msg.sender
  */
  function takeOwnership(uint256 _tokenId) public {
    require(tokenApprovals[_tokenId] == msg.sender);
    address owner = ownerOf(_tokenId);
    clearApproval(owner, _tokenId);
    _transfer(owner, msg.sender, _tokenId);
  }

  /**
  * @dev Internal function to clear current approval of a given token ID
  * @param _tokenId uint256 ID of the token to be transferred
  */
  function clearApproval(address _owner, uint256 _tokenId) private {
    require(ownerOf(_tokenId) == _owner);
    tokenApprovals[_tokenId] = 0;
    Approval(_owner, 0, _tokenId);
  }
}
