import { observable, makeObservable, action, makeAutoObservable } from "mobx";
class TownStore {
  townList = [];
  constructor() {
    makeAutoObservable(this, {
      townList: observable,
      getTown: action,
      addTown: action,
      deleteTown: action,
      updateTown: action,
    });
  }
  getTown = async () => {
    const response = await fetch("https://localhost:7130/api/Town", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      this.townList = await response.json();
      console.log(this.townList.length, "response.status===200");
      return this.townList;
    } else {
      return null;
    }
  };
  addTown = async (newTown) => {
    const response = await fetch("https://localhost:7130/api/Town", {
      method: "POST",
      body: JSON.stringify(newTown),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      this.townList = [...this.townList, newTown];
      console.log(this.townList.length, "response.status===200");
    }
    return;
  };
  deleteTown = async (id) => {
    console.log(id, "deleteTown");
    const response = await fetch(`https://localhost:7130/api/Town/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 204) {
      console.log(this.townList.length, "response.status===204");
      this.townList;
    }
    return;
  };
  updateTown = async (id, updateTown) => {
    const response = await fetch(`https://localhost:7130/api/Town/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateTown),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      console.log(this.townList.length, "response.status===200");
      this.townList;
    } else {
      console.log("no play");
    }
    return;
  };
}
export default new TownStore();
