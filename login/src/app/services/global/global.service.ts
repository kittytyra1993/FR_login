import { Injectable } from '@angular/core';
import { Config } from '@forgerock/javascript-sdk';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}

  setConfig(tree?: string) {
    Config.set({
      serverConfig: { baseUrl: environment.AM_URL, timeout: 10000 },
      tree: tree ? tree : environment.DEFAULT_TREE,
      realmPath: environment.REALM_PATH,
    });
  }
}
