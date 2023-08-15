var WEATokenContract = artifacts.require("WEAToken");
var WEAFileContract = artifacts.require("WEAFile");

module.exports = function (_deployer) {
  _deployer.deploy(WEATokenContract, 1000).then(function () {
    return _deployer.deploy(WEAFileContract, WEATokenContract.address);
  });
};