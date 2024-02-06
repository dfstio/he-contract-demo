import { Cloud, fee, initBlockchain } from "zkcloudworker";
import { SecureMultiplication, EncryptedValue } from "./src/contract";
import { PublicKey, Mina, fetchAccount, Field } from "o1js";

export async function compile(cloud: Cloud, args: string[]) {
  console.log("he: compile 5");
  await cloud.log("he: compile 5 (cloud log)");
  const deployer = await cloud.getDeployer();
  console.log("deployer", deployer.toBase58());

  console.time("compiled");

  const vk = (
    await SecureMultiplication.compile({ cache: cloud.cache })
  ).verificationKey.hash.toJSON();
  console.timeEnd("compiled");
  console.log("vk", vk);
  return vk;
}

export async function multiply(cloud: Cloud, args: string[]) {
  console.log("he: multiply", args);
  const timeStart = Date.now();
  try {
    await cloud.log("he: multiply (cloud log)");
    const deployer = await cloud.getDeployer();
    console.log("deployer", deployer.toBase58());
    initBlockchain("berkeley");
    console.time("compiled");
    const vk = (
      await SecureMultiplication.compile({ cache: cloud.cache })
    ).verificationKey.hash.toJSON();
    console.timeEnd("compiled");
    console.log("vk", vk);
    console.time("multiply");
    const zkAppAddress = PublicKey.fromBase58(args[0]);
    const zkApp = new SecureMultiplication(zkAppAddress);
    const sender = deployer.toPublicKey();
    const encryptedValue = new EncryptedValue({
      encryptedValue1: Field.fromJSON(args[1]),
      encryptedValue2: Field.fromJSON(args[2]),
    });
    await fetchAccount({ publicKey: zkAppAddress });
    await fetchAccount({ publicKey: sender });

    const tx = await Mina.transaction(
      { sender, fee: await fee(), memo: "he-demo" },
      () => {
        zkApp.multiply(encryptedValue);
      }
    );
    await tx.prove();
    const txResult = await tx.sign([deployer]).send();
    const hash = txResult.hash();
    console.timeEnd("multiply");

    return hash
      ? JSON.stringify(
          { hash, success: true, duration: Date.now() - timeStart },
          null,
          2
        )
      : JSON.stringify(
          {
            success: false,
            duration: Date.now() - timeStart,
            error: "no hash",
          },
          null,
          2
        );
  } catch (e: any) {
    console.error(e);
    return JSON.stringify(
      { success: false, duration: Date.now() - timeStart, error: e.toString() },
      null,
      2
    );
  }
}

export async function calculate(cloud: Cloud, args: string[]) {
  console.log("he: calculate", args);
  const timeStart = Date.now();
  try {
    await cloud.log("he: calculate (cloud log)");
    const deployer = await cloud.getDeployer();
    console.log("deployer", deployer.toBase58());
    initBlockchain("berkeley");
    console.time("compiled");
    const vk = (
      await SecureMultiplication.compile({ cache: cloud.cache })
    ).verificationKey.hash.toJSON();
    console.timeEnd("compiled");
    console.log("vk", vk);
    console.time("calculated");
    const zkAppAddress = PublicKey.fromBase58(args[0]);
    const zkApp = new SecureMultiplication(zkAppAddress);
    const sender = deployer.toPublicKey();

    await fetchAccount({ publicKey: zkAppAddress });
    await fetchAccount({ publicKey: sender });

    const tx = await Mina.transaction(
      { sender, fee: await fee(), memo: "he-demo" },
      () => {
        zkApp.calculate();
      }
    );
    await tx.prove();
    const txResult = await tx.sign([deployer]).send();
    const hash = txResult.hash();
    console.timeEnd("calculated");

    return hash
      ? JSON.stringify(
          { hash, success: true, duration: Date.now() - timeStart },
          null,
          2
        )
      : JSON.stringify(
          {
            success: false,
            duration: Date.now() - timeStart,
            error: "no hash",
          },
          null,
          2
        );
  } catch (e: any) {
    console.error(e);
    return JSON.stringify(
      { success: false, duration: Date.now() - timeStart, error: e.toString() },
      null,
      2
    );
  }
}

export async function reset(cloud: Cloud, args: string[]) {
  console.log("he: reset", args);
  const timeStart = Date.now();
  try {
    await cloud.log("he: calculate (cloud log)");
    const deployer = await cloud.getDeployer();
    console.log("deployer", deployer.toBase58());
    initBlockchain("berkeley");
    console.time("compiled");
    const vk = (
      await SecureMultiplication.compile({ cache: cloud.cache })
    ).verificationKey.hash.toJSON();
    console.timeEnd("compiled");
    console.log("vk", vk);
    console.time("reset");
    const zkAppAddress = PublicKey.fromBase58(args[0]);
    const zkApp = new SecureMultiplication(zkAppAddress);
    const sender = deployer.toPublicKey();

    await fetchAccount({ publicKey: zkAppAddress });
    await fetchAccount({ publicKey: sender });

    const tx = await Mina.transaction(
      { sender, fee: await fee(), memo: "he-demo" },
      () => {
        zkApp.reset();
      }
    );
    await tx.prove();
    const txResult = await tx.sign([deployer]).send();
    const hash = txResult.hash();
    console.timeEnd("reset");

    return hash
      ? JSON.stringify(
          { hash, success: true, duration: Date.now() - timeStart },
          null,
          2
        )
      : JSON.stringify(
          {
            success: false,
            duration: Date.now() - timeStart,
            error: "no hash",
          },
          null,
          2
        );
  } catch (e: any) {
    console.error(e);
    return JSON.stringify(
      { success: false, duration: Date.now() - timeStart, error: e.toString() },
      null,
      2
    );
  }
}
