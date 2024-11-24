import { describe, expect, test, beforeEach } from "@jest/globals";
import Anno from "./anno.js";

describe("Anno class", () => {
  let anno;

  beforeEach(() => {
    anno = new Anno(2024); // Crear una nueva instancia de Anno para cada prueba
  });

  test("store year number", () => {
    expect(anno.numero).toBe(2024); // Verifica que el número del año sea correcto
  });

  test("initialize with empty months and zero percentage", () => {
    expect(anno.meses).toEqual([]); // La lista de meses debe estar vacía inicialmente
    expect(anno.porcentaje).toBe(0); // El porcentaje debe ser 0 al inicio
  });

  test("add a month to the year", () => {
    const mockMes = { porcentaje: 50 }; // Mes simulado
    anno.agregarMes(mockMes);
    expect(anno.meses.length).toBe(1); // Verifica que se haya agregado un mes
    expect(anno.meses[0]).toBe(mockMes); // Verifica que sea el mes correcto
  });

  test("calculate percentage when months are added", () => {
    const mockMes1 = { porcentaje: 50 };
    const mockMes2 = { porcentaje: 100 };
    anno.agregarMes(mockMes1);
    anno.agregarMes(mockMes2);

    anno.actualizarPorcentaje();
    expect(anno.porcentaje).toBe("75.00"); // Promedio de 50 y 100
  });

  test("retrieve a month by index", () => {
    const mockMes = { porcentaje: 80 };
    anno.agregarMes(mockMes);
    expect(anno.obtenerMes(0)).toBe(mockMes); // Obtener el primer mes
    expect(anno.obtenerMes(1)).toBeNull(); // Índice fuera de rango debe retornar null
  });

  test("calculate annual progress", () => {
    const mockMes1 = { porcentaje: 40 };
    const mockMes2 = { porcentaje: 80 };
    anno.agregarMes(mockMes1);
    anno.agregarMes(mockMes2);

    const progress = anno.calcularProgresoAnual();
    expect(progress).toBe("60.00"); // Promedio de 40 y 80
  });

  test("show annual summary in console", () => {
    const mockMes1 = { nombre: "Enero", porcentaje: 40, dias: [] };
    const mockMes2 = { nombre: "Febrero", porcentaje: 80, dias: [] };

    anno.agregarMes(mockMes1);
    anno.agregarMes(mockMes2);

    const consoleSpy = jest.spyOn(console, "log"); // Espiar las llamadas a console.log
    anno.mostrarResumenAnual();

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Resumen del año 2024:"));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Mes: Enero, Progreso: 40%"));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Mes: Febrero, Progreso: 80%"));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Progreso anual: 60.00%"));

    consoleSpy.mockRestore(); // Restaurar console.log
  });
});
