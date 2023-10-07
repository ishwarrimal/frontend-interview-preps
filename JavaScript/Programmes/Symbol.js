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
console.log(user.username); // Output: "JohnDoe"
console.log(user.getPassword()); // Output: "s3cr3tP@ssw0rd"
console.log(user._password); // undefined