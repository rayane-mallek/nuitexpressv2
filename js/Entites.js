function Entite(name) {
    this.name = name;
    this.class = 'Entite';
    this.health = generateParameters(name).health;
    this.attack = generateParameters(name).attack;
    this.defense = generateParameters(name).defense;
    this.speed = generateParameters(name).speed;
    this.image = generateParameters(name).image;
    this.isAlive = true;
}

function generateParameters(name) {
    let parameters = {
        health: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        image: '',
    }
    switch (name) {
        case 'Xx_Hepatite_xX':
            parameters.class = 'MST';
            parameters.health = 20;
            parameters.attack = 1;
            parameters.defense = 1;
            parameters.speed = 1;
            parameters.image = 'assets/images/entites/virus.png';
            break;
        case 'Turbo VIH':
            parameters.class = 'MST';
            parameters.health = 10;
            parameters.attack = 10;
            parameters.defense = 10;
            parameters.speed = 10;
            parameters.image = 'assets/images/entites/virus.png';
            break;
        case 'Mega Sida':
            parameters.class = 'MST';
            parameters.health = 10;
            parameters.attack = 10;
            parameters.defense = 10;
            parameters.speed = 10;
            parameters.image = 'assets/images/entites/virus.png';
            break;
        case 'Antibiotique':
            parameters.class = 'Medicament';
            parameters.health = 500;
            parameters.attack = 5;
            parameters.defense = 5;
            parameters.speed = 5;
            parameters.image = 'assets/images/entites/medic.png';
            break;
        case 'Preservatif':
            parameters.class = 'Medicament';
            parameters.health = 1;
            parameters.attack = 9999;
            parameters.defense = 9999;
            parameters.speed = 1;
            parameters.image = 'assets/images/entites/medic.png';
            break;
        case 'Contraception':
            parameters.class = 'Medicament';
            parameters.health = 100;
            parameters.attack = 10;
            parameters.defense = 10;
            parameters.speed = 10;
            parameters.image = 'assets/images/entites/medic.png';
            break;

    }
    return parameters;
}