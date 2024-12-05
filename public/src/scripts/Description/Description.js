export default class Description{
    constructor(area){
        this.area = area
    }
    get(){
        try {
            return document.querySelector("#"+this.area).value
        }catch{
            return false
        }
    }
    load(value = false){
        if(value){
            document.querySelector("#"+this.area).value = value
        }
        return
    }
}