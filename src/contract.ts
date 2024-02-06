import {
  Field,
  state,
  State,
  method,
  SmartContract,
  DeployArgs,
  Reducer,
  Permissions,
  Struct,
  PublicKey,
  UInt8,
} from "o1js";

export const MAX_USERS = 6;

export class EncryptedValue extends Struct({
  encryptedValue1: Field,
  encryptedValue2: Field,
}) {}

export class SecureMultiplication extends SmartContract {
  @state(EncryptedValue) value = State<EncryptedValue>();
  @state(EncryptedValue) one = State<EncryptedValue>();
  @state(Field) pk = State<Field>();
  @state(Field) actionState = State<Field>();

  deploy(args: DeployArgs) {
    super.deploy(args);
    this.account.permissions.set({
      ...Permissions.default(),
      editState: Permissions.proof(),
    });
  }

  reducer = Reducer({
    actionType: EncryptedValue,
  });

  events = {
    multiply: EncryptedValue,
  };

  @method multiply(encryptedValue: EncryptedValue) {
    this.reducer.dispatch(encryptedValue);
    this.emitEvent("multiply", encryptedValue);
  }

  @method reset() {
    this.value.set(this.one.getAndRequireEquals());
  }

  @method calculate() {
    const actionState = this.actionState.getAndRequireEquals();
    const value = this.value.getAndRequireEquals();

    const pendingActions = this.reducer.getActions({
      fromActionState: actionState,
    });
    const { state: newValue, actionState: newActionState } =
      this.reducer.reduce(
        pendingActions,
        EncryptedValue,
        (state: EncryptedValue, action: EncryptedValue) => {
          return new EncryptedValue({
            encryptedValue1: state.encryptedValue1.mul(action.encryptedValue1),
            encryptedValue2: state.encryptedValue2.mul(action.encryptedValue2),
          });
        },
        {
          state: value,
          actionState: actionState,
        },
        { maxTransactionsWithActions: MAX_USERS }
      );
    this.value.set(newValue);
    this.actionState.set(newActionState);
  }
}
