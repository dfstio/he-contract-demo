import { describe, expect, it } from "@jest/globals";
import {
  Field,
  PrivateKey,
  PublicKey,
  Mina,
  Reducer,
  AccountUpdate,
} from "o1js";
import { EncryptedValue, SecureMultiplication } from "../src/contract";
import { generateKeys, encrypt, decrypt } from "../src/he";
import { initBlockchain, fee } from "zkcloudworker";

const useLocalBlockchain = false;

describe("Contract", () => {
  let pk = Field.fromJSON(
    "15865883191285987755948956560778653675137481280032856828828401582741862742833"
  );
  let sk = Field.fromJSON(
    "3404594142577636973266388389713282759042060039560572020818253215122249612915"
  );
  let deployer: PrivateKey | undefined = undefined;
  if (useLocalBlockchain) {
    const Local = Mina.LocalBlockchain();
    Mina.setActiveInstance(Local);
    deployer = Local.testAccounts[0].privateKey;
  } else {
    initBlockchain("berkeley");
    deployer = PrivateKey.fromBase58(
      "EKE1Ci9u5HsYnzEpCzrXZH92PnLoemLRJ8deBARY9MSnasr9zHfm"
    );
  }
  const sender = deployer.toPublicKey();
  const privateKey = PrivateKey.random();
  const publicKey = privateKey.toPublicKey();
  const zkApp = new SecureMultiplication(publicKey);
  console.log("zkApp address:", publicKey.toBase58());

  it(`should compile contract`, async () => {
    await SecureMultiplication.compile();
  });

  it("should deploy the contract", async () => {
    expect(deployer).toBeDefined();
    expect(sender).toBeDefined();
    if (deployer === undefined || sender === undefined) return;
    const initialValue = encrypt(Field(1), pk);
    const tx = await Mina.transaction({ sender, fee: await fee() }, () => {
      AccountUpdate.fundNewAccount(sender);
      zkApp.deploy({});
      zkApp.pk.set(pk);
      zkApp.actionState.set(Reducer.initialActionState);
      zkApp.value.set(initialValue);
      zkApp.one.set(initialValue);
    });
    const txResult = await tx.sign([deployer, privateKey]).send();
    console.log("tx sent:", txResult.hash());
  });
});
