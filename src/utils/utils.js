import axios from "axios";

export function AuthLogin(jwt) {
  console.log(jwt);
  try {
    axios
      .get("http://3.39.156.161:8080/users/auto-logIn", {
        headers: {
          "X-ACCESS-TOKEN": jwt,
        },
      })
      .then((response) => {
        console.log("자동로그인",response);
        if (response.data.isSuccess) {
          sessionStorage.setItem("userJWT", response.data.result.userJWT);
          sessionStorage.setItem("userID", response.data.result.userId);
          sessionStorage.setItem(
            "profileImgUrl",
            response.data.result.profileImgUrl
          );
          return true;
        } else {
          return false;
        }
      });
  } catch (e) {
    console.log(e.response);
    return false;
  }
}
