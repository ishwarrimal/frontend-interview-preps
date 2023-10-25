const _password = Symbol("password");
class User {
  constructor(username, password) {
    this.username = username;
    this[_password] = password;
  }

  getPassword() {
    return this[_password];
  }
}

const user = new User("Ishwar", "s3cr3tP@ssw0rd");
console.log(user.username); // Output: "JohnDoe"
console.log(user.getPassword()); // Output: "s3cr3tP@ssw0rd"
console.log(User[_password]); // Output: undefined (Symbol is not accessible without a reference)
