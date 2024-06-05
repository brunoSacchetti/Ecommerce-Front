// Importamos el tipo de dato IPersona y la clase BackendClient
import { ICategories } from "../types/ICategories";
import { BackendClient } from "./BackendClient";

// Clase PersonaService que extiende BackendClient para interactuar con la API de personas
export class CategoryService extends BackendClient<ICategories> {}
