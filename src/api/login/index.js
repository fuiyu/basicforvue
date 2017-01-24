
export default {
    login(data,cb) {
        vm.$http.post('/user/login', data).then((response) => { 
            if(typeof cb == 'function'){
                cb(response)
            }
        })
    },
    getUserInfo(cb){
        vm.$http.get('/user/getinfo').then((response) => { 
            if(typeof cb == 'function'){
                cb(response)
            }
        })
    }
}