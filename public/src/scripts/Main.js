import ElementsList from "./GraphicElements/ElementsList.js"
import ModalPositionOption from "./GraphicElements/ModalPositionOption.js";
import FormSection from "./questions/FormSection.js";



const defaultElementsList =  {
        "elementos": [
            {
                "typeOfElement": "0",
                "elementPosition": "-1",
                "elementDescription": "",
                "container": "#elementContainer0"
            },
            {
                "typeOfElement": "1",
                "elementPosition": "-1",
                "elementDescription": "",
                "container": "#elementContainer1"
            }
        ],
        "complementos": {}
    }

function fetchElementsList(resp) {
    fetch('https://www.vipsportsproducao.com.br/VIS2/app/ArtMetaData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resp),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export default class Main {
    static elementsTypes
    static productPositions
    
    static AdditionalInfosForm
    static aditionalQuestions

    static formBase
    static osCode

    constructor() {
        this.preload()
    }
    async fetchData(url) {
        let raw = await fetch(url)
        return await raw.json()
    }
    async preload() {
        const urlParams = new URLSearchParams(window.location.search);
        Main.osCode = urlParams.get('url');
        Main.productPositions = await this.fetchData("./src/data/ProductPositions.json")
        Main.aditionalQuestions = await this.fetchData("./src/data/AditionalQuestions.json")
        Main.elementsTypes = await this.fetchData("./src/data/ElementsTypes.json")
        Main.formBase = await this.getFormBase(Main.osCode)
        
        this.main()
    }
    async main() {
        Main.AdditionalInfosForm = {}
        Object.keys(Main.aditionalQuestions).forEach(key => {
            Main.AdditionalInfosForm[key] = new FormSection(Main.aditionalQuestions[key], key)
        })
        new ModalPositionOption(Main.productPositions)
        const elementsList = new ElementsList(Main.elementsTypes,Main.formBase);

        document.querySelector("#submitButton").addEventListener("click", () => {
            this.submitHandler(elementsList)
        })
        document.querySelector("#addElementsButton").addEventListener("click", () => {
            elementsList.createElement()
        })

    }

    async getFormBase(osCode) {
        // Obter o valor de uma os pela URL
        try {
            const raw_data = await fetch("https://www.vipsportsproducao.com.br/VIS2/app/ArtMetaData/" + osCode)
            const data = await raw_data.json()
            return JSON.parse(data.mtd_data)
        }catch{
            return defaultElementsList
        }
        
    }

    submitHandler(elementsList) {

        try {
            const elementos = elementsList.getAnswers()
            const complements = {}
            elementsList.typesOfElements().forEach(element => {
                if (Main.AdditionalInfosForm[element]) {
                    const section = Main.AdditionalInfosForm[element].getAnswers()
                    if (section.length !== 0) {
                        complements[element] = section
                    }
                }


            })

            const data = {
                "elementos": elementos,
                "complementos": complements,
            }

            const retorno = {
                "mtd_art": Main.osCode,
                "mtd_data": JSON.stringify(data)
            }
            console.log(retorno)
            fetchElementsList(retorno)
            Swal.fire({
                title: 'Sucesso!',
                text: 'Informações Validadas',
                icon: 'success',
                confirmButtonText: 'OK'
            })

        } catch (e) {
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


