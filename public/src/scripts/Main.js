import ElementsList from "./GraphicElements/ElementsList.js"
import ModalPositionOption from "./GraphicElements/ModalPositionOption.js";
import FormSection from "./questions/FormSection.js";

const dev_host = "http://localhost"
const prod_host = "https://www.vipsportsproducao.com.br"
var global_host = prod_host

const defaultElementsList = {
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

async function createArt(resp, osCode) {
    try {
        const rawData = await fetch('http://localhost/VIS2/app/Os/' + osCode)
        const osData = await rawData.json()


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
                text: data,
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
            Swal.fire({
                title: 'Dados Atualizados!',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            })
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
export default class Main {
    static elementsTypes
    static productPositions

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
        const urlParams = new URLSearchParams(window.location.search);
        Main.osCode = urlParams.get('os');
        const copyCode = urlParams.get('copy')
        Main.productPositions = await this.fetchData("./src/data/ProductPositions.json")
        Main.aditionalQuestions = await this.fetchData("./src/data/AditionalQuestions.json")
        Main.elementsTypes = await this.fetchData("./src/data/ElementsTypes.json")

        Main.formBase = await this.getFormBase(Main.osCode, copyCode)
        this.main()
    }
    async main() {
        Main.AdditionalInfosForm = {}
        Object.keys(Main.aditionalQuestions).forEach(key => {
            Main.AdditionalInfosForm[key] = new FormSection(Main.aditionalQuestions[key], key)
        })
        new ModalPositionOption(Main.productPositions)
        const elementsList = new ElementsList(Main.elementsTypes, Main.formBase);

        document.querySelector("#submitButton").addEventListener("click", () => {
            this.submitHandler(elementsList)
        })
        document.querySelector("#addElementsButton").addEventListener("click", () => {
            elementsList.createElement()
        })

    }

    async getFormBase(osCode, copyCode = false) {


        const rawData = await fetch(`${global_host}/VIS2/app/Os/${osCode}`)
        const osData = await rawData.json()
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

                if (copyCode) {
                    Main.creating = true
                    const raw_data = await fetch(`${global_host}/VIS2/app/ArtMetaData/` + copyCode)
                    let data = await raw_data.json()
                    data = JSON.parse(data.mtd_data)
                    data.elementos = JSON.parse(data.elementos)
                    data.complementos = JSON.parse(data.complementos)
                    return data
                }

                const raw_data = await fetch(`${global_host}/VIS2/app/ArtMetaData/` + osCode)
                let data = await raw_data.json()
                data = JSON.parse(data.mtd_data)
                Main.creating = false
                data.elementos = JSON.parse(data.elementos)
                data.complementos = JSON.parse(data.complementos)
                return data
            } catch {
                Main.creating = true
                return Swal.fire({
                    title: 'Arte Não Encontrada!',
                    text: 'Essa OS ainda não possui uma arte',
                    icon: 'info',
                    confirmButtonText: 'OK'
                }).then(() => defaultElementsList)
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
                elementos: JSON.stringify(elementos),
                complementos: JSON.stringify(complements),
            }
            const retorno = {
                mtd_art: Main.osCode,
                mtd_data: JSON.stringify(data)
            }

            if (Main.creating) {
                createArt(retorno, Main.osCode)
            } else {
                updateArtMetaData(retorno, Main.osCode)
            }
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


