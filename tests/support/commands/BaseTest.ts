import {APIRequestContext, APIResponse, expect, Page, request} from "@playwright/test";
import {Method} from "../models/methods/model.methods";
import { state } from "../context/state";
import { TokenGeneration } from "./TokenGeneration";
import { getEnvVariable } from "./background";
const userName = process.env.API_USERNAME;
const password = process.env.API_PASSWORD;
const url = process.env.BASE_URL_WITH_TOKEN;
const tokenGeneration = new TokenGeneration();

/**
 * Make an API request.
 * @returns The API response.
 */
export async function makeApiRequest(endpoint: string,token: string | unknown,payload?: any,method: Method = Method.GET,accept: string = 'application/json'): Promise<APIResponse> {
    const context = await createRequestContext(token, accept);
    let response: APIResponse;
    switch (method) {
        case Method.GET:
            response = await context.get(endpoint);
            break;
        case Method.POST:
            response = await context.post(endpoint, { data: payload });
            break;
        case Method.PUT:
            response = await context.put(endpoint, { data: payload });
            break;
        default:
            throw new Error(`HTTP method ${method} is not implemented`);
    }

    return response;
}

/**
 * Create a request context with the specified token and accept header.
 * @param token - The authentication token.
 * @param accept - The accept header.
 * @returns The API request context.
 */
async function createRequestContext(token: string | unknown, accept: string): Promise<APIRequestContext> {
    const BaseUrl = getEnvVariable("BASE_URL_WITH_TOKEN");
    const UserName = getEnvVariable("API_USERNAME");
    const Password = getEnvVariable("API_PASSWORD");
    const Token = await tokenGeneration.getToken(BaseUrl, UserName, Password);
    console.debug(`\x1b[32m%s\x1b[0m`, `Here is the Generated Token: ${Token}`);

    return request.newContext({
        extraHTTPHeaders: {
            "Authorization": `Bearer ${token}`,
            "Accept": accept,
            "Content-Type": "application/json"
        }
    });
}

export function validateRequestIsSuccessful(status:number) {
    expect(state.testContext.response.ok()).toBeTruthy();
    expect(state.testContext.response.status()).toBe(status);
}

/**
 * Login via UI
 * @param page
 */
export async function doLogin(page: Page): Promise<void> {
    await page.goto('/');
    await page.fill('#user',`${userName}`);
    await page.fill('#pwd', `${password}`);
    await page.click('button[type="submit"]');
    await page.waitForURL('index.php');
}

export async function navigateIndex(page: Page): Promise<void> {
    await page.goto('/');
    const url = page.url();
    expect(url).toContain('index.php');
}



