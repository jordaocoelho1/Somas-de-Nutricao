function calculate() {
  // Obtendo valores dos campos de entrada
  const name = document.getElementById("nome").value;
  const age = parseInt(document.getElementById("idade").value);
  const weight = parseFloat(document.getElementById("peso").value);
  const height = parseFloat(document.getElementById("altura").value);
  const activity = document.getElementById("activity").value.toLowerCase();
  const gender = document.getElementById("gender").value;

  // Cálculo do IMC
  const imc = weight / (height * height);
  const classImc = (imc) => {
    if (imc < 16) {
      return "Magreza Grau III"
    } else if (16 <= imc < 16.9) {
      return "Magreza Grau II"
    } else if (17 <= imc < 18.4) {
      return "Magreza Grau I" 
    } else if (18.5 <= imc <= 24.9) {
      return "Peso Normal"
    } else if (25 <= imc <= 29.9 ) {
      return
    }
  }
  // Cálculo do Peso Ideal (PI) - Min, Med, Max
  const ptMin = (gender) => (gender.toLowerCase() === "f" ? 18.7 : 20.1);
  const ptMed = (gender) => (gender.toLowerCase() === "f" ? 20.8 : 22);
  const ptMax = (gender) => (gender.toLowerCase() === "f" ? 23.8 : 25);

  const piMin = ptMin(gender) * (height * height);
  const piMed = ptMed(gender) * (height * height);
  const piMax = ptMax(gender) * (height * height);

  // Cálculo do Peso Ajustado (PAj)
  const paj = (piMed - weight) * 0.25 + weight;

  // Cálculo da Taxa Metabólica Basal (TMB)
  const firstTmb = (gender, age) => {
    if (age < 18) {
      return "Idade muito baixa";
    }
    if (gender.toLowerCase() === "f") {
      if (age >= 18 && age < 30) {
        return 14.7;
      } else if (age >= 30 && age <= 60) {
        return 8.7;
      } else if (age > 60) {
        return 10.5;
      }
    } else if (gender.toLowerCase() === "m") {
      if (age >= 18 && age < 30) {
        return 15.3;
      } else if (age >= 30 && age <= 60) {
        return 11.6;
      } else if (age > 60) {
        return 13.5;
      }
    }
    return "Idade fora do intervalo permitido";
  };

  const secondTmb = (gender, age) => {
    if (gender.toLowerCase() === "f") {
      // Verifica se o gênero é feminino
      if (age >= 18 && age < 30) {
        return 496; // Feminino e idade entre 18 e 29 anos
      } else if (age >= 30 && age <= 60) {
        return 829; // Feminino e idade entre 30 e 60 anos
      } else if (age > 60) {
        return 596; // Feminino e mais de 60 anos
      }
    } else if (gender.toLowerCase() === "m") {
      // Verifica se o gênero é masculino
      if (age >= 18 && age < 30) {
        return 679; // Masculino e idade entre 18 e 29 anos
      } else if (age >= 30 && age <= 60) {
        return 879; // Masculino e idade entre 30 e 60 anos
      } else if (age > 60) {
        return 487; // Masculino e mais de 60 anos
      }
    }

    // Caso a idade seja fora do intervalo
    return "Idade fora do intervalo permitido";
  };

  const tmb = firstTmb(gender, age) * paj + secondTmb(gender, age);

  // Cálculo do Valor Energético Total (VET)
  const activited = (activity, gender) => {
    if (gender.toLowerCase() === "f") {
      // Verifica se o gênero é feminino
      if (activity.toLowerCase() == "leve") {
        return 1.56; // Feminino e atividade leve
      } else if (activity.toLowerCase() == "moderado") {
        return 1.64; // Feminino e atividade moderado
      } else if (activity.toLowerCase() == "intenso") {
        return 1.82; // Feminino e ativadade insento
      } else if (activity.toLowerCase() == "aposentado") {
        return 1.51; // Feminino e ativadade aposentado
      }
    } else if (gender.toLowerCase() == "m") {
      // Verifica se o gênero é masculino
      if (activity.toLowerCase() == "leve") {
        return 1.55; // masculino e atividade leve
      } else if (activity.toLowerCase() == "moderado") {
        return 1.78; // masculino e atividade moderado
      } else if (activity.toLowerCase() == "intenso") {
        return 2.1; // masculino e ativadade insento
      } else if (activity.toLowerCase() == "aposentado") {
        return 1.51; // masculino e ativadade aposentado
      }
    }

    return "Erro";
  };
  const vet = tmb * activited(activity, gender);

  // Distribuição de Macronutrientes
  const protPercentage = 15;
  const carbPercentage = 58;
  const lipPercentage = 27;

  // Cálculo das quantidades de macronutrientes
  const protein = (vet * (protPercentage / 100)) / 4;
  const carbohydrate = (vet * (carbPercentage / 100)) / 4;
  const lipid = (vet * (lipPercentage / 100)) / 9;

  // Exibindo resultados
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
        <h2>Resultados para ${name}</h2>
        <p>IMC: ${imc.toFixed(2)}</p>
        <p>Peso Ideal (Min): ${piMin.toFixed(2)} kg</p>
        <p>Peso Ideal (Med): ${piMed.toFixed(2)} kg</p>
        <p>Peso Ideal (Max): ${piMax.toFixed(2)} kg</p>
        <p>Peso Ajustado: ${paj.toFixed(2)} kg</p>
        <p>Taxa Metabólica Basal: ${tmb.toFixed(2)} kcal</p>
        <p>Valor Energético Total: ${vet.toFixed(2)} kcal</p>
        <p>Proteína: ${protein.toFixed(2)} g</p>
        <p>Carboidrato: ${carbohydrate.toFixed(2)} g</p>
        <p>Lipídios: ${lipid.toFixed(2)} g</p>
    `;
}
