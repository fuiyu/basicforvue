class ToJson {

    spliceToJSON(data = {}, message = '', code = '') {
        return JSON.stringify({
            data,
            message,
            code
        })

    }
}

module.exports = ToJson