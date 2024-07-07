import * as fs from 'fs/promises';
import { CommonUserRequest} from "../models/request/creation/CommonUsersRequest";
import { CreateUserDetailsResponse,GetUserDetailsResponse} from "../models/response/creation/UsersResponses";
import {Method} from "../models/methods/model.methods";
import {APIRequestContext, APIResponse} from "@playwright/test";
import {makeApiRequest} from "../commands/BaseTest";
import {faker} from "@faker-js/faker";
import appEndpoints from '../constants/appEndpoints';
import { state } from '../context/state';
require('dotenv').config();

const TOKEN = process.env.GOREST_API_TOKEN;
const BASE_URL = process.env.BASE_URL;
export class UserAccountSupport {
    static async create(): Promise<APIResponse> {
        const token = TOKEN;
        const createUser : CommonUserRequest= JSON.parse(await fs.readFile('tests/support/fixtures/userData.json', 'utf8'));
        createUser.email = faker.internet.email();
        state.testContext.commonUserAccountRequest =createUser;
        const response :APIResponse= await makeApiRequest(`${BASE_URL}`+appEndpoints.CREATE_USER,token,createUser,Method.POST);
        state.testContext.responseJson = await response.json();
        return response;
    }

    static async get(): Promise<APIResponse> {
        const token = TOKEN;
        const response :APIResponse= await makeApiRequest(`${BASE_URL}`+appEndpoints.GET_USER+state.testContext.responseJson.id,token,Method.GET);
        state.testContext.responseJson = await response.json();
        return response;
    }

    static async update(): Promise<APIResponse> {
        state.testContext.fullName = faker.person.fullName();
        const updateUser : CommonUserRequest= state.testContext.commonUserAccountRequest;
        updateUser.name =state.testContext.fullName;
        state.testContext.commonUserAccountRequest =updateUser;
        const token = TOKEN;
        const response :APIResponse = await makeApiRequest(`${BASE_URL}`+appEndpoints.UPDATE_USER+state.testContext.responseJson.id,token,updateUser,Method.PUT);
        state.testContext.responseJson = await response.json();
        return response;
    }
}
