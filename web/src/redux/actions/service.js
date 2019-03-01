const config = {
  baseUrl: "http://localhost:8000/"
};
export default class Service {
  static async dispatchPost(dispatch, url, body, types) {
    dispatch({ type: types.init });

    const data = await this.post(url, body);

    data.error
      ? dispatch({ type: types.error, error: data.error })
      : dispatch({ type: types.success, data: data.data });
  }
  static async dispatchGet(dispatch, url, types) {
    dispatch({ type: types.init });

    const data = await this.get(url);

    data.error
      ? dispatch({ type: types.error, error: data.error })
      : dispatch({ type: types.success, data: data.data });
  }

  static async get(url) {
    console.log(config.baseUrl + url);
    try {
      let data = await fetch(config.baseUrl + url);
      return { data: await data.json() };
    } catch (e) {
      return { error: e };
    }
  }

  static async post(url, body) {
    try {
      let data = await fetch({
        url: config.baseUrl + url,
        type: "POST",
        body: JSON.stringify(body)
      });

      return { data: await data.json() };
    } catch (e) {
      return { error: e };
    }
  }

  static handleResponse(res) {
    if (res.status !== 404) return res;
    return { json: () => ({ error: 404 }) };
  }
}
