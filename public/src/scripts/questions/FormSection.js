import Question from "./Question.js";
import Main from "../Main.js"

export default class FormSection {
    constructor(questionsData, codigo) {
        this.questionsData = questionsData;
        this.codigo = codigo;
        this.id = `aditionalFormSection_${codigo}`;

        if (questionsData.length > 0) {
            this.render();
        }
       
    }

    render() {
        const container = document.createElement('div');
        const containerContent = document.createElement('div');
        container.id = this.id;
        // Titulo da Secção
        const containerTitle = document.createElement("header")
        const containerTitleText = document.createElement("h4")
        containerTitleText.textContent = Main.elementsTypes[this.codigo].name
        containerTitle.appendChild(containerTitleText)
        containerTitle.classList.add("d-flex")
        containerTitle.classList.add("align-items-center")
        containerTitle.classList.add("bg-secondary")
        containerTitle.classList.add("text-center")
        containerTitle.classList.add("justify-content-center")
        containerTitle.classList.add("text-white")
        containerTitle.classList.add("py-1")
        containerTitle.classList.add("col-1")




        container.className = 'form-section';
        if (this.questionsData.length > 0) {
            container.classList.add("card")
        }
        container.style.flexDirection = "row"

        document.querySelector("#AditionalInfos").appendChild(container);
        container.appendChild(containerTitle)
        container.appendChild(containerContent)
        this.questionsData.forEach(questionData => {
            const questionContainer = document.createElement('div');
            questionContainer.className = 'question-container';
            questionContainer.classList.add("p-4")

            questionContainer.id = questionData.id

            // Cria a área de justificativa

            const justifyArea = document.createElement('div');
            justifyArea.id = `justify${questionData.id}`;
            justifyArea.className = 'justify-area';
            justifyArea.style.display = 'none';

            // Adiciona um campo de texto para a justificativa
            const textArea = document.createElement('textarea');
            textArea.id = `obs${questionData.id}`;
            textArea.placeholder = 'Justifique sua resposta aqui...';
            textArea.classList.add("card", "col-12", "mt-2")
            justifyArea.appendChild(textArea);


            containerContent.appendChild(questionContainer);
            new Question(questionData.id, questionData.infos);
            questionContainer.appendChild(justifyArea);

        });

        container.style.display = "none"
    }

    getAnswers() {
        const answers = [];
        this.questionsData.forEach(questionData => {

            const answer = {
                question: questionData.id,
                resume: questionData.infos.resume,
                alternative: null,
                response: null,

            };

            // Obtem a resposta selecionada
            const selectedAnswer = document.querySelector(`input[name="${questionData.id}"]:checked`);
            if (selectedAnswer) {
                answer.response = selectedAnswer.value;
            } else {
                throw new Error("Preencha todas as informações adicionais")
            }

            // Obtem a justificativa, se houver
            const justifyTextArea = document.getElementById(`obs${questionData.id}`);

            const selectedAnswerIndex = questionData.infos.alternativas.indexOf(selectedAnswer.value)
            answer.alternative = selectedAnswerIndex
            const justifyIsRequired = questionData.infos.justificativas.includes(selectedAnswerIndex)
            if (justifyIsRequired) {
                if (justifyTextArea.value) {
                    answer.justify = justifyTextArea.value;
                } else {
                    throw new Error("Preencha as Observações em branco")
                }

            }

            answers.push(answer);
        });
        return answers;
    }
    reply(answer){
        answer.forEach(question=>{
            const questionContainer = document.getElementById(question.question)
            if(questionContainer){
                const questionReply = questionContainer.querySelectorAll("#response_alt_"+question.alternative)
                questionReply.forEach(reply=>{
                    reply.setAttribute("checked", true)
                    if(question.justify){
                       const justify = document.querySelector("#justify"+question.question)
                       justify.style.display = "block"
                       justify.querySelector(".card").value = question.justify
                    }
                })
            
            }
            
        })
    }
}