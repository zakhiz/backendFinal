export default class UserDTO {
  static UserDbdto = (user) => {
    return {
      first_name : user.first_name,
      last_name : user.last_name,
      email : user.email,
      password: user.password,
      age : user.age,
      phone_number : user.phone_number,
      address : user.address,
      avatar: user.avatar
    };
  };
}
