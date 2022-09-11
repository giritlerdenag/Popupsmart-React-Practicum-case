class Request {
  constructor(url) {
    this.url = url;
  }
  async get() {
    let response = await fetch(this.url);
    let responseData = await response.json();

    return responseData;
  }
  async post(data) {
    let response = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    let responseData = await response.json();

    return responseData;
  }
  async put(id, data) {
    let response = await fetch(this.url + "/" + id, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    let responseData = await response.json();

    return responseData;
  }
  async delete(id) {
    let response = await fetch(this.url + "/" + id, {
      method: "DELETE",
    });

    return "Veri Silindi";
  }
}
