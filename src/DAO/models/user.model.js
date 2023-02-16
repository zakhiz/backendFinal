export default class User {
  static get model() {
    return "Users";
  }
  static get schema() {
    return {
      first_name: String,
      last_name: String,
      email: {
        type: String,
        unique: true,
      },
      password: String,
      age: Number,
      phone_number: Number,
      address: String,
      avatar: String,
      role: {
        type: String,
        default: "user",
      },
      cart: Array,
    };
  }
}
