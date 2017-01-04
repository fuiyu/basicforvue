// store:储存,prefix:前缀
// function BaseModel(store, prefix) {
//     this.store = store
//     this.prefix = prefix
// }
class BaseModel {
    constructor(store, prefix){
        this.store = store
        this.prefix = prefix
    }
    async create(obj){
        obj.id = obj.id || Date.now()
        await this.store.set(this.prefix + obj.id, obj)
        return obj.id 
    }

    async get(id){
       return await this.store.get(this.prefix + id)
    }
    async update(id, obj){
      await this.store.set(this.prefix + id, obj)    
    }

    async update(id, obj){
       await this.store.set(this.prefix + id, obj)
    }

    async updatePart(id, part){
        const self =await this.get(id)
        // 此处的assign相当于merge
        Object.assign(result, part)
        await this.update(id, result) 
       
    }

    async del(id){
        await this.store.del(this.prefix + id)
    }
}
module.exports = BaseModel