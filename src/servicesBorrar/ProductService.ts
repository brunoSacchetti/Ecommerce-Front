// Importamos el tipo de dato Iproduct y la clase BackendClient
import { Iproduct } from "../typesBorrar/Iproduct";
import { BackendClient } from "./BackendClient";

// Clase ProductService que extiende BackendClient para interactuar con la API de productos
export class ProductService extends BackendClient<Iproduct> {
  async getByCategory(category: string): Promise<Iproduct[]> {
    const response = await fetch(`${this.baseUrl}/`);
    const data = await response.json();

    const result = data.filter(
      (el: { category: string }) => el.category === category
    );

    return result as Iproduct[];
  }

  async findByNameAndCategory(
    category: string,
    name: string
  ): Promise<Iproduct[]> {
    const response = await fetch(`${this.baseUrl}/`);
    const data = await response.json();
    const result = data.filter(
      (el: { category: string }) => el.category === category
    );
    const resultByName = result.filter((el: { denomination: string }) =>
      el.denomination.toLowerCase().includes(name.toLowerCase())
    );

    return resultByName as Iproduct[];
  }
}
