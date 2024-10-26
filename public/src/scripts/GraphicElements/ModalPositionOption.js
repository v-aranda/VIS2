export default class ModalPositionOption{
    constructor(options){
        this.options = options
        this.render()
    }
    render(){
        this.options.forEach((element, index) => {
            const options = document.querySelector("#positionOptions")
            const option = document.createElement('button')
            option.id = "position_"+index
            option.classList.add("col-4")
            option.classList.add("bg-white")
            option.classList.add("positionOption")

            option.setAttribute("data-dismiss","modal")
            

            const image = document.createElement('img')
            image.classList.add("col-12")
            image.classList.add("p-3")
            image.src = './src/img/option'+index+'.png'
            
            const subtitle = document.createElement('p')
            subtitle.textContent=element.name

            
            
            option.appendChild(image)
            option.appendChild(subtitle)
            options.appendChild(option)
        });
    }
}