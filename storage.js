class Storage {
  static getEnterUserFromStorage() {
    //Tüm kullanıcıları al
    let users;

    if (localStorage.getItem("users") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("users"));
    }

    return users;
  }
  static addEnterUserFromStorage(username) {
    let users = this.getEnterUserFromStorage();

    if (users.indexOf(username) === -1) {
      users.push(username);
    }
    localStorage.setItem("users", JSON.stringify(users));
  }
}
