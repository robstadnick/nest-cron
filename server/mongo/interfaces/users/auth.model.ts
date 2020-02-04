export interface IAuthTokenUser {
    _id: string
    email: string
    first_name: string
    last_name: string
    // is_employee: user.is_employee,
    role: string
    // broker: user.broker,
    broker_code: String
    // status: user.status,
    // rid: user.quickbase_rid,
    user_hash: string
}