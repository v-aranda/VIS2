import global_host from "../../../config.js";
import Main from "../Main.js";



class ElementButton {
  constructor(id, styles, text = "", handlers) {
    this.render
    this.id = id;
    this.text = text
    this.styles = styles
    this.handlers = handlers
  }

}

class PositionButton extends ElementButton {
  constructor(id, styles, text, handlers) {
    super(id, styles, text, handlers)
    this.createButton()
  }
  createButton() {

    const buttonElemment = document.createElement("button")
    buttonElemment.onclick = null
    buttonElemment.innerHTML = this.text
    buttonElemment.id = this.id

    buttonElemment.classList.add(...this.styles);

    buttonElemment.setAttribute('data-toggle', 'modal')
    buttonElemment.setAttribute('data-target', '#exampleModal')


    buttonElemment.onclick = () => this.handlers.forEach(handler => handler())
    this.render = buttonElemment
  }
}
class DeleteButton extends ElementButton {
  constructor(id, styles, handlers) {
    super(id, styles, "", handlers)
    this.createButton()
  }
  createButton() {

    const buttonElemment = document.createElement("button")
    buttonElemment.onclick = null
    buttonElemment.innerHTML = "<i class='bi bi-x-lg'></i>"
    buttonElemment.id = this.id

    buttonElemment.classList.add(...this.styles);

    buttonElemment.onclick = () => this.handlers.forEach(handler => handler())
    this.render = buttonElemment
  }
}


export default class ElementItem {
  constructor(element, index, elementsList, elementsTypes) {
    this.element = element;
    this.index = index;
    this.elementsList = elementsList;
    this.elementsTypes = elementsTypes;
    this.positionsList = [];
    this.createItem();

  }

  async openPositionModal(elementType) {
    $(".positionOption.selected").removeClass("selected")
    $(`#${Main.osData.art_product}-${elementType}-${this.element.elementPosition}`).addClass("selected")
    const lists = this.elementsList
    const index = this.index

    $(".element_" + elementType).off()
    $(".element_" + elementType).on("click", function () {
      $(".positionOption.selected").removeClass("selected")
      $(this).addClass("selected")
      const selected = document.querySelector(".selected")
      lists.alterPosition(index , selected.id.split("-")[2]);
      $("#positionButton_" + index).text(selected.textContent.toUpperCase())
    })
    $(".positionOption").hide()
    $(".element_" + elementType).fadeIn()
  }
  async createItem() {
    // Define o valor selecionado com base no objeto
    const selected = (typeOfElement) => this.elementsTypes.filter(type => type.ety_id == typeOfElement);

    const elementsListContainer = document.getElementById("elementsListContainer");

    const li = document.createElement("li");
    li.id = "elementContainer" + this.index;
    li.classList.add("p-2")
    li.classList.add("card")

    const div = document.createElement("div");
    div.id = `element${this.index}`;
    div.classList.add("d-flex")
    div.classList.add("justify-content-between")
    div.classList.add("align-items-center")

    const obsContainer = document.createElement("div")
    obsContainer.classList.add("col-10")
    obsContainer.classList.add("d-flex")
    obsContainer.classList.add("justify-content-between")

    if (this.element.typeOfElement == '-1') {
      const typeSelect = document.createElement("select");
      typeSelect.name = `type${this.index}`;
      typeSelect.id = `type${this.index}`;
      typeSelect.classList.add("elementType", "custom-select", "col-2");

      const option = document.createElement("option");
      option.value = -1;
      option.textContent = "Selecione um Elemento";
      typeSelect.appendChild(option);

      this.elementsTypes.forEach((element) => {
        const option = document.createElement("option");
        option.value = element.ety_id;
        option.textContent = element.ety_name;
        typeSelect.appendChild(option);
      });
      typeSelect.value = this.elementsTypes.indexOf(...selected(this.element.typeOfElement))

      typeSelect.addEventListener("change", (event) => {

        this.elementsList.alterType(this.index, event.target.value);
        const button = document.querySelector("#positionButton_" + this.index)
        button.textContent = "Selecionar Posição"
        this.elementsList.alterPosition(this.index, '-1');

        document.querySelector("#positionButton_" + this.index).onClick = () => {
          this.openPositionModal(event.target.value)
        }
      });
      div.appendChild(typeSelect);

      const positionModalButton = new PositionButton(
        `positionButton_${this.index}`,
        ["btn-secondary", "btn", "ml-3", "col-4"],
        "Selecionar Posição",
        [
          () => this.openPositionModal(this.element.typeOfElement)
        ]
      )
      obsContainer.appendChild(positionModalButton.render)
    }
    else {
      this.positionsList = await fetch(`${global_host}/VIS2/app/Position/${Main.osData.art_product}/${this.element.typeOfElement}`).then(res => res.json())

      const primaryElement = document.createElement("label")
      primaryElement.textContent = selected(this.element.typeOfElement)[0].ety_name
      primaryElement.classList.add("d-flex", "align-items-center")
      div.appendChild(primaryElement);

      const positionPreloadedName = this.positionsList.filter(position => this.element.elementPosition == position.pos_id)[0].pos_name.toUpperCase()
      const positionModalButton = new PositionButton(
        `positionButton_${this.index}`,
        ["btn-secondary", "btn", "ml-3", "col-4"],
        positionPreloadedName,
        [
          () => this.openPositionModal(this.element.typeOfElement)
        ]
      )
      obsContainer.appendChild(positionModalButton.render)
    }



    const descriptionInput = document.createElement("input");
    descriptionInput.classList.add("form-control", "col-6")
    descriptionInput.type = "text";
    descriptionInput.placeholder = "Descrição do elemento";
    descriptionInput.value = this.element.elementDescription;

    descriptionInput.addEventListener("input", (event) => {
      this.elementsList.alterDescription(this.index, event.target.value);
    });
    obsContainer.appendChild(descriptionInput);

    const deleteButton = new DeleteButton(
      `deleteElement${this.index}`,
      ["btn", "btn-danger", "col-1"],
      [
        () => this.elementsList.deleteElement(this.index)
      ]
    )
    obsContainer.appendChild(deleteButton.render)

    div.appendChild(obsContainer)

    li.appendChild(div);

    elementsListContainer.appendChild(li);

  }
}
