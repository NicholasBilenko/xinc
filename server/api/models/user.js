const user = [{
    userId: 0,
    username: "nicholas.bilenko@gamil.com",
    password: "123",
    token: null
}];

module.exports = class User {
    static getUser() {
        return user;
    }
}