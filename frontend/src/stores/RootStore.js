import BaseStore from "./BaseStore";

class RootStore {
  constructor() {
    this.baseStore = new BaseStore(this);
  }
}

export default RootStore;
