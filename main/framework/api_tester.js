const axios = require('axios');
const logger = require('./logger');

class ApiTester {
    constructor(baseURL, timeout) {
        this.axios = axios;
        logger.log(`[info] ▶ set api url ${baseURL}`);
        this.axios.defaults.baseURL = baseURL;
        this.axios.defaults.timeout = timeout;
    }

    async get(endpoint, id) {
        let response;
        try {
            id ? logger.log(`[info] ▶ get id ${id} from ${endpoint}:`) : logger.log(`[info] ▶ get ${endpoint}:`);
            id ? response = await axios.get(`/${endpoint}/${id.toString()}`) : response = await axios.get(`/${endpoint}`);
            logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }

    async post(endpoint, params) {
        try {
            logger.log(`[info] ▶ post ${JSON.stringify(params)} to ${endpoint}:`);
            const response = await axios.post(`/${endpoint}`, params);
            logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }

    async put(endpoint, params) {
        try {
            logger.log(`[info] ▶ put ${JSON.stringify(params)} to ${endpoint}`);
            const response = await axios.put(`/${endpoint}`, params);
            logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }

    async patch(endpoint, params) {
        try {
            logger.log(`[info] ▶ patch ${JSON.stringify(params)} in ${endpoint}`);
            const response = await axios.patch(`/${endpoint}`, params);
            logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }

    async delete(endpoint, id) {
        try {
            logger.log(`[info] ▶ delete id ${id} in ${endpoint}`);
            const response = await axios.delete(`/${endpoint}`, { params: { id: id } });
            logger.log(`[info]   status code: ${response.status}`);
            return response;
        } catch (error) {
            logger.log(`[info]   status code: ${error.response.status}`);
            return error.response;
        }
    }
}

module.exports = ApiTester;