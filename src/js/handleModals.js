const profileHeader = document.querySelector(".page-photographer-header");
const profileContent = document.querySelector(".photographer-content");
const focusableEltsArr = [
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])'
];
const keyCodes = {
  tab: 9,
  enter: 13,
  escape: 27
};

const handleModals = () => {
  const triggers = document.querySelectorAll('[aria-haspopup="dialog"]');

  const open = function (dialog) {
    const focusableElts = dialog.querySelectorAll(focusableEltsArr);
    const firstFocusableElt = focusableElts[0];
    const lastFocusableElt = focusableElts[focusableElts.length - 1];

    dialog.setAttribute("aria-hidden", false);
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
            const tab = e.which === keyCodes.tab;

            if (!tab) {
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
    dialog.setAttribute("aria-hidden", true);
    profileHeader.setAttribute("aria-hidden", false);
    profileContent.setAttribute("aria-hidden", false);

    // restoring focus
    trigger.focus();
  };

  triggers.forEach((trigger) => {
    const dialog = document.getElementById(trigger.getAttribute("aria-controls"));
    const dismissTriggers = dialog.querySelectorAll("[data-dismiss]");

    // open dialog
    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      open(dialog);
    });

    trigger.addEventListener("keydown", (e) => {
      if (e.which === keyCodes.enter) {
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
      if (e.which === keyCodes.escape) {
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

export { handleModals };
