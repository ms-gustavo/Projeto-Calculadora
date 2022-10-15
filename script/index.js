const body = document.querySelector("body");
const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.getElementById("input");
const resultInput = document.getElementById("result");

//Impedir que o usuário digite algo fora da calculadora
const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

//Pegar os valores quando clicados
document.querySelectorAll(".charKey").forEach((charKeyBtn) => {
  charKeyBtn.addEventListener("click", () => {
    const value = charKeyBtn.dataset.value;
    input.value += value;
  });
});

//Limpar os valores e focar o input
document.getElementById("clear").addEventListener("click", () => {
  input.value = "";
  input.focus();
});

//Pegar os valores quando digitados no teclado
input.addEventListener("keydown", (ev) => {
  ev.preventDefault();
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key;
    return;
  }
  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1); //Apagar último valor quando Backspace
  }
  if (ev.key === "Enter") {
    calculate(); //Chama a função "Calculate()" quando pressionar Enter
  }
});

//ao clicar no =, chama a função "calculate()" pra mostrar o resultado
document.getElementById("equal").addEventListener("click", calculate);

/*
A função irá, de ante-mão, atribuir o texto ERRO e adicionar a classe ERRO (estilizada no CSS pra definir um erro), mas será tão rápido que, se o código JS seja executavel (EVAL), será imperceptível ao olho
*/
function calculate() {
  resultInput.value = "ERRO"; //ao clicar no =, input de resultado vai pra ERRO
  resultInput.classList.add("error"); //adiciona classe Erro ao input (CSS)
  const result = eval(input.value); //executa o codigo JS escrito no input
  resultInput.value = result;
  resultInput.classList.remove("error");
}

//Copiar o resultado da conta
document.getElementById("copyToClipboard").addEventListener("click", (ev) => {
  const button = ev.currentTarget;
  if (button.innerText === "Copy") {
    button.innerText = "Copied!";
    button.classList.add("success");
    navigator.clipboard.writeText(resultInput.value);
  } else {
    button.innerText = "Copy";
    button.classList.remove("success");
  }
});

document.getElementById("switchTheme").addEventListener("click", () => {
  if (body.id === "dark") {
    root.style.setProperty("--bg-color", "#ffffff");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#F28029");
    root.style.setProperty("--primary-color", "#3811F2");

    body.id = "light";
  } else {
    root.style.setProperty("--bg-color", "#090909");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#ffffff");
    root.style.setProperty("--primary-color", "#280137");
    body.id = "dark";
  }
});
