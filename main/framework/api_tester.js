const axios = require('axios');

class ApiTester {
    constructor(baseURL, timeout) {
        this.axios = axios;
        this.axios.defaults.baseURL = baseURL;
        this.axios.defaults.timeout = timeout;
    }

    async get(endpoint, id) {
        try {
            return id ? await axios.get(`/${endpoint}/${id.toString()}`) : await axios.get(`/${endpoint}`);
        } catch (error) {
            return error.response;
        }
    }

    async post(endpoint, params) {
        try {
            return await axios.post(`/${endpoint}`, params);
        } catch (error) {
            return error.response;
        }
    }

    async put(endpoint, params) {
        try {
            return await axios.put(`/${endpoint}`, params);
        } catch (error) {
            return error.response;
        }
    }

    async patch(endpoint, params) {
        try {
            return await axios.patch(`/${endpoint}`, params);
        } catch (error) {
            return error.response;
        }
    }

    async delete(endpoint, id) {
        try {
            return await axios.delete(`/${endpoint}`, { params: { id: id } });
        } catch (error) {
            return error.response;
        }
    }

    async isJson(response) {
        try {
            return typeof response === "object" ? true : false;
        }
        catch (error) {
            return false;
        }
    }
}

module.exports = ApiTester;