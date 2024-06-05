// Clase abstracta que define métodos para operaciones CRUD en un servicio genérico
export abstract class AbstractBackendClient<T> {
  protected baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  abstract getAll(): Promise<T[]>;
  abstract getById(id: number): Promise<T | null>;
}
