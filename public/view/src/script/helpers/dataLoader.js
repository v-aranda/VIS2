export default class dataLoader {

    constructor(code, host) {
        this.osCode = code;
        this.hostUrl = host
        this.data = this.getFormBase(code);
        
    }

    async getFormBase(osCode) {
       
        const osData= await fetch(this.hostUrl+`/VIS2/app/Art/${this.osCode}`).then(response => response.json())
        
        if (!osData.obj_form_atendimento
        ) {
            return Swal.fire({
                title: 'Não Encontrado!',
                text: 'Serviço não possui especificações de arte',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(() => window.parent.ocultaFormVis2())
        } else {
            try {
                document.querySelector("#formTitle").textContent = osData.desc_servico
                const data = JSON.parse(osData.obj_form_atendimento)

                console.log("res:",data)
                const infos = {
                    art_product: osData.cod_produto,
                    art_description: osData.desc_servico
                }
                return [infos,data]
            }catch(e) {
                return Swal.fire({
                    title: 'Não Encontrado!',
                    text: 'Serviço não possui especificações de arte',
                    icon: 'info',
                    confirmButtonText: 'OK'
                }).then(() => window.parent.ocultaFormVis2())
            }
        }





    }
}