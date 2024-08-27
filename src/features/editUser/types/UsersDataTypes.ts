export interface Country {
    value: string | undefined ;
    name: string | undefined;
}

export interface Department {
    value: string | undefined;
    name: string | undefined;
}

export interface Status {
    value: string | undefined;
    name: string | undefined;
}

export interface User {
    name: string;
    department: Department;
    country: Country;
    status: Status;
    id: string | undefined
}