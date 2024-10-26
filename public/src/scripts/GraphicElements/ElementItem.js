import Main from "../Main.js";
export default class ElementItem {
  constructor(element, index, elementsList, elementsTypes) {
    this.element = element;
    this.index = index;
    this.elementsList = elementsList;
    this.elementsTypes = elementsTypes
    this.createItem();
  }

  createItem() {
    const li = document.createElement("li");
    li.id = "elementContainer" + this.index;
    li.classList.add("p-2")
    li.classList.add("card")
    


    const div = document.createElement("div");
    div.id = `element${this.index}`;
    div.classList.add("d-flex")
    div.classList.add("justify-content-between")
    div.classList.add("align-items-center")



    const typeSelect = document.createElement("select");
    typeSelect.name = `type${this.index}`;
    typeSelect.id = `type${this.index}`;
    typeSelect.classList.add("elementType");
    typeSelect.classList.add("custom-select");
    typeSelect.classList.add("col-2");
    typeSelect.innerHTML = `
        <option value="-1" disabled selected>Selecionar</option>
      `;
    this.elementsTypes.forEach((element, index) => {
      typeSelect.innerHTML += `
        <option value="${index}" >${element.name}</option>`
    });
    // Define o valor selecionado com base no objeto
    typeSelect.value = this.element.typeOfElement;


    const obsContainer = document.createElement("div")
    obsContainer.classList.add("col-10")
    obsContainer.classList.add("d-flex")
    obsContainer.classList.add("justify-content-between")

    const positionPreloadedName = Main.productPositions[this.element.elementPosition]
    const positionModalButton = document.createElement("button")
    positionModalButton.textContent = positionPreloadedName? positionPreloadedName.name.toUpperCase() : "Selecionar Posição"
    positionModalButton.classList.add("btn")
    positionModalButton.classList.add("ml-3")
    positionModalButton.classList.add("col-4")
    positionModalButton.id = "positionButton_" + this.index
    positionModalButton.classList.add("btn-secondary");
    positionModalButton.setAttribute('data-toggle', 'modal')
    positionModalButton.setAttribute('data-target', '#exampleModal')
    positionModalButton.onclick = () => {
      
      document.querySelectorAll(".positionOption").forEach(option => {
        option.classList.remove("selected")  
        option.onclick = (e) => {
          const selected = document.querySelector("#" + e.target.closest('button').id)
          const button = document.querySelector("#positionButton_" + this.index)
          button.textContent = selected.textContent.toUpperCase()
          this.elementsList.alterPosition(this.index, selected.id.split("_")[1]);
        }
      })
      const selectedPosition = document.querySelector("#position_"+this.element.elementPosition)
      selectedPosition.classList.add("selected")  
    }

    const descriptionPreloadedValue = this.element.elementDescription
    const descriptionInput = document.createElement("input");
    descriptionInput.classList.add("form-control")
    descriptionInput.classList.add("col-6")
    descriptionInput.type = "text";
    descriptionInput.placeholder = "Descrição do elemento";
    // Define o valor do input com base no objeto
    descriptionInput.value = descriptionPreloadedValue;

    const deleteButton = document.createElement("button");
    deleteButton.id = `deleteElement${this.index}`
    deleteButton.classList.add("btn")
    deleteButton.classList.add("btn-danger")
    deleteButton.classList.add("col-1")

    deleteButton.innerHTML = "<i class='bi bi-x-lg'></i>"
    deleteButton.onclick = () => this.elementsList.deleteElement(this.index)

    if (this.element.typeOfElement == '-1') {
      div.appendChild(typeSelect);
    } else {
      const primaryElement = document.createElement("label")
      primaryElement.textContent = this.elementsTypes[this.element.typeOfElement].name
      primaryElement.classList.add("d-flex")
      primaryElement.classList.add("align-items-center")
      div.appendChild(primaryElement);
    }
    obsContainer.appendChild(positionModalButton)

    obsContainer.appendChild(descriptionInput);
    obsContainer.appendChild(deleteButton)
    div.appendChild(obsContainer)

    

    li.appendChild(div);

    const elementsListContainer = document.getElementById("elementsListContainer");
    elementsListContainer.appendChild(li);

    // Adiciona os observadores de eventos
    this.addObservers(typeSelect, descriptionInput);
  }

  addObservers(typeSelect, descriptionInput) {
    typeSelect.addEventListener("change", (event) => {
      this.elementsList.alterType(this.index, event.target.value);
    });



    descriptionInput.addEventListener("input", (event) => {
      this.elementsList.alterDescription(this.index, event.target.value);
    });
  }
}
