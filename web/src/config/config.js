import Service from "redux/actions/service";
export default class Config {
  static baseUrl = (function() {
    let baseUrl;

    if (process.env.NODE_ENV === "development") {
      baseUrl = "http://localhost:8000/";
    } else {
      baseUrl = "http://ec2-18-218-209-4.us-east-2.compute.amazonaws.com:8000/";
    }
    return baseUrl;
  })();

  static serviceHeaders = {
    "Content-Type": "application/json",
    Authorization: this.getAuthTokenFromLocalStorage()
  };

  static getAuthTokenFromLocalStorage() {
    return window.sessionStorage.getItem("token");
  }

  static setAuthToken(data) {
    const { token, user } = data;
    const tokenPhrase = "Token " + token;
    this.serviceHeaders.Authorization = tokenPhrase;
    window.sessionStorage.setItem("token", tokenPhrase);
    window.sessionStorage.setItem("user", JSON.stringify(user));
  }

  static log(activity, description) {
    try {
      if (typeof description === "object") {
        description = JSON.stringify(description);
      }
      const userId = JSON.parse(window.sessionStorage.getItem("user")).id;
      const data = {
        user: userId,
        activity: activity,
        description: description
      };
      Service.fetchpost("tools/user_logs/", data);
    } catch (e) {}
  }
}

export const log = action => {
  const { type, data, error } = action;
  const activity = type;
  const description = data ? data : error;
  if (description) {
    Config.log(activity, description);
  }
};
