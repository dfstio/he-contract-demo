import {
  Group,
  PublicKey,
  Scalar,
  PrivateKey,
  Field,
  Struct,
  Circuit,
  Experimental,
} from "o1js";
import { modExp } from "./lib";

export { ElGamalECC, ElGamalFF, Cipher };
/**
 * ElGamal over an elliptic curve.
 */
class ElGamalECC {
  private static G = Group.generator;

  static encrypt(msg: Group, y: PublicKey) {
    let k = Experimental.memoizeWitness(Scalar, Scalar.random);
    return {
      c: this.G.scale(k),
      d: y.toGroup().scale(k).add(msg),
    };
  }

  static decrypt({ c, d }: { c: Group; d: Group }, priv: PrivateKey) {
    let x = priv.s;
    let c_ = c.scale(x);
    let pm = d.sub(c_);
    return pm;
  }
}

class Cipher extends Struct({
  c1: Field,
  c2: Field,
}) {
  mul(c2: Cipher): Cipher {
    return new Cipher({ c1: this.c1.mul(c2.c1), c2: this.c2.mul(c2.c2) });
  }
}

/**
 * ElGamal over a finite field.
 */
class ElGamalFF {
  public static G = Field(
    "12418654782883325593414442427049395787963493412651469444558597405572177144507"
  );

  /**
   * Generate a key pair used for encrypting and decrypting.
   */
  static generateKeys(): {
    pk: Field;
    sk: Field;
  } {
    let x = Experimental.memoizeWitness(Field, Field.random);

    let h = modExp(this.G, x);

    return {
      pk: h,
      sk: x,
    };
  }

  /**
   * Encrypts a Field element, with a public key `h`.
   * @param m Message
   * @param h Public key
   */
  static encrypt(m: Field, h: Field): Cipher {
    let y = Experimental.memoizeWitness(Field, Field.random);

    let s = modExp(h, y);
    let c1 = modExp(this.G, y);
    let c2 = m.mul(s);

    return new Cipher({ c1, c2 });
  }

  /**
   * Decrypts a cipher text, with a private key `x`.
   * @param m Message
   * @param h Public key
   */
  static decrypt({ c1, c2 }: Cipher, x: Field) {
    let s = modExp(c1, x);
    let s_ = s.inv();

    let m = c2.mul(s_);
    return m;
  }
}
