import { test, expect } from '@playwright/test';
import { CommonUserRequest} from "./support/models/request/creation/CommonUsersRequest.ts";
import {UserAccountSupport} from "./support/users/user-account.support.ts";
import {validateRequestIsSuccessful } from './support/commands/BaseTestSetup.ts';
import { state } from './support/context/state.ts';

test.describe.serial('Creating a New User and Get User Information', () => {
        test('Creating a New User', async ({}) => {
            state.testContext.response = await UserAccountSupport.create();
            validateRequestIsSuccessful(201);
            expect(typeof state.testContext.responseJson.id).toBe('number');
        });
    
        test('Get a Newly created User Details', async ({}) => {
            state.testContext.response = await UserAccountSupport.get();
            validateRequestIsSuccessful(200);
            expect(state.testContext.responseJson.email).toBe(state.testContext.commonUserAccountRequest.email);
        });
    });