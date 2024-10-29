function calculate() {
  // Obtendo valores dos campos de entrada
  const name = document.getElementById("nome").value;
  const age = parseInt(document.getElementById("idade").value);
  const weight = parseFloat(document.getElementById("peso").value);
  const height = parseFloat(document.getElementById("altura").value);
  const activity = document.getElementById("activity").value.toLowerCase();
  const gender = document.getElementById("gender").value.toLowerCase();

  // Verificação básica dos campos de entrada
  if (
    !name ||
    isNaN(age) ||
    isNaN(weight) ||
    isNaN(height) ||
    !activity ||
    !gender
  ) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  // Cálculo do IMC
  const imc = weight / (height * height);
  const classImc = (imc) => {
    if (imc < 16) {
      return "Magreza Grau III";
    } else if (imc >= 16 && imc < 17) {
      return "Magreza Grau II";
    } else if (imc >= 17 && imc < 18.5) {
      return "Magreza Grau I";
    } else if (imc >= 18.5 && imc < 25) {
      return "Peso Normal";
    } else if (imc >= 25 && imc < 30) {
      return "Sobrepeso";
    } else if (imc >= 30 && imc < 35) {
      return "Obesidade Grau I";
    } else if (imc >= 35 && imc < 40) {
      return "Obesidade Grau II";
    } else if (imc >= 40) {
      return "Obesidade Grau III";
    }
    return "Sem dados para a classificação";
  };
  const imcClassification = classImc(imc);

  // Cálculo do Peso Ideal (PI) - Min, Med, Max
  const ptMin = (gender) => (gender === "f" ? 18.7 : 20.1);
  const ptMed = (gender) => (gender === "f" ? 20.8 : 22);
  const ptMax = (gender) => (gender === "f" ? 23.8 : 25);

  const piMin = ptMin(gender) * (height * height);
  const piMed = ptMed(gender) * (height * height);
  const piMax = ptMax(gender) * (height * height);

  // Cálculo do Peso Ajustado (PAj)
  const paj = (piMed - weight) * 0.25 + weight;

  // Cálculo da Taxa Metabólica Basal (TMB)
  const firstTmb = (gender, age) => {
    if (age < 18) {
      return NaN;
    }
    if (gender === "f") {
      if (age >= 18 && age < 30) {
        return 14.7;
      } else if (age >= 30 && age <= 60) {
        return 8.7;
      } else if (age > 60) {
        return 10.5;
      }
    } else if (gender === "m") {
      if (age >= 18 && age < 30) {
        return 15.3;
      } else if (age >= 30 && age <= 60) {
        return 11.6;
      } else if (age > 60) {
        return 13.5;
      }
    }
    return NaN;
  };

  const secondTmb = (gender, age) => {
    if (gender === "f") {
      if (age >= 18 && age < 30) {
        return 496;
      } else if (age >= 30 && age <= 60) {
        return 829;
      } else if (age > 60) {
        return 596;
      }
    } else if (gender === "m") {
      if (age >= 18 && age < 30) {
        return 679;
      } else if (age >= 30 && age <= 60) {
        return 879;
      } else if (age > 60) {
        return 487;
      }
    }
    return NaN;
  };

  const firstTmbValue = firstTmb(gender, age);
  const secondTmbValue = secondTmb(gender, age);

  if (isNaN(firstTmbValue) || isNaN(secondTmbValue)) {
    alert("Idade fora do intervalo permitido.");
    return;
  }

  const tmb = firstTmbValue * paj + secondTmbValue;

  // Cálculo do Valor Energético Total (VET)
  const activited = (activity, gender) => {
    if (gender === "f") {
      if (activity === "leve") {
        return 1.56;
      } else if (activity === "moderado") {
        return 1.64;
      } else if (activity === "intenso") {
        return 1.82;
      } else if (activity === "aposentado") {
        return 1.51;
      }
    } else if (gender === "m") {
      if (activity === "leve") {
        return 1.55;
      } else if (activity === "moderado") {
        return 1.78;
      } else if (activity === "intenso") {
        return 2.1;
      } else if (activity === "aposentado") {
        return 1.51;
      }
    }
    return NaN;
  };

  const activityFactor = activited(activity, gender);

  if (isNaN(activityFactor)) {
    alert("Atividade ou gênero fora do intervalo permitido.");
    return;
  }

  const vet = tmb * activityFactor;

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
        <p>Classificação IMC: ${imcClassification}</p>
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
