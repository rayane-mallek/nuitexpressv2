document.onkeydown = function(e) {
  if (e.key === 'Enter') {
    try {
      document.getElementsByClassName(' shepherd-button ')[0].click();
    } catch {}
  }
}

const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    classes: 'shadow-md bg-purple-dark',
    scrollTo: true
  }
});

document
tour.addStep({
    id: 'virus-name',
    text: 'Veillez entrer un nom pour le virus.',
    attachTo: {
      element: '#name_virus',
      on: 'bottom'
    },
    buttons: [
      {
        text: 'Next',
        action: tour.next
      }
    ]
});

tour.addStep({
    id: 'medicament-name',
    text: 'Veillez entrer un nom pour le médicament.',
    attachTo: {
      element: '#name_medicament',
      on: 'bottom'
    },
    buttons: [
      {
        text: 'Next',
        action: tour.next
      }
    ]
});

tour.start();