const axios = require('axios');
const logger = require('./logger');

class ApiTester {
    constructor(baseURL, timeout) {
        this.axios = axios;
        logger.log(`▶    set api url ${baseURL}`);
        this.axios.defaults.baseURL = baseURL;
        this.axios.defaults.timeout = timeout;
    }

    async get(endpoint, id) {
        let response;
        try {
            id ? logger.log(`▶    get id ${id} from ${endpoint}:`) : logger.log(`▶    get ${endpoint}:`);
            id ? response = await axios.get(`/${endpoint}/${id.toString()}`) : response = await axios.get(`/${endpoint}`);
            logger.log(`     status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`     status code: ${error.response.status}`);
            return error.response;
        }
    }

    async post(endpoint, params) {
        try {
            logger.log(`▶    post ${JSON.stringify(params)} to ${endpoint}:`);
            const response = await axios.post(`/${endpoint}`, params);
            logger.log(`     status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`     status code: ${error.response.status}`);
            return error.response;
        }
    }

    async put(endpoint, params) {
        try {
            logger.log(`▶    put ${JSON.stringify(params)} to ${endpoint}`);
            const response = await axios.put(`/${endpoint}`, params);
            logger.log(`     status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`     status code: ${error.response.status}`);
            return error.response;
        }
    }

    async patch(endpoint, params) {
        try {
            logger.log(`▶    patch ${JSON.stringify(params)} in ${endpoint}`);
            const response = await axios.patch(`/${endpoint}`, params);
            logger.log(`     status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`     status code: ${error.response.status}`);
            return error.response;
        }
    }

    async delete(endpoint, id) {
        try {
            logger.log(`▶    delete id ${id} in ${endpoint}`);
            const response = await axios.delete(`/${endpoint}`, { params: { id: id } });
            logger.log(`     status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`     status code: ${error.response.status}`);
            return error.response;
        }
    }

    async isJson(response) {
        try {
            logger.log(`▶    check response is json`);
            return typeof response === "object" ? true : false;
        }
        catch (error) {
            return false;
        }
    }
}

module.exports = ApiTester;