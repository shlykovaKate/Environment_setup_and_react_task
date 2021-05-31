
interface IStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export default class Storage {
  storage: IStorage;

  constructor(getStorage = (): IStorage => window.localStorage) {
    this.storage = getStorage();
  }

  getData(key: string): string | null {
    return this.storage.getItem(key);
  }

  setData(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  clearData(key: string): void {
    this.storage.removeItem(key);
  }
}
