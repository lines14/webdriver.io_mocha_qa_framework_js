const axios = require('axios');

class ApiTester {
    constructor(baseURL, timeout) {
        this.axios = axios;
        this.axios.defaults.baseURL = baseURL;
        this.axios.defaults.timeout = timeout;
    }

    async get(endpoint, id) {
        try {
            return await axios.get(`/${endpoint}`, { params: { id: id } });
        } catch (error) {
            console.error(error);
        }
    }

    async post(endpoint, userId, title, body) {
        try {
            return await axios.post(`/${endpoint}`, { params: { userId: userId, title: title, body: body } });
        } catch (error) {
            console.error(error.response.status);
        }
    }

    async put(endpoint, id, userId, title, body) {
        try {
            return await axios.put(`/${endpoint}`, { params: { id: id, userId: userId, title: title, body: body } });
        } catch (error) {
            console.error(error.response.status);
        }
    }

    async patch(endpoint, id, userId, title, body) {
        try {
            return await axios.patch(`/${endpoint}/${id.toString()}`, { params: { userId: userId, title: title, body: body } });
        } catch (error) {
            console.error(error.response.status);
        }
    }

    async delete(endpoint, id) {
        try {
            return await axios.delete(`/${endpoint}`, { params: { id: id } });
        } catch (error) {
            console.error(error.response.status);
        }
    }
}

module.exports = ApiTester;