export interface Country {
    value: string  ;
    name: string ;
}

export interface Department {
    value: string ;
    name: string ;
}

export interface Status {
    value: string ;
    name: string ;
}

export interface User {
    name: string;
    department: Department;
    country: Country;
    status: Status;
    id: string | undefined
}