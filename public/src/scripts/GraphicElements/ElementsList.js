import ElementItem from "./ElementItem.js";
import Main from "../Main.js";
const defaultElementsList = {
  "elementos": [
      {
          "typeOfElement": "0",
          "elementPosition": "1",
          "elementDescription": "",
          "container": "#elementContainer8"
      },
      {
          "typeOfElement": "1",
          "elementPosition": "0",
          "elementDescription": "",
          "container": "#elementContainer5"
      },
  ],
  "complementos": {
      
  }
}

export default class ElementsList {
  constructor(elementTypes,defaultElements=defaultElementsList.elementos, defaultComplements=defaultElementsList.complementos) {
    this.values = []; // Inicializa a lista de elementos vazia
    this.idSequence = 0
    this.elementTypes = elementTypes
 
    this.loadData(defaultElements,defaultComplements) // Carrega elementos padrão ou de referência
  }
  findElementByIndex(containerId) {
    const listaObjetos = this.values
    for (let i = 0; i < listaObjetos.length; i++) {
     
      if (listaObjetos[i].container === `#elementContainer`+containerId) {
        return listaObjetos[i];
      }
    }
    return null; // Retorna null se nenhum objeto for encontrado
  }
  alterType(index, newType) {
    const indexOfElement = this.values.indexOf(this.findElementByIndex(index))
    if (indexOfElement >= 0) {
      if (!this.typesOfElements(this.findElementByIndex(index).typeOfElement)){
        const section = document.querySelector("#aditionalFormSection_"+removido[0].typeOfElement)
        if(section){
          section.style.display = 'none'
        }
      }
      this.values[indexOfElement].typeOfElement = newType;
      const section = document.querySelector("#aditionalFormSection_"+newType)
      if(section){
        section.style.display = 'flex'
      }
      
    } else {
      console.error("Índice inválido para alteração do tipo do elemento.");
    }
  }

  alterPosition(index, newPosition) {
    const indexOfElement = this.values.indexOf(this.findElementByIndex(index))
    if (indexOfElement >= 0 && indexOfElement < this.values.length) {
      this.values[indexOfElement].elementPosition = newPosition;
    } else {
      console.error("Índice inválido para alteração da posição do elemento.");
    }
  }

  alterDescription(index, newDescription) {
    const indexOfElement = this.values.indexOf(this.findElementByIndex(index))
    if (indexOfElement >= 0) {
      this.values[indexOfElement].elementDescription = newDescription;
    } else {
      console.error("Índice inválido para alteração da descrição do elemento.");
    }
  }
  clearData(){
    this.values = []
    document.querySelector("#elementsListContainer").innerHTML = ""

  }
  loadData(elements,complements){
    this.clearData()
    elements.forEach((element,i)=>{
      element.container = "#elementContainer"+i
      this.createElement(element)
      const index = element.typeOfElement
      if(index !== -1 && complements[index] && complements[index]){
        Main.AdditionalInfosForm[index].reply(complements[index])
      }
      
    })
  }

  createElement(element = { typeOfElement: "-1", elementPosition: "-1", elementDescription: "" }) {
    element["container"] = "#elementContainer"+this.idSequence
    this.values.push(element);
    new ElementItem(element, this.idSequence, this,this.elementTypes);
    
    this.idSequence++
    if(element.typeOfElement !== '-1'){
      const section = document.querySelector("#aditionalFormSection_"+element.typeOfElement)
      if(section){
        section.style.display = 'flex'
      }
      
    }
  }
  
  deleteElement(index) {
    const indexOfElement = this.values.indexOf(this.findElementByIndex(index))
    const removido = this.values.splice(indexOfElement, 1)
    document.querySelector(`#elementContainer${index}`).remove()
    if (!this.typesOfElements(removido[0].typeOfElement)){
      const section = document.querySelector("#aditionalFormSection_"+removido[0].typeOfElement)
      if(section){
        section.style.display = 'none'
      }
      
    }

  }
  typesOfElements(find=false) {
    const tiposDeElementos = [];
    for (const objeto of this.values) {
      tiposDeElementos.push(objeto.typeOfElement);
    }
    const types = [...new Set(tiposDeElementos)];
    return find? types.includes(find)  :  types
  }

  getAnswers(){
    if(this.values.length == 1 && Object.values(this.values[0]).includes('-1')){
      throw new Error("Informe pelomenos 1 elemento!")
    }
    this.values.forEach(element => {
        if(Object.values(element).includes('-1')){
            throw new Error("Preencha todos os campos do elemento")
        }
    });
    return this.values
  }

}
