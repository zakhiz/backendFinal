export default class UserDTO {
  //! No le pude dar un uso realmente asi que solo aplique el dto pero no lo use
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
