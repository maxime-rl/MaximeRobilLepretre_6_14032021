const urlParams = new URLSearchParams(window.location.search);
/**
 * DOM form elements
 */
const form = document.querySelector("#form-contact");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const email = document.querySelector("#email");
const comment = document.querySelector("#comment");

const photographerName = (data) => {
  const nameElt = document.querySelector(".form-photographer-name");

  data.photographers.forEach((photographer) => {
    if (photographer.id === Number(urlParams.get("id"))) {
      nameElt.textContent = photographer.name;
    }
  });
};

if (window.location.pathname.includes("photographer.html")) {
  const dialog = document.getElementById("dialog");
  const profileHeader = document.querySelector(".page-photographer-header");
  const profileContent = document.querySelector(".photographer-content");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if ((firstName.value && lastName.value && email.value && comment.value) !== "") {
      console.log(`Prénom : ${firstName.value}`);
      console.log(`Nom : ${lastName.value}`);
      console.log(`Email : ${email.value}`);
      console.log(`Votre message : ${comment.value}`);

      dialog.setAttribute("aria-hidden", true);
      profileHeader.setAttribute("aria-hidden", false);
      profileContent.setAttribute("aria-hidden", false);
    }
  });
}

export { photographerName };
