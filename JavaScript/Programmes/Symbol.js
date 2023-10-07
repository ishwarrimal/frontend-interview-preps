class User {
  constructor(username, password) {
  this.username = username;
  let _password = Symbol(password)


  this.getPassword = () => {
    return _password;
  }
}

}

const user = new User("Ishwar", "s3cr3tP@ssw0rd");
console.log(user.username); // Output: "Ishwar"
console.log(user.getPassword()); // Output: "Symbol(s3cr3tP@ssw0rd)"
console.log(user._password); // undefined