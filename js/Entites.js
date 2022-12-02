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
        case 'Papillomavirus':
            parameters.class = 'MST';
            parameters.health = 40;
            parameters.attack = 7;
            parameters.defense = 1;
            parameters.speed = 10;
            parameters.image = 'assets/images/entites/Papillomavirus.png';
            break;
        case 'Syphilis':
            parameters.class = 'MST';
            parameters.health = 10;
            parameters.attack = 10;
            parameters.defense = 10;
            parameters.speed = 14;
            parameters.image = 'assets/images/entites/Syphilis.png';
            break;
        case 'VIH':
            parameters.class = 'MST';
            parameters.health = 50;
            parameters.attack = 50;
            parameters.defense = 10;
            parameters.speed = 5;
            parameters.image = 'assets/images/entites/VIH.png';
            break;
        case 'Vaccin':
            parameters.class = 'Medicament';
            parameters.health = 500;
            parameters.attack = 5;
            parameters.defense = 5;
            parameters.speed = 5;
            parameters.image = 'assets/images/entites/Vaccin.png';
            break;
        case 'Preservatif':
            parameters.class = 'Medicament';
            parameters.health = 1;
            parameters.attack = 9999;
            parameters.defense = 9999;
            parameters.speed = 1;
            parameters.image = 'assets/images/entites/Preservatif.png';
            break;
        case 'Contraception':
            parameters.class = 'Medicament';
            parameters.health = 100;
            parameters.attack = 10;
            parameters.defense = 10;
            parameters.speed = 10;
            parameters.image = 'assets/images/entites/Contraception.png';
            break;

    }
    return parameters;
}