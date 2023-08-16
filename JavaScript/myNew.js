//Polyfill for New
function myNew(consFunc) {
  const obj = {};
  consFunc.call(obj);
  obj.__proto__ == consFunc.prototype;
  return obj;
}

function a() {
  this.name = "Ish";
}

const mn = myNew(a);
