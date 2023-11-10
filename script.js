class Animal {
    constructor(type, nom, age) {
      this.type = type;
      this.nom = nom;
      this.age = age;
    }
  
    getAllAttributes() {
      return `Type: ${this.type}, Nom: ${this.nom}, Age: ${this.age}`;
    }
  }
  
  class AnimalList {
    constructor() {
      this.animals = [];
    }
  
    addAnimal(animal) {
      this.animals.push(animal);
    }
  
    getAllAnimals() {
      return this.animals.map(animal => animal.getAllAttributes());
    }
  }
  
  function calculerAgeMoyenParType(type, animalList) {
    const animauxDuType = animalList.animals.filter(animal => animal.type === type);
  
    if (animauxDuType.length === 0) {
      return 0;
    }
  
    const sommeAges = animauxDuType.reduce((total, animal) => total + animal.age, 0);
    const ageMoyen = sommeAges / animauxDuType.length;
  
    return ageMoyen;
  }

  function updateAverageAge() {
    ul.textContent = ""; // Efface la liste actuelle
    //ul.innerHtml = ""; 
    averageAgeDiv.textContent = "";
  
    const types = ["Chien", "Chat"];
    types.forEach(type => {
      const ageMoyen = calculerAgeMoyenParType(type, animalList);
      const p = document.createElement("p");
      p.textContent = `Âge moyen des ${type}s : ${ageMoyen} ans`;
      averageAgeDiv.appendChild(p);
    });
  
    // Récrée la liste d'animaux
    animalList.getAllAnimals().forEach(animal => {
      const li = document.createElement("li");
      li.textContent = animal;
      ul.appendChild(li);
    });
  }
  
  const animalForm = document.getElementById("animalForm");
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const typeInput = document.getElementById("type");
  const typeValueOutput = document.getElementById("typeValue");
  
  // Créez l'objet AnimalList
const animalList = new AnimalList();

// Ajoutez quelques animaux initiaux pour testing
const chien1 = new Animal("Chien", "Max", 3);
const chien2 = new Animal("Chien", "MMelk  ", 4);
const chat1 = new Animal("Chat", "Toutou", 5);
const chat2 = new Animal("Chat", "Kitty, Hello", 7);

//ajout dans la liste
animalList.addAnimal(chien1);
animalList.addAnimal(chien2);
animalList.addAnimal(chat1);
animalList.addAnimal(chat2);

const ul = document.getElementById("animalList");
var averageAgeDiv = document.getElementById("averageAge");



updateAverageAge();

animalForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = nameInput.value;
  const age = parseInt(ageInput.value, 10);
  const type = typeInput.value === "1" ? "Chien" : "Chat";

  const animal = new Animal(type, name, age);
  animalList.addAnimal(animal);

  nameInput.value = "";
  ageInput.value = "";

  updateAverageAge();
});
