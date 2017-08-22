var FuckNazisPinSale = artifacts.require("./FuckNazisPinSale.sol");

let schedule = {development: 10, live: 122200}
module.exports = function(deployer, networks, accounts) {

    let owner = {development: accounts[1], live: "0x32e47bd182F6c766f6edAEa9F4aA990F4e326273"}
    console.info("Will be purchasable over approximately" + (schedule[networks]*21.5/60/60/24) + " days.");
    deployer.deploy(FuckNazisPinSale, owner[networks], schedule[networks]);
};
