pragma solidity ^0.4.15;

import "zeppelin-solidity/contracts/crowdsale/CappedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/RefundableCrowdsale.sol";
import "zeppelin-solidity/contracts/token/MintableToken.sol";

contract FuckNazisPin is MintableToken {

  string public constant name = "Fuck Nazis Virtual Lapel Pins";
  string public constant symbol = "FNZ";
  string public constant pgp = "CD70 C831 45D9 CE81 374B 41BD 1B68 7EE9 FA36 F19C";
  string public constant site = "https://fucknazis.us";
  uint8 public constant decimals = 18;

}

