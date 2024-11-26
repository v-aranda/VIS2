import ElementsList from "./GraphicElements/ElementsList.js"
import FormSection from "./questions/FormSection.js";
import global_host from "../../config.js";
import ModalPositionOption from "./GraphicElements/ModalPositionOption.js";


const parent = window.parent.document.getElementById("iframeVis2")
const urlParams = new URLSearchParams(parent.src);
const defaultElementsList = {
    "1" : {
        "elementos": [
            {
                "typeOfElement": "1",
                "elementPosition": "-1",
                "elementDescription": "",
                "container": "#elementContainer0"
            }
        ],
        "complementos": {}
    },
    "2" : {
        "elementos": [
            {
                "typeOfElement": "2",
                "elementPosition": "23",
                "elementDescription": "",
                "container": "#elementContainer1"
            }
        ],
        "complementos": {}
    }
}

async function createArt(resp) {
    try {     
        const osData = Main.osData
        fetch(`${global_host}/VIS2/app/Art`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(osData),
        }).then(() => createArtMetaData(resp))
            .catch((error) => {
                Swal.fire({
                    title: 'Erro de Criação',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                console.error('Error', error);
            });
    } catch {
        Swal.fire({
            title: 'Os não encontrada!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK'
        })
        console.error('Error', error);
    }

}
async function createArtMetaData(resp) {
    fetch(`${global_host}/VIS2/app/ArtMetaData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resp),
    })
        .then(response => response
        )
        .then(async data => {
            Swal.fire({
                title: 'Dados Cadastrados!',
                text: 'Arte Criada com Sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        })
        .catch((error) => {
            console.error('Error:', error);
            Swal.fire({
                title: 'Erro de Criação',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })

        });
}
function updateArtMetaData(resp, osCode) {
    fetch(`${global_host}/VIS2/app/ArtMetaData/` + osCode, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resp),
    })
    .then(response => response.json())
    .then(data => {
        
    })
    .catch((error) => {
        Swal.fire({
            title: 'Falha de Atualização!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK'
        })
    });
}
function throwBackToParent(resp){

    try{
        window.parent.objFormEspecificacoes = JSON.stringify(resp)
        console.log(window.parent.objFormEspecificacoes)
        return Swal.fire({
            title: 'Dados Atualizados!',
            text: "Dados Salvos com Sucesso!",
            icon: 'success',
            confirmButtonText: 'OK'
        })  
    }catch{
        throw new Error("Erro ao Retornar Dados!")
    }
}

export default class Main {
    static elementsTypes
    static osData

    static AdditionalInfosForm
    static aditionalQuestions

    static formBase
    static osCode
    static creating
    static enabledProducts = [1]

    constructor() {
        this.preload()
    }

    async fetchData(url) {
        let raw = await fetch(url)
        return await raw.json()
    }

    async preload() {

        Main.osData = {
            "art_os": urlParams.get('codItem'),
            "art_description": urlParams.get('artName'),
            "art_subtitle": urlParams.get('artEspec'),
            "art_product": urlParams.get('artProduct'),
            "copyCode": urlParams.get('copyCode') ? urlParams.get('copyCode') : false,
            "art_object": urlParams.get('obj')
        }
        Main.osCode = Main.osData.art_os;
        Main.aditionalQuestions = await this.fetchData(`${global_host}/VIS2/app/question`)
        Main.elementsTypes = await fetch(`${global_host}/VIS2/app/Type/`+Main.osData.art_product).then(res => res.json())
        
        new ModalPositionOption(Main.elementsTypes, Main.osData.art_product)

        Main.formBase = await this.getFormBase()
        console.log("Base:",Main.formBase)
        
        this.main()
    }

    async main() {
        Main.AdditionalInfosForm = {}
        Object.keys(Main.aditionalQuestions).forEach(key => {
           
            Main.AdditionalInfosForm[key] = new FormSection(Main.aditionalQuestions[key], key)
        })
        const elementsList = new ElementsList(Main.elementsTypes, Main.formBase);

        document.querySelector("#submitButton").addEventListener("click", () => {
            this.submitHandler(elementsList)
        })
        document.querySelector("#addElementsButton").addEventListener("click", () => {
            elementsList.createElement()
        })
        
    }

    async getFormBase() {

        const osCode = Main.osData["art_os"]
        

        const osData = Main.osData
        if (!osData.art_description
        ) {
            return Swal.fire({
                title: 'Os não encontrada!',
                text: 'Informe um Código valido!',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(() => history.back())
        } else if (!Main.enabledProducts.includes(parseInt(osData.art_product))) {
            return Swal.fire({
                title: 'Produto indisponível!',
                text: 'Ainda estamos trabalhando nisso!',
                icon: 'warning',
                confirmButtonText: 'OK'
            }).then(() => history.back())
        } else {
            try {
                document.querySelector("#formTitle").textContent = osData.art_description
                document.querySelector("#formSubTitle").textContent = osData.art_subtitle
                const copyCode = Main.osData["copyCode"]

                if (copyCode) {
                    Main.creating = true
                    const raw_data = await fetch(`${global_host}/VIS2/app/ArtMetaData/` + copyCode)
                    let data = await raw_data.json()
                    data = JSON.parse(data.mtd_data)
                    data.elementos = JSON.parse(data.elementos)
                    data.complementos = JSON.parse(data.complementos)
             
                    return data
                }

                const raw_data = Main.osData["art_object"]
                
                let data = JSON.parse(raw_data)
                console.log(typeof(data))
                Main.creating = false

                if (data === null) {
                    throw new Error("Erro ao carregar dados!")
                }

                // data.elementos = JSON.parse(data.elementos)
                // data.complementos = JSON.parse(data.complementos)
                
                return data
            } catch (e){
                console.log(e)
                Main.creating = true
                return defaultElementsList[osData.art_product]
            }
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
                elementos: elementos,
                complementos: complements,
            }
            console.log("data:", data);
            const retorno = data

            if (Main.creating) {
                throwBackToParent(retorno)
            } else {
                throwBackToParent(retorno)
            }
        } catch (e) {
            console.log(e)
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


// https://www.vipsportsproducao.com.br/VIS2/public/index.php?
// codItem=2&
// artName=HANDEBOL - FEMININO AZUL MARIN&
// artEspec=CALÇÃO | HELANCA | AZUL MARINHO&
// artProduct=2&
// obj=