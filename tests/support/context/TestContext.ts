import { CommonUserRequest } from "../models/request/creation/CommonUsersRequest";

export class TestContext{
    private _email: string;
    private _userId: string;
    private _fullName: string;
    private _createuserrequest:CommonUserRequest;
    private _responseJSON: any;
    private _response: any;
    private _status: number;
    
    public get emailId(): string {
        return this._email;
    }

    public set emailId(value: string) {
        this._email = value;
    }


    public get fullName(): string {
        return this._fullName;
    }

    public set fullName(value: string) {
        this._fullName = value;
    }  

    public get userId(): string {
        return this._userId;
    }

    public set userId(value: string) {
        this._userId = value;
    }

    public get statusCode(): number {
        return this._status;
    }

    public set statusCode(value: number) {
        this._status = value;
    }

    public  get commonUserAccountRequest():CommonUserRequest {
        return this._createuserrequest;
    }

    public set commonUserAccountRequest(value:CommonUserRequest) {
        this._createuserrequest = value;
    }

    public get responseJson(): any {
        return this._responseJSON;
      }

    public set responseJson(json: any) {
        this._responseJSON = json;
      }

      public get response(): any {
        return this._response;
      }

    public set response(json: any) {
        this._response = json;
      }
    

}