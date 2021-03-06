const profileHeader = document.querySelector(".page-photographer-header");
const profileContent = document.querySelector(".photographer-content");
const focusableEltsArr = [
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
];

const handleModalForm = () => {
  const formTriggers = document.querySelectorAll('[aria-haspopup="dialog"]');

  const open = function (dialog) {
    const focusableElts = dialog.querySelectorAll(focusableEltsArr);
    const firstFocusableElt = focusableElts[0];
    const lastFocusableElt = focusableElts[focusableElts.length - 1];

    document.body.style.overflow = "hidden";
    dialog.style.display = "flex";
    dialog.setAttribute("aria-hidden", false);
    dialog.setAttribute("aria-modal", true);
    profileHeader.setAttribute("aria-hidden", true);
    profileContent.setAttribute("aria-hidden", true);

    // return if no focusable element
    if (!firstFocusableElt) {
      return;
    }

    window.setTimeout(() => {
      firstFocusableElt.focus();

      // trapping focus inside the dialog
      focusableElts.forEach((focusableElt) => {
        if (focusableElt.addEventListener) {
          focusableElt.addEventListener("keydown", (e) => {
            const isTabPressed = e.key === "Tab" || e.keyCode === 9;

            if (!isTabPressed) {
              return;
            }

            if (e.shiftKey) {
              if (e.target === firstFocusableElt) { // shift + tab
                e.preventDefault();

                lastFocusableElt.focus();
              }
            } else if (e.target === lastFocusableElt) { // tab
              e.preventDefault();

              firstFocusableElt.focus();
            }
          });
        }
      });
    }, 100);
  };

  const close = function (dialog, trigger) {
    document.body.style.overflow = "auto";
    dialog.style.display = "none";
    dialog.setAttribute("aria-hidden", true);
    dialog.setAttribute("aria-modal", false);
    profileHeader.setAttribute("aria-hidden", false);
    profileContent.setAttribute("aria-hidden", false);

    // restoring focus
    trigger.focus();
  };

  formTriggers.forEach((trigger) => {
    const dialog = document.getElementById(trigger.getAttribute("aria-controls"));
    const dismissTriggers = dialog.querySelectorAll("[data-dismiss]");

    // open dialog
    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      open(dialog);
    });

    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        open(dialog);
      }
    });

    // close dialog
    dismissTriggers.forEach((dismissTrigger) => {
      const dismissDialog = document.getElementById(dismissTrigger.dataset.dismiss);

      dismissTrigger.addEventListener("click", (e) => {
        e.preventDefault();

        close(dismissDialog, trigger);
      });
    });

    dialog.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        close(dialog, trigger);
      }
    });

    window.addEventListener("click", (e) => {
      if (e.target === dialog) {
        close(dialog, trigger);
      }
    });
  });
};

export { handleModalForm };
