import axios from "axios";

const headers = {
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

class BackendApi {
  constructor() {
    this.esAxios = axios.create(headers);
  }

  async getAllCities() {
    const uri = "/cities";
    const { data: data } = await this.esAxios.get(uri);

    return data;
  }
}

export default new BackendApi();
