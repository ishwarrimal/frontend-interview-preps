const _password = Symbol("password");
class User {
  constructor(unsername, password) {
    this.username = this.username;
    this[_password] = password;
  }

  getPassword() {
    return this[_password];
  }
}

const user = new User("Ishwar", "s3cr3tP@ssw0rd");
console.log(user.username); // Output: "JohnDoe"
console.log(user.getPassword()); // Output: "s3cr3tP@ssw0rd"
console.log(user[_password]); // Output: undefined (Symbol is not accessible without a reference)
