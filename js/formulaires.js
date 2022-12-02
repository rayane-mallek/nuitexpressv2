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

const maxTurn = document.getElementById('max_turn');
maxTurn.addEventListener('change', function() {
    if (isNaN(maxTurn.value) || maxTurn.value <= 0) {
      maxTurn.value = "";
      alert('Le champ "nombre de tours max" ne peut contenir que des nombres positifs.')
    }
})

const tour = new Shepherd.Tour({
  useModalOverlay: true,
  defaultStepOptions: {
    classes: 'shadow-md bg-purple-dark',
    scrollTo: true,
    cancelIcon: {
      enabled: true
    },
  }
});

tour.addStep({
  id: 'virus-list',
  text: 'Bienvenue dans ce tutoriel. Vous pouvez ajouter une MST ici si vous le souhaitez (il y en a déjà une par défaut).',
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
  id: 'virus-list',
  text: 'Personnalisez votre MST en sélectionnant son nom.',
  attachTo: {
    element: '#containerSelectMST ',
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
  id: 'med-name',
  text: 'Les champs des médicaments fonctionnent de la même façon que les virus.',
  attachTo: {
    element: '#medicament_choice',
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
    text: 'Ce champ sert à définir le nombre de tours maximum du simulateur.',
    attachTo: {
      element: '#max_turn',
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
  text: 'Une fois que tout est bon, lancez le combat en appuyant ici !',
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