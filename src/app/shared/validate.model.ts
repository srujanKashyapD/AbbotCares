export interface Validate {
    status: Status;
    auth?: Auth;
    user?: User;
    customers?: []; 
}

interface Status {
    success: boolean;
    code: number;
    message: string;
}

interface Auth {
    token: string;
    key: string;
}

interface User {
    appRegistered: boolean;
    sessionId: string;
    role: string;
    userRegisteredForPassword: boolean;
}
