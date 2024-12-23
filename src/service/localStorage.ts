export interface LocalStorageInterface {
  setValue: <T>(key: string, value: T) => void;
  readValue: <T>(key: string) => T | undefined;
  removeValue: (key: string) => void;
}
class LocalStorageManager implements LocalStorageInterface {
  private serializer<T>(value: T): string {
    return typeof value === "string" ? value : JSON.stringify(value);
  }

  private deserializer<T>(value: string): T {
    return JSON.parse(value);
  }

  setValue<T>(key: string, value: T): void {
    try {
      const serializedValue = this.serializer(value);
      window.localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }

  readValue<T>(key: string): T | undefined {
    try {
      const value = window.localStorage.getItem(key);
      if (!value) return undefined;

      try {
        return this.deserializer(value);
      } catch {
        // If JSON parsing fails, it's probably a string
        return value as T;
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }

  removeValue(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}"`, error);
    }
  }
}

export const localStorageService = new LocalStorageManager();
