export default class dataLoader {

    constructor(code, host) {
        this.osCode = code;
        this.hostUrl = host
        this.data = this.getFormBase(code);
        
    }

    async getFormBase(osCode) {
       
        const osData= await fetch(this.hostUrl+`/VIS2/app/Os/${this.osCode}`).then(response => response.json())
    
        console.log(osData)
        if (!osData.art_description
        ) {
            return Swal.fire({
                title: 'Os não encontrada!',
                text: 'Informe um Código valido!',
                icon: 'error',
                confirmButtonText: 'OK'
            }).then(() => history.back())
        } else {
            try {
                document.querySelector("#formTitle").textContent = osData.art_description

                const raw_data = await fetch(this.hostUrl+`/VIS2/app/ArtMetaData/` + osCode)
                let data = await raw_data.json()
                data = JSON.parse(data.mtd_data)

                data.elementos = JSON.parse(data.elementos)
                data.complementos = JSON.parse(data.complementos)
                return data
            } catch {
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