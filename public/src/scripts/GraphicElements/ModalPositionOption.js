export default class ModalPositionOption{
    constructor(options){
        this.options = options
        this.render()
    }
    render(){
        this.options.forEach((element, i) => {
            const index = i
            const options = document.querySelector("#positionOptions")
            const option = document.createElement('button')
            option.id = "position_"+element.pos_id
            option.classList.add("col-4")
            option.classList.add("bg-white")
            option.classList.add("positionOption")

            option.setAttribute("data-dismiss","modal")
            

            const image = document.createElement('img')
            image.classList.add("col-12")
            image.classList.add("p-3")
            image.src = 'https://www.vipsportsproducao.com.br/VIS2/public/src/img/position'+element.pos_id+'.png'
            
            const subtitle = document.createElement('p')
            subtitle.textContent=element.pos_name

            
            
            option.appendChild(image)
            option.appendChild(subtitle)
            options.appendChild(option)
        });
    }
}