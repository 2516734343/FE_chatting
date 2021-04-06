import { observable, computed, action } from 'mobx';
import { makeObservable } from "mobx";

class StoreClass {
  @observable data;
  constructor() {
    makeObservable(this)
    this.data = [];
  }
  @action.bound
  setValue = (data) => {
    this.data = [...data];
    // console.log(data);
  }
}
const Store = new StoreClass();

export default Store;