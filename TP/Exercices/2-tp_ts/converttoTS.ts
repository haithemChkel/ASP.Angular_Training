// Reprendre le code ES6 du TP précédent et l’écrire en TypeScript
// Installer typescript sur la machine et compiler le script TypeScript en script JavaScript

function getCategorie(age) {
    if (age >= 18) {
      var categorie = "Majeur";
    } else {
      var categorie = "Mineur";
    }

    var resultat = "La personne est " + categorie;
    return resultat;
  }

  var resultat = getCategorie(19);
  console.log(resultat);

  function processAnnee(annee, cb) {
    var age = new Date().getFullYear() - annee; return cb(age);
  }

  processAnnee(1990, function (age) {
    console.log("Tu as " + age + " ans");
  })