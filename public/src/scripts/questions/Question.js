export default class Question {
    constructor(id, infos) {
        this.id = id;
        this.infos = infos;
        this.render();
        
    }
   
    render() {
        const container = document.getElementById(this.id);
        if (!container) {
            console.error(`Element with id ${this.id} not found.`);
            return;
        }

        // Cria o título e a descrição da questão
        const questionTitle = document.createElement('h4');
        questionTitle.textContent = this.infos.title;
        container.appendChild(questionTitle);

        const questionDesc = document.createElement('p');
        questionDesc.textContent = this.infos.desc;
        container.appendChild(questionDesc);

        // Cria o grupo de alternativas

        this.infos.alternativas.forEach((alt, index) => {
            const alternativeDiv = document.createElement('div');
            alternativeDiv.className = 'form-check';
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = this.id; // Nome unico para o grupo de radio buttons
            radio.id = `response_alt_${index}`;
            radio.value = alt;
            radio.className = 'form-check-input';
            if (this.infos.justificativas.includes(index)){
            
                radio.addEventListener('click',()=>{
                    const justifyContent = document.getElementById("justify"+this.id)
                    justifyContent.style.display = 'block'
                    justifyContent.classList.add('required')
                })
            }else{
                radio.addEventListener('click',()=>{
                    const justifyContent = document.getElementById("justify"+this.id)
                    justifyContent.style.display = 'none'
                    justifyContent.classList.remove('required')
                })
            }

            const label = document.createElement('label');
            label.htmlFor = radio.id; // Associar o label ao input
            label.className = 'form-check-label';
            label.textContent = alt;

            alternativeDiv.appendChild(radio);
            alternativeDiv.appendChild(label);

            
            container.appendChild(alternativeDiv);

            

            


        });

        
    }
}
