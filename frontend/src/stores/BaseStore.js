import { observable, action, computed, configure, flow } from "mobx";
import _ from "lodash";

configure({ enforceActions: "observed" });

export default class BaseStore {
  @observable logged = false;

  constructor(root) {
    this.root = root;
  }

  @action setLogged = logged => {
    this.logged = logged;
  };

  @computed get getLogged() {
    return this.logged;
  }

  /*
  //원본
  @observable products = [];
  @observable selectedProduct = {};

  constructor(root) {
    this.root = root;
  }

  @computed get selectedId() {
    return this.selectedProduct._id;
  }

  @action setProducts = products => {
    this.products = [...products];
  };
  @action selectProduct = product => {
    this.selectProduct = product;
  };

    getProducts = flow(function*(category, effect, page) {
      this.products = [];
      try {
        const result = yield flexibleAPI({
          method: "post",
          uri: "product/fitsearch",
          data: {
            category,
            effect,
            page,
            viewCount: 10
          }
        });

        const { data } = result.data.data;
        this.products = _.concat(this.products, data);
      } catch (error) {
        console.error(error);
      }
    });

    */
}
