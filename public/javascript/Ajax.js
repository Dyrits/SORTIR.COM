class Ajax {
    static ajax = async (method, endpoint = "", data = "") => {
        const parameters = {method: method, headers: {'Accept': 'application/json'}}
        if (data) {
            parameters.headers['Content-type'] = 'application/json';
            parameters.body = JSON.stringify(data);
        }
        return await fetch("http://localhost/sortir.com/public" + endpoint, parameters)
            .then(response => response.json());
    }

    static get = async (endpoint) => { return await this.ajax("GET", endpoint); }

    static delete = async (endpoint) => { return await this.ajax("DELETE", endpoint); }

    static persist = async (endpoint, data) => { return await this.ajax("POST", endpoint, data); }
}