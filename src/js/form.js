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
    checkedFirstNameInputElt();
    checkedLastNameInputElt();
    checkedEmailInputElt();
    checkedCommentInputElt();
  });
};

const checkedFirstNameInputElt = () => {
  if (firstName.value.length > 2) {
    firstName.classList.add("valid");
    firstName.classList.remove("invalid");
    return true;
  } else {
    firstName.classList.add("invalid");
    firstName.classList.remove("valid");
    return false;
  }
};

const checkedLastNameInputElt = () => {
  if (lastName.value.length > 2) {
    lastName.classList.add("valid");
    lastName.classList.remove("invalid");
    return true;
  } else {
    lastName.classList.add("invalid");
    lastName.classList.remove("valid");
    return false;
  }
};

const checkedCommentInputElt = () => {
  if (comment.value.length > 9) {
    comment.classList.add("valid");
    comment.classList.remove("invalid");
    return true;
  } else {
    comment.classList.add("invalid");
    comment.classList.remove("valid");
    return false;
  }
};

const checkedEmailInputElt = () => {
  if (email.value !== "") {
    email.classList.add("valid");
    email.classList.remove("invalid");
    return true;
  } else {
    email.classList.add("invalid");
    email.classList.remove("valid");
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

      if (checkedFirstNameInputElt() && checkedLastNameInputElt() && checkedEmailInputElt() && checkedCommentInputElt()) {
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
