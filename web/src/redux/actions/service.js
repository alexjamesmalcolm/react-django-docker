import config from "config/config";
const goodResponses = [200, 201, 204];

export default class Service {
  static async post(dispatch, url, body, types) {
    this.fetch(dispatch, "post", url, types, body);
  }
  static async get(dispatch, url, queryParams, types) {
    if (queryParams.init && queryParams.success && queryParams.error) {
      types = queryParams;
      queryParams = {};
    }
    this.fetch(dispatch, "get", url, types, queryParams);
  }

  static async put(dispatch, url, body, types) {
    this.fetch(dispatch, "put", url, types, body);
  }

  static async patch(dispatch, url, body, types) {
    this.fetch(dispatch, "patch", url, types, body);
  }

  static async delete(dispatch, url, types) {
    this.fetch(dispatch, "delete", url, types);
  }

  static async fetch(dispatch, method, url, types, body) {
    dispatch({ type: types.init });
    const data = await this["fetch" + method](url, body);

    data.error
      ? dispatch({ type: types.error, error: data.error })
      : dispatch({ type: types.success, data: data.data });
  }

  static async fetchget(url, queryParams) {
    url = Service.formatUrl(url, queryParams);
    try {
      let data = await fetch(url, {
        headers: config.serviceHeaders
      });

      return this.handleResponse(data);
    } catch (e) {
      return { error: e };
    }
  }

  static async fetchpost(url, body) {
    url = Service.formatUrl(url);
    try {
      let data = await fetch(url, {
        method: "POST",
        headers: config.serviceHeaders,
        body: JSON.stringify(body)
      });

      return this.handleResponse(data);
    } catch (e) {
      return { error: e };
    }
  }

  static async fetchdelete(url) {
    const urlStr = url.split("/");
    let id = urlStr.pop(),
      data;
    if (!id) id = urlStr.pop();

    url = Service.formatUrl(url);
    try {
      const d = await fetch(url, {
        method: "DELETE",
        headers: config.serviceHeaders
      });
      try {
        data = await d.json();
      } catch (e) {}
      return data || { data: Number(id) };
    } catch (e) {
      return { error: e };
    }
  }

  static async fetchput(url, body) {
    url = Service.formatUrl(url);
    try {
      let data = await fetch(url, {
        method: "PUT",
        headers: config.serviceHeaders,
        body: JSON.stringify(body)
      });
      return this.handleResponse(data);
    } catch (e) {
      return { error: e };
    }
  }

  static async fetchpatch(url, body) {
    url = Service.formatUrl(url);
    try {
      let data = await fetch(url, {
        method: "PATCH",
        headers: config.serviceHeaders,
        body: JSON.stringify(body)
      });

      return this.handleResponse(data);
    } catch (e) {
      return { error: e };
    }
  }

  static async handleResponse(data) {
    if (goodResponses.includes(data.status)) {
      try {
        return { data: await data.json() };
      } catch (error) {
        return { data: await data };
      }
    } else {
      try {
        return { error: await data.json() };
      } catch (error) {
        return { error: await data };
      }
    }
  }

  static formatUrl(url, queryParams) {
    if (url.includes("?")) {
      console.warn(
        "Query Parameters should not be specified in URL string. Instead this should happen in the queryParams: object."
      );
    }
    url = url.substr(-1) !== "/" ? url + "/" : url;
    url = new URL(config.baseUrl + url);

    for (let i in queryParams)
      if (queryParams[i]) url.searchParams.append(i, queryParams[i]);

    return url;
  }
}
