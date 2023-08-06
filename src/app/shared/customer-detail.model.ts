export interface CustomerDetail {
    status: Status;
    customers: any;
}

interface Status {
    success: string;
    code: string;
    message: string;
    total: string;
    successCount: string;
}