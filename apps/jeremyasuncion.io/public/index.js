/* eslint-env browser  */

(() => {
  const buttonRow = document.querySelector('.button-row');
  const typed = document.querySelector('.typed');

  const additionalStrings = [
    'Software Engineer',
    'Web Developer',
    'SJSU Student',
  ];
  const lastLoadedTime = parseInt(localStorage.getItem('lastLoaded'), 10) || 0;
  const lastLoaded = new Date(lastLoadedTime);
  const now = new Date();
  // Only show the additional strings if it has been more than one year
  // or more than one month since the user has last seen it.
  const shouldShowStrings = lastLoaded.getYear() < now.getYear()
      || lastLoaded.getMonth() < now.getMonth();

  new Typed('.typed .text', {
    backSpeed: 30,
    onComplete() {
      buttonRow.classList.remove('hidden');
      typed.classList.remove('before-buttons');
      if (shouldShowStrings) {
        localStorage.setItem('lastLoaded', Date.now());
      }
    },
    showCursor: false,
    strings: [].concat(
      shouldShowStrings ? additionalStrings : [],
      'Jeremy Asuncion',
    ),
    typeSpeed: 30,
  });

  mdc.autoInit();
})();
