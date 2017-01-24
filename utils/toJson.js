class ToJson {

    spliceToJSON(data = {}, message = '', code = '') {
        return {
            data,
            message,
            code
        }
    }
}

module.exports = ToJson