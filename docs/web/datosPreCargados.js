import Dia from "./dia.js";
import Mes from "./mes.js";
import Anno from "./anno.js";

// Definir los temas posibles
const temasPosibles = [
  "Matemáticas - Suma y Resta",
  "Matemáticas - Multiplicación",
  "Lengua - Comprensión lectora",
  "Ciencias - El ciclo del agua",
  "Historia - La independencia de mi país",
  "Geografía - Los continentes",
  "Arte - Pintura al óleo",
  "Música - Instrumentos musicales",
  "Educación Física - Ejercicios básicos",
  "Tecnología - Uso responsable de la computadora",
];

// Función para asignar exactamente 3 temas a un día
function asignarTemas(dia) {
  const temasAsignados = new Set();
  while (temasAsignados.size < 3) {
    const tema =
      temasPosibles[Math.floor(Math.random() * temasPosibles.length)];
    temasAsignados.add(tema);
  }
  temasAsignados.forEach((tema) => dia.agregarTema(tema));
}

// Función para generar un mes con días y temas asignados
function generarMes(nombreMes, año, mesIndex) {
  const mes = new Mes(nombreMes);
  const diasDelMes = new Date(año, mesIndex + 1, 0).getDate();

  for (let i = 1; i <= diasDelMes; i++) {
    const dia = new Dia();
    dia.indicarDia(i);
    asignarTemas(dia);
    mes.agregarDia(dia);
  }

  return mes;
}

// Generar el año actual
export const annoActual = (() => {
  const anno = new Anno(new Date().getFullYear());
  const mesesDelAño = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  mesesDelAño.forEach((nombreMes, index) => {
    const mes = generarMes(nombreMes, anno.numero, index);
    anno.agregarMes(mes);
  });
  return anno;
})();
