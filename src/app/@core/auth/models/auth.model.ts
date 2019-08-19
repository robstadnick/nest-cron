export interface IAuthTokenUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    broker: string;
    is_employee: boolean;
    broker_code: any;
    role: string;
    rid: any;
    exp: number;
    iat: number;
    user_hash: string;
    status: string;
}