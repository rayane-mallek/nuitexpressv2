document.onkeydown = function(e) {
  if (e.key === 'Enter') {
    try {
      document.getElementsByClassName(' shepherd-button ')[0].click();
    } catch {}
  }
}

document.getElementById('addMST').addEventListener('click', function(e) {
  try {
    document.getElementsByClassName(' shepherd-button ')[0].click();
  } catch {}
})

const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    classes: 'shadow-md bg-purple-dark',
    scrollTo: true
  }
});

tour.addStep({
  id: 'virus-list',
  text: 'Vous pouvez sélectionner ici le virus que vous souhaitez ajouter au combat.',
  attachTo: {
    element: '#MST',
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
  id: 'virus-list',
  text: 'Cliquez ici si vous souhaitez ajouter une nouvelle MST au combat.',
  attachTo: {
    element: '#addMST',
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
    id: 'virus-name',
    text: 'Vous pouvez même nommer votre MST !',
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
  id: 'battle-start',
  text: 'Reproduisez les mêmes étapes que le virus pour ajouter un médicament au combat, puis lancez-le en appuyant ici !',
  attachTo: {
    element: '#startButton',
    on: 'bottom'
  },
  buttons: [
    {
      text: 'Fin du guide',
      action: tour.next
    }
  ]
});


tour.start();