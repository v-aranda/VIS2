export default class dataLoader {

    constructor(code, host) {
        this.osCode = code;
        this.hostUrl = host
        this.data = this.getFormBase(code);
        
    }

    async getFormBase(osCode) {
       
        const osData= await fetch(this.hostUrl+`/VIS2/app/Art/${this.osCode}`).then(response => response.json())
        
        console.log(osData)
        if (!osData.obj_form_atendimento
        ) {
            return Swal.fire({
                title: 'Os não encontrada!',
                text: 'Informe um Código valido!',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(() => ocultaFormVis2())
        } else {
            try {
                document.querySelector("#formTitle").textContent = osData.desc_servico
                const data = JSON.parse(osData.obj_form_atendimento)

                // data.elementos = JSON.parse(data.elementos)
                // data.complementos = JSON.parse(data.complementos)
                const infos = {
                    art_product: osData.cod_produto,
                    art_description: osData.desc_servico
                }
                return [infos,data]
            }catch(e) {
                console.log(e)
                return Swal.fire({
                    title: 'Arte Não Encontrada!',
                    text: 'Essa OS ainda não possui uma arte',
                    icon: 'info',
                    confirmButtonText: 'OK'
                }).then(() => window.location = "https://www.vipsportsproducao.com.br/VIS2/public/index.php?os=" + osCode)
            }
        }





    }
}