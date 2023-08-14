/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateAccountRequest } from '../models/CreateAccountRequest';
import type { CreateAccountResult } from '../models/CreateAccountResult';
import type { SignupRequest } from '../models/SignupRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @param requestBody 
     * @returns any 
     * @throws ApiError
     */
    public static userControllerSignup(
requestBody: SignupRequest,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/user/signup',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns CreateAccountResult 
     * @returns any 
     * @throws ApiError
     */
    public static userControllerCreateAccount(
requestBody: CreateAccountRequest,
): CancelablePromise<CreateAccountResult | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/user/create-account',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
