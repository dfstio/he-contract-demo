import { Field } from "o1js";
import { ElGamalFF, Cipher } from "./elgamal";
import { EncryptedValue } from "./contract";

export function encrypt(value: Field, pk: Field): EncryptedValue {
  const encryptedValue: Cipher = ElGamalFF.encrypt(value, pk);
  return new EncryptedValue({
    encryptedValue1: encryptedValue.c1,
    encryptedValue2: encryptedValue.c2,
  });
}

export function decrypt(encryptedValue: EncryptedValue, sk: Field): Field {
  const decryptedValue: Field = ElGamalFF.decrypt(
    new Cipher({
      c1: encryptedValue.encryptedValue1,
      c2: encryptedValue.encryptedValue2,
    }),
    sk
  );
  return decryptedValue;
}

export function generateKeys(): { pk: Field; sk: Field } {
  const keys = ElGamalFF.generateKeys();
  return { pk: keys.pk, sk: keys.sk };
}
