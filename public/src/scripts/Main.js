import ElementsList  from "./GraphicElements/ElementsList.js"
import ModalPositionOption from "./GraphicElements/ModalPositionOption.js";
import FormSection from "./questions/FormSection.js";

export default class Main {
    static elementsTypes 
    static aditionalQuestions 
    static productPositions 
    static AdditionalInfosForm
    
    constructor(){
        this.preload()
    }
    async fetchData(url){
        let raw = await fetch(url)
        return await raw.json()
    }
    async preload() {
        Main.productPositions = await this.fetchData("./src/data/ProductPositions.json")
        Main.aditionalQuestions = await this.fetchData("./src/data/AditionalQuestions.json")
        Main.elementsTypes = await this.fetchData("./src/data/ElementsTypes.json")

        this.main()
    }
    async main() {
        Main.AdditionalInfosForm = {}
        Object.keys(Main.aditionalQuestions).forEach(key=>{
            Main.AdditionalInfosForm[key] = new FormSection(Main.aditionalQuestions[key], key)
        })
        new ModalPositionOption(Main.productPositions)
        const elementsList = new ElementsList(Main.elementsTypes);
    
        document.querySelector("#submitButton").addEventListener("click",()=>{
            this.submitHandler(elementsList)
        })
        document.querySelector("#addElementsButton").addEventListener("click",()=>{
            elementsList.createElement()
        })
    }
   

    submitHandler(elementsList){ 
       try{
        const elementos = elementsList.getAnswers()
        const complements = {}
        elementsList.typesOfElements().forEach(element=>{
            if(Main.AdditionalInfosForm[element]){
                const section = Main.AdditionalInfosForm[element].getAnswers()
            if(section.length !== 0 ){
                 complements[element] = section
            }
            }
            
           
        })
        const retorno = {
            "elementos": elementos,
            "complementos": complements,
        }
        console.log(retorno)
        Swal.fire({
            title: 'Sucesso!',
            text: 'Informações Validadas',
            icon: 'success',
            confirmButtonText: 'OK'
        })

       }catch(e){
        Swal.fire({
            title: 'Informação Inconsistente!',
            text: e.message,
            icon: 'error',
            confirmButtonText: 'CORRIGIR'
          })
       }
       
    }
}

const app = new Main() 