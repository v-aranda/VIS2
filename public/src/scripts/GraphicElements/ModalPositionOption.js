import Article from "../HELPERS/Articles.js"
import global_host from "../../../config.js"
export default class ModalPositionOption{
    constructor(types,productId){
        this.product = productId
        this.types = types
  
        this.render()
    }
    async render(){
        
        this.types.forEach(async element => {
            try{
                this.options = await fetch(`${global_host}/VIS2/app/Position/${this.product}/${element.ety_id}`).then(res => res.json())
                const optionsModal = document.querySelector("#positionOptions")
                
            
                this.options.forEach((position, i) => {
                    const index = i
                    const option = document.createElement('button')
                    option.id = this.product+"-"+element.ety_id+"-"+position.pos_id
                    option.classList.add("col-4")
                    option.classList.add("bg-white")
                    option.classList.add("positionOption")
                    

                    option.setAttribute("data-dismiss","modal")
                    

                    const image = document.createElement('img')
                    image.classList.add("col-12")
                    image.classList.add("p-3")
                    
                    image.src = `http://localhost/VIS2/public/src/img/${this.product}-${element.ety_id}-${position.pos_id}.png`
                    
                    option.classList.add("element_"+element.ety_id)
                    option.style.display = "none"

                    const subtitle = document.createElement('p')
                    subtitle.textContent=position.pos_name  
                    
                    
                    option.appendChild(image)
                    option.appendChild(subtitle)
                    optionsModal.appendChild(option)
            });
            }catch(e){
                console.log(e);
            }
            
            
        })
    }
}

//  class ORIGINAL_ModalPositionOption{
//     constructor(options,element,productId,types){
//         this.product = productId
//         this.element = element
//         this.elementName = types.find(type => type.ety_id == element).ety_name
//         this.options = options
//         this.render()
//     }
//     render(){
//         const optionsModal = document.querySelector("#positionOptions")
//         const modalTitle = document.querySelector("#positionsModalTitle")
//         const title = new Article(this.elementName.toLowerCase())
//         modalTitle.innerHTML = `Selecione a posição ${title.dy()}`
        
//         optionsModal.innerHTML = ""
//         this.options.forEach((element, i) => {
//             const index = i
//             const option = document.createElement('button')
//             option.id = "position_"+element.pos_id
//             option.classList.add("col-4")
//             option.classList.add("bg-white")
//             option.classList.add("positionOption")

//             option.setAttribute("data-dismiss","modal")
            

//             const image = document.createElement('img')
//             image.classList.add("col-12")
//             image.classList.add("p-3")
            
//             image.src = `http://localhost/VIS2/public/src/img/${this.product}-${this.element}-${element.pos_id}.png`
            
//             const subtitle = document.createElement('p')
//             subtitle.textContent=element.pos_name

            
            
//             option.appendChild(image)
//             option.appendChild(subtitle)
//             optionsModal.appendChild(option)
//         });
//     }
// }