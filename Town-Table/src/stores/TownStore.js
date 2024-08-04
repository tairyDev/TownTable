import { observable, makeObservable, action, makeAutoObservable } from "mobx";
import Swal from 'sweetalert2'
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
  }
  addTown = async (name) => {
    const response = await fetch("https://localhost:7130/api/Town", {
      method: "POST",
      body: JSON.stringify({name}),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      this.townList = [...this.townList, name];
      console.log(this.townList.length, "response.status===200");
      Swal.fire({
        text: "הישוב נוסף בהצלחה!",
        icon: "success"
      })
    }
    else{
      Swal.fire({
        title: " שגיאה",
        text: "לא ניתן להוסיף שם עיר פעמיים",
        icon: "error",
        timer: 3000
      })
    }
    window.location.reload()
    return
  }
  deleteTown = async (id) => {
    console.log(id, "deleteTown");
    const response = await fetch(`https://localhost:7130/api/Town/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 204) {
      console.log(this.townList.length, "response.status===204");
      this.townList;
      Swal.fire({
        text: "הישוב נמחק בהצלחה!",
        icon: "success",
        timer:3000
      })
    }
    return;
  }
  updateTown = async (id,name) => {
      const response =await fetch(`https://localhost:7130/api/Town/${id}`, {
        method: "PUT",
        body: JSON.stringify({id,name}),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log(this.townList.length, "response.ok");
        this.townList;
        Swal.fire({
          text: "ישוב התעדכן בהצלחה!",
          icon: "success"
        })
      } else {
        Swal.fire({
          title: " שגיאה",
          text: "לא ניתן להכניס את אותו שם פעמיים",
          icon: "error"
        })
        console.error(
          `Update failed with status ${response.status}:`,
          errorData
        );
      }
   
    return
  }
}
export default new TownStore();
