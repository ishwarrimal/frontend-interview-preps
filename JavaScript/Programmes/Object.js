//CRUD = Create Read Update Delete
//Object.freeze ->  freeze -> CUD -> Only Reading is allowed
// OBject.seal -> seal -> CD -> Only update and reading is allowed.

//Define Property
var t = {};

Object.defineProperty(t, "greatPerson", {
  set(val) {
    this.name = val;
  },
  get() {
    return `${this.name} is Great`;
  },
  enumerable: true, //This makes sure that the key is accessible in for in loop
});
t.greatPerson = "Ishwar";
console.log(t.greatPerson); //Ishwar is Great
