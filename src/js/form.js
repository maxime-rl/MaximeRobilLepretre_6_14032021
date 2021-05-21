const urlParams = new URLSearchParams(window.location.search);
/**
 * DOM form elements
 */
const form = document.querySelector("#form-contact");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const inputElts = document.querySelectorAll("#first-name, #last-name, #email, #comment");
const comment = document.querySelector("#comment");
const alertComment = document.querySelector(".alert-comment");

const photographerName = (data) => {
  const nameElt = document.querySelector(".form-photographer-name");

  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParams.get("id"))) {
      nameElt.textContent = photographer.name;
    }
  });
};

const updateCheckedInputElts = () => {
  form.addEventListener("change", () => {
    inputElts.forEach(inputElt => {
      checkedInputElts(inputElt);
    });
    if (firstName.classList.contains("valid") &&
        lastName.classList.contains("valid") &&
        email.classList.contains("valid") &&
        comment.classList.contains("valid")) {
      alertComment.textContent = " ";
    }
  });
};

const checkedInputElts = (elt) => {
  if (elt.value !== "") {
    elt.classList.add("valid");
    elt.classList.remove("invalid");
    return true;
  } else {
    elt.classList.add("invalid");
    elt.classList.remove("valid");
    return false;
  }
};

const submitForm = () => {
  if (window.location.pathname.includes("photographer.html")) {
    const dialog = document.getElementById("dialog");
    const profileHeader = document.querySelector(".page-photographer-header");
    const profileContent = document.querySelector(".photographer-content");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (checkedInputElts(firstName) && checkedInputElts(lastName) && checkedInputElts(email) && checkedInputElts(comment)) {
        console.log(`Prénom : ${firstName.value}`);
        console.log(`Nom : ${lastName.value}`);
        console.log(`Email : ${email.value}`);
        console.log(`Votre message : ${comment.value}`);
        alertComment.textContent = " ";
        inputElts.forEach(inputElt => {
          inputElt.classList.remove("valid");
        });
        form.reset();

        dialog.setAttribute("aria-hidden", true);
        profileHeader.setAttribute("aria-hidden", false);
        profileContent.setAttribute("aria-hidden", false);
      } else {
        alertComment.textContent = "Vous devez remplir tous les champs du formulaire";
      }
    });
  }
};

export { photographerName };
export { submitForm };
export { updateCheckedInputElts };
