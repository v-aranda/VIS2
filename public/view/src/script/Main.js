import data from './helpers/dataLoader.js';


const dev_host = "http://localhost"
const prod_host = "https://www.vipsportsproducao.com.br"
var global_host = prod_host

class Main{
    static os 
    static types
    static positions
    constructor(){
        
        this.preload()
    }
    async preload(){
        Main.os = await new data(BASE_URL, global_host).data; 
        
        Main.types = await fetch(global_host+"/VIS2/app/Type").then(response => response.json())
        Main.positions = await fetch(global_host+"/VIS2/app/Position").then(response => response.json())
        this.loadSingleTypes(Main.os.elementos)
        this.loadComplements(Main.os.complementos)
        this.loadElements(Main.os.elementos)

    }
   
    loadSingleTypes(elementos){
    // create a section for each element type, with a title corresponding to the element type, withouth duplicates, and a div for each element
        let elementTypes = elementos.map(element => element.typeOfElement)
        elementTypes = [...new Set(elementTypes)]
        let main = document.querySelector('main')
        elementTypes.forEach(elementType => {
            const elementTypeInfos = Main.types.filter(type => type.ety_id == elementType)[0]
            let section = document.createElement('section')
            section.classList.add('container','p-3')
            section.id = elementType
            let title = document.createElement('h2')
            title.classList.add('side-border')
            title.textContent = elementTypeInfos.ety_name
            section.appendChild(title)
            let complements = document.createElement('div')
            complements.id = elementTypeInfos.ety_id+'complements'
            let elements = document.createElement('ul')
            elements.id = elementTypeInfos.ety_id+'elements'
            section.appendChild(complements)
            section.appendChild(elements)
            main.appendChild(section)
            main.appendChild(document.createElement('hr'))
        })
       
    }
    loadComplements(complements){
        Object.keys(complements).forEach(key => {
        const container = document.getElementById(key+'complements')
        complements[key].forEach(complement => {
            console.log(complement)
            const complementDiv = document.createElement('div')
            complementDiv.id = complement.question
            complementDiv.innerHTML = `<b>${complement.resume}</b>: ${complement.response}`
            if(complement.justify){
                const justify = document.createElement('p')
                justify.classList.add('card','p-2')
                justify.textContent = complement.justify
                complementDiv.appendChild(justify)
            }
            container.appendChild(complementDiv)
        });
    });
    
}
    loadElements(elementos){
        
        elementos.forEach(elemento => {
            const currentType = Main.types.filter(type => type.ety_id == elemento.typeOfElement)[0]
            const currentPosition = Main.positions.filter(position => position.pos_id == elemento.elementPosition)[0]
            
            const container = document.getElementById(elemento.typeOfElement+'elements')
            const elementLi = document.createElement('li')
            elementLi.classList.add('d-flex','flex-row','p-3')
            const elementFigure = document.createElement('img')
            elementFigure.src = 'https://www.vipsportsproducao.com.br/VIS2/public/src/img/position'+currentPosition.pos_id+'.png'
            elementFigure.classList.add('col-2')
            const elementDiv = document.createElement('div')
            elementDiv.classList.add('p-3')
            const elementTitle = document.createElement('h5')
            const elementDescription = document.createElement('p')
            
            
            console.log(elemento)
            elementTitle.textContent = currentType.ety_name + ' ' + currentPosition.pos_name
            elementDescription.textContent = elemento.elementDescription
            elementDiv.appendChild(elementTitle)
            elementDiv.appendChild(elementDescription)
            elementLi.appendChild(elementFigure)
            elementLi.appendChild(elementDiv)
            container.appendChild(elementLi)
    });
}
}

new Main();