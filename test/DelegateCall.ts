import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("DelegateCall", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.

  let basicContract : any;
  let delegateContract : any;

  let testAccount : any;
  let testAccount2 : any;

  before('account setting', async () => {
    [testAccount, testAccount2] = await ethers.getSigners();
  })


  describe("Deployment", function () {
    it("Deploy Basic Contract", async () => {
      const Basic = await ethers.getContractFactory("Basic");
      basicContract = await Basic.connect(testAccount).deploy();
    })

    it("Deploy DelegateCall contract", async () => {
      const delegate = await ethers.getContractFactory("delegate");
      delegateContract = await delegate.connect(testAccount).deploy();
    })
  });

  describe("delegateCall Test", function () {
    it("basicContract num check", async () => {
      let num = await basicContract.connect(testAccount).num();
      console.log(num);
    });

    it("basicContract change num", async () => {
      await basicContract.connect(testAccount).setVars(1);
      let num = await basicContract.connect(testAccount).num();
      console.log("before basic num :",num);   
      let sender = await basicContract.connect(testAccount).sender();
      console.log("before basic sender :",sender);   
      let value = await basicContract.connect(testAccount).value();
      console.log("before basic value :",value);   
    })

    it("check delegate num", async () => {  
      let num = await delegateContract.connect(testAccount).num();
      console.log("before delegate num :",num);  
      let sender = await delegateContract.connect(testAccount).sender();
      console.log("before delegate sender :",sender);  
      let value = await delegateContract.connect(testAccount).value();
      console.log("before delegate value :",value);  
    })

    it("delegateContract test", async () => {
      await delegateContract.connect(testAccount2).setVars(basicContract.address,10);
      let num = await basicContract.connect(testAccount).num();
      console.log("basic num",num);      
      let num2 = await delegateContract.connect(testAccount).num();
      console.log("delegate num",num2);      
      let sender = await basicContract.connect(testAccount).sender();
      console.log("basic sender",sender);      
      let sender2 = await delegateContract.connect(testAccount).sender();
      console.log("delegate sender",sender2);      
      let value = await basicContract.connect(testAccount).value();
      console.log("basic value",value);      
      let value2 = await delegateContract.connect(testAccount).value();
      console.log("delegate value",value2);      
    })
  });
});
