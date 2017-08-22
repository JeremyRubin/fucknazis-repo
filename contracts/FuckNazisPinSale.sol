pragma solidity ^0.4.15;

import "./FuckNazisPin.sol";
import "zeppelin-solidity/contracts/crowdsale/CappedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/RefundableCrowdsale.sol";


contract FuckNazisPinSale is Crowdsale,  FinalizableCrowdsale{

    // (1 block /21.5 seconds) * 1 month = 122200
    // $300 USD / ETH --> 300 pins/eth 
    function FuckNazisPinSale(address _wallet, uint256 _n_blocks)
    FinalizableCrowdsale()
    Crowdsale(block.number, block.number + _n_blocks, 300, _wallet)
    {
    }

    function createTokenContract() internal returns (MintableToken) {
        return new FuckNazisPin();
    }

    // end token minting on finalization
    // override this with custom logic if needed
    function finalization() internal {
        uint256 weiAmount = weiRaised;
        // calculate token amount to be created
        uint256 tokens = weiAmount.mul(rate).div(10);
        token.mint(wallet, tokens);
        token.finishMinting();
    }

}
