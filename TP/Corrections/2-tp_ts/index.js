"use strict";
// Reprendre le code ES6 du TP précédent et l’écrire en TypeScript
// Installer typescript sur la machine et compiler le script TypeScript en script JavaScript
var getCategorie = function (age) {
    var categorie;
    if (age >= 18) {
        categorie = "Majeur";
    }
    else {
        categorie = "Mineur";
    }
    return "La personne est " + categorie;
};
document.getElementById("demo1").innerHTML = getCategorie(19);
// ! post-fix expression operator may be used to assert that its operand is non-null and non-undefined in contexts where the type checker is unable to conclude that fact
var processAnnee = function (annee, cb) {
    var age = new Date().getFullYear() - annee;
    return cb(age);
};
processAnnee(1990, function (age) { return console.log("Tu as " + age + " ans"); });
processAnnee(1990, function (age) {
    var demoElement = document.getElementById("demo2");
    if (demoElement) {
        demoElement.innerHTML = "Tu as " + age + " ans";
    }
});
