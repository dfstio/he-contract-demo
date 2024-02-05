import { describe, expect, it } from "@jest/globals";
import {
  Field,
  PrivateKey,
  PublicKey,
  Mina,
  Reducer,
  AccountUpdate,
} from "o1js";
import { EncryptedValue, SecureMultiplicator } from "../src/contract";
import { generateKeys, encrypt, decrypt } from "../src/he";

describe("Contract", () => {
  let sk: Field;
  let pk: Field;
  const Local = Mina.LocalBlockchain();
  Mina.setActiveInstance(Local);
  const deployer = Local.testAccounts[0].privateKey;
  const sender = deployer.toPublicKey();
  const privateKey = PrivateKey.random();
  const publicKey = privateKey.toPublicKey();
  const zkApp = new SecureMultiplicator(publicKey);

  it(`should compile contract`, async () => {
    await SecureMultiplicator.compile();
  });

  it("should generate keys", () => {
    const keys = generateKeys();
    sk = keys.sk;
    pk = keys.pk;
  });

  it("should deploy the contract", async () => {
    const initalValue = encrypt(Field(1), pk);
    const tx = await Mina.transaction({ sender }, () => {
      AccountUpdate.fundNewAccount(sender);
      zkApp.deploy({});
      zkApp.pk.set(pk);
      zkApp.actionState.set(Reducer.initialActionState);
      zkApp.value.set(initalValue);
    });
    await tx.sign([deployer, privateKey]).send();
  });

  it("should send the multiplicators", async () => {
    const values = [Field(2), Field(3), Field(4)];
    for (const value of values) {
      const tx = await Mina.transaction({ sender }, () => {
        zkApp.multiply(encrypt(value, pk));
      });
      await tx.prove();
      await tx.sign([deployer]).send();
    }
  });

  it("should calculate the result", async () => {
    const tx = await Mina.transaction({ sender }, () => {
      zkApp.calculate();
    });
    await tx.prove();
    await tx.sign([deployer]).send();
  });
  it("should decrypt the result", async () => {
    const result: EncryptedValue = zkApp.value.get();
    const decrypted = decrypt(result, sk);
    expect(decrypted).toEqual(Field(24));
  });
});
