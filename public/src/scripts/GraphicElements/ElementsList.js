import ElementItem from "./ElementItem.js";
import Main from "../Main.js";
import global_host from "../../../config.js";

export default class ElementsList {
  constructor(elementTypes,defaultElements) {
    this.values = []; // Inicializa a lista de elementos vazia
    this.idSequence = 0
    this.elementTypes = elementTypes
 
    this.loadData(defaultElements.elementos,defaultElements.complementos) // Carrega elementos padrão ou de referência
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
  async alterType(index, newType) {
    const indexOfElement = this.values.indexOf(this.findElementByIndex(index))
    const removido = {...this.values[indexOfElement]}
  
    if (indexOfElement >= 0) {
      this.values[indexOfElement].typeOfElement = newType;
      const section = document.querySelector("#aditionalFormSection_"+newType)
      if(section){
        section.style.display = 'flex'
      }
      
      if (!this.typesOfElements(removido.typeOfElement)){
        const section = document.querySelector("#aditionalFormSection_"+removido.typeOfElement)
        
        if(section){
          section.style.display = 'none'
        }
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
    this.values.forEach(element => {
        
        if(Object.values(element).includes('-1')){
            const container = document.querySelector(element.container)
            container.style.boxShadow= "rgba(255, 0, 0, 0.5) 0px 2px 8px 0px";
            container.addEventListener('click',()=>container.style.boxShadow = "none")
            window.scrollTo(0,  container.offsetTop - 100)
            throw new Error("Preencha todos os campos do elemento")
        }
    });
    return this.values
  }

}
