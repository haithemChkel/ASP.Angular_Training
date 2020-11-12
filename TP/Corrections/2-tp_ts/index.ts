// Reprendre le code ES6 du TP précédent et l’écrire en TypeScript
// Installer typescript sur la machine et compiler le script TypeScript en script JavaScript

const getCategorie = (age: number) => {
  const categorie = (age >= 18) ? 'Majeur' : 'Mineur';
  return `La personne est ${categorie}`;
}

document.getElementById("demo1")!.innerHTML = getCategorie(19);
// ! post-fix expression operator may be used to assert that its operand is non-null and non-undefined in contexts where the type checker is unable to conclude that fact

const processAnnee = (annee: number, cb: (age: number) => void) => {
  const age: number = new Date().getFullYear() - annee;
  return cb(age);
}

processAnnee(1990, (age: number) => console.log(`Tu as ${age} ans`));
processAnnee(1990, (age: number) => {
  const demoElement: HTMLElement | null = document.getElementById("demo2");
  if (demoElement) {
    demoElement.innerHTML = `Tu as ${age} ans`;
  }
});


