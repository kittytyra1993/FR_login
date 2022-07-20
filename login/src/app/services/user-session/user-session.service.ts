import { Config, ConfigOptions } from '@forgerock/javascript-sdk';
import { getEndpointPath } from '@forgerock/javascript-sdk/bundles';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserSessionService {
  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @todo Use FRUser.logout(). Currently throws CORS exceptions.
   * @param {ConfigOptions} [options]
   * @returns {*}
   * @memberof UserSessionService
   */
  logout(options?: ConfigOptions): any {
    const { realmPath, serverConfig } = Config.get(options);
    const path = serverConfig.baseUrl + `${this.getEndpointPath('sessions', realmPath)}?_action=logout`;
    return this.httpClient.post(path, {}, this.fetchHeaders());
  }

  /**
   *
   *
   * @returns {*}
   * @memberof UserSessionService
   */
  fetchHeaders(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept-API-Version': 'resource=2.0, protocol=1.0',
        'Cache-Control': 'no-cache',
        'Accept-Language': 'en',
      }),
      withCredentials: true,
    };
  }

  /**
   * From https://github.com/cerebrl/forgerock-javascript-sdk/blob/6944ed3b796f59e611462276b4bdc96cba8144bb/src/util/realm.ts
   * @param realmPath
   */
  getRealmUrlPath(realmPath?: string): string {
    // Split the path and scrub segments
    const names = (realmPath || '')
      .split('/')
      .map((x) => x.trim())
      .filter((x) => x !== '');

    // Ensure 'root' is the first realm
    if (names[0] !== 'root') {
      names.unshift('root');
    }
    // Concatenate into a URL path
    const urlPath = names.map((x) => `realms/${x}`).join('/');
    return urlPath;
  }

  /**
   *
   *
   * @param {string} endpoint
   * @param {string} [realmPath]
   * @returns {string}
   * @memberof UserSessionService
   */
  getEndpointPath(endpoint: string, realmPath?: string): string {
    const realmUrlPath = this.getRealmUrlPath(realmPath);
    const defaultPaths = {
      authenticate: `json/${realmUrlPath}/authenticate`,
      authorize: `oauth2/${realmUrlPath}/authorize`,
      accessToken: `oauth2/${realmUrlPath}/access_token`,
      endSession: `oauth2/${realmUrlPath}/connect/endSession`,
      userInfo: `oauth2/${realmUrlPath}/userinfo`,
      revoke: `oauth2/${realmUrlPath}/token/revoke`,
      sessions: `json/${realmUrlPath}/sessions/`,
    };
    return defaultPaths[endpoint];
  }
}
