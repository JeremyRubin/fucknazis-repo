require('babel-polyfill');
const {promisify} = require('util');
var FuckNazisPin = artifacts.require("./FuckNazisPin.sol");
var FuckNazisPinSale = artifacts.require("./FuckNazisPinSale.sol");
function u_mine(cb) {
    web3.currentProvider.sendAsync({method: "evm_mine"}, cb);
}
const mine = promisify(u_mine);
const BLOCKS = 10;
contract('FuckNazisPinSale', accounts =>
        it("Check that FuckNazisPinSale: 1) has the right exchange rates 2) gives founder's reward 3) ends at the right time",async function () {
            var Sale = await FuckNazisPinSale.deployed();
            var Pins = FuckNazisPin.at(await Sale.token());

            // Check that the ownership is correct...
            assert.equal(await Sale.wallet(), await Sale.owner(), "The owner should be the wallet");

            // Read the balance before money gets sent in
            let balance_presale =  await web3.eth.getBalance(await Sale.wallet());

            // Buy 300 pins
            await Sale.send(web3.toWei(1, "ether"), accounts[0]);

            // Check that pins can be purchased
            {
                let pins = await Pins.balanceOf.call(accounts[0]);
                assert.equal(pins.valueOf(), 300e18, "300.000000000000000000 pins weren't in the purchaser's account");
            }

            // Check that pins are paid for
            {
                let balance = await web3.eth.getBalance(await Sale.wallet());
                assert.equal(balance.valueOf() - balance_presale.valueOf(), 1e18, "+1 ether wasn't in the creators's account");
            }

            // Check that finalization can't occur early
            try {
                await Sale.finalize({from: await Sale.wallet()});
                throw Error(-101);
            } catch (e) {
                assert.equal(e.message, "VM Exception while processing transaction: invalid opcode");
            }

            for (var i = 0; i < BLOCKS; ++i) {
                await mine();
            }

            // Check that before finalization have no pins
            {
                let pins = await Pins.balanceOf.call(await Sale.wallet());
                assert.equal(pins.valueOf(), 0, "> 0 pins weren't in the creators's account");
            }


            // Actually finalize
            await Sale.finalize({from: await Sale.wallet()});

            // Check that after finalization 30 pins are present
            {
                let pins = await Pins.balanceOf.call(await Sale.wallet());
                assert.equal(pins.valueOf(), 30*(1e18), "30 pins weren't in the creators's account");
            }
        })
);



contract('FuckNazisPinSale', function(accounts) {
    it("should send coin correctly", async function() {
        var meta;

        // Get initial balances of first and second account.
        var account_one = accounts[0];
        var account_two = accounts[1];


        var amount = 10;

        var Sale = await FuckNazisPinSale.deployed();
        let Pins = FuckNazisPin.at(await Sale.token());

        await Sale.send(web3.toWei(1, "ether"), account_one);
        let balance_1 = await Pins.balanceOf.call(account_one);
        let account_one_starting_balance = balance_1.valueOf();
        let balance_2 = Pins.balanceOf.call(account_two);
        let account_two_starting_balance = balance_2.valueOf();
        await Pins.transfer(account_two, amount, {from: account_one});
        let account_one_ending_balance = await Pins.balanceOf.call(account_one);
        let account_two_ending_balance = await Pins.balanceOf.call(account_two);

        assert.equal(account_one_ending_balance.valueOf(), account_one_starting_balance - 10, "Balance was not as expected");
        assert.equal(account_two_ending_balance.valueOf(), 10, "Balance was not as expected");
    });
});


