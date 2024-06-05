// Importamos el tipo de dato IPersona y la clase BackendClient
import { ICategories } from "../typesBorrar/ICategories";
import { BackendClient } from "./BackendClient";

// Clase PersonaService que extiende BackendClient para interactuar con la API de personas
export class CategoryService extends BackendClient<ICategories> {}
