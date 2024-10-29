function calculate() {
  // Obtendo valores dos campos de entrada
  const name = document.getElementById("nome").value;
  const age = parseInt(document.getElementById("idade").value);
  const weight = parseFloat(document.getElementById("peso").value);
  const height = parseFloat(document.getElementById("altura").value);
  const activity = parseFloat(document.getElementById("activity").value);

  // Cálculo do IMC
  const imc = weight / (height * height);

  // Cálculo do Peso Ideal (PI) - Min, Med, Max
  const piMin = 20.1 * (height * height);
  const piMed = 22 * (height * height);
  const piMax = 25 * (height * height);

  // Cálculo do Peso Ajustado (PAj)
  const paj = (piMed - weight) * 0.25 + weight;

  // Cálculo da Taxa Metabólica Basal (TMB)
  const tmb = 11.6 * paj + 879;

  // Cálculo do Valor Energético Total (VET)
  const vet = tmb * activity;

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
