export class Select {
  constructor (elt) {
    this.elt = elt;
    this.options = getFormattedOptions(elt.querySelectorAll("option"));
    this.customElt = document.createElement("div");
    this.labelElt = document.createElement("span");
    this.optionsCustomElt = document.createElement("ul");
    setupCustomElement(this);
    elt.style.display = "none";
    elt.after(this.customElt);
  }

  get selectedOption () {
    return this.options.find(option => option.selected);
  }

  get selectedOptionIndex () {
    return this.options.indexOf(this.selectedOption);
  }

  selectValue (value) {
    const newSelectedOption = this.options.find(option => {
      return option.value === value;
    });
    const prevSelectedOption = this.selectedOption;
    prevSelectedOption.selected = false;
    prevSelectedOption.elt.selected = false;

    newSelectedOption.selected = true;
    newSelectedOption.elt.selected = true;

    this.labelElt.innerText = newSelectedOption.label;
    this.optionsCustomElt
      .querySelector(`[data-value="${prevSelectedOption.value}"]`)
      .classList.remove("selected");
    this.optionsCustomElt
      .querySelector(`[data-value="${newSelectedOption.value}"]`)
      .classList.add("selected");
  }
}

function setupCustomElement (select) {
  select.customElt.classList.add("custom-select-container");
  select.customElt.tabIndex = 0;

  select.labelElt.classList.add("custom-select-value");
  select.labelElt.innerText = select.selectedOption.value;
  select.customElt.append(select.labelElt);

  select.optionsCustomElt.classList.add("custom-select-options");

  select.options.forEach(option => {
    const optionElt = document.createElement("li");
    optionElt.classList.add("custom-select-option");
    optionElt.classList.toggle("selected", option.selected);
    optionElt.innerText = option.label;
    optionElt.dataset.value = option.value;

    optionElt.addEventListener("click", () => {
      select.selectValue(option.value);
      select.optionsCustomElt.classList.remove("show");
    });

    select.optionsCustomElt.append(optionElt);
  });

  select.customElt.append(select.optionsCustomElt);

  select.labelElt.addEventListener("click", () => {
    select.optionsCustomElt.classList.toggle("show");
  });

  select.labelElt.addEventListener("blur", () => {
    select.optionsCustomElt.classList.remove("show");
  });

  select.customElt.addEventListener("keydown", e => {
    switch (e.code) {
      case "Enter":
      case "Space":
        select.optionsCustomElt.classList.toggle("show");
        break;
      case "ArrowUp":
        // eslint-disable-next-line no-case-declarations
        const prevOption = select.options[select.selectedOptionIndex - 1];
        if (prevOption) {
          select.selectValue(prevOption.value);
        }
        break;
      case "ArrowDown":
        // eslint-disable-next-line no-case-declarations
        const nextOption = select.options[select.selectedOptionIndex + 1];
        if (nextOption) {
          select.selectValue(nextOption.value);
        }
        break;
      case "Escape":
        select.optionsCustomElt.classList.remove("show");
        break;
    }
  });
}

function getFormattedOptions (optionElts) {
  return [...optionElts].map(optionElt => {
    return {
      value: optionElt.value,
      label: optionElt.label,
      selected: optionElt.selected,
      elt: optionElt
    };
  });
}
