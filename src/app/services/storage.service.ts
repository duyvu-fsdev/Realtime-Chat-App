import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage-angular";
import { SecureStoragePlugin } from "capacitor-secure-storage-plugin";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  public isStorageReady: Promise<void>;

  constructor(private storage: Storage) {
    this.isStorageReady = this.init();
  }

  //  Ionic Storage
  async init() {
    await this.storage.create();
  }

  async setStorage(key: string, value: any) {
    await this.isStorageReady;
    return this.storage?.set(key, value);
  }

  async getStorage(key: string) {
    await this.isStorageReady;
    return this.storage?.get(key);
  }

  async clearStorage() {
    await this.isStorageReady;
    return this.storage?.clear()!;
  }

  //  Secure Storage
  async setSecureStorage(key: string, value: any) {
    await SecureStoragePlugin.set({ key, value });
  }

  async getSecureStorage(key: string) {
    const { value } = await SecureStoragePlugin.get({ key });
    return value;
  }

  async removeSecureStorageItem(key: string) {
    await SecureStoragePlugin.remove({ key });
  }

  async clearSecureStorageItem() {
    await SecureStoragePlugin.clear();
  }
}
