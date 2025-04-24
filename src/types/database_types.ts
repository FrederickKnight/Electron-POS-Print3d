//ENDPOINTS
export const ENDPOINT: {
    [K in keyof TypeDict]?: string;
} = {
    sale: "sale/",
    ticket: "ticket/",
    general_price: "general-price/",
    print_model: "print-model/",
    error_sale: "error-sale/",
    client: "client/",
    theme: "theme/",
    subtheme: "subtheme/",
    material_type: "material-type/",
    material: "material/",
    material_inventory: "material-inventory/",
    set_model: "set-model/",
    brand_model: "brand-model/"
}

//User types
export type User = {
    id: number;
    username: string;
    is_active?: boolean;
}

export type Client = {
    id: number;
    name:string;
    email: string;
    telephone: string;
    address: string;
    tickets?: Ticket | Ticket[];
}

// Database Types
export type MaterialType = {
    id: number;
    name: string;
    materials?: Material | Material[];
    general_prices?: GeneralPrice | GeneralPrice[];
}

export type Material = {
    id: number;
    name: string;
    brand: string;
    measurement_type: string;
    color: string;
    id_material_type: number;
    material_type?: MaterialType;
    inventory: MaterialInventory;
}

export type MaterialInventory = {
    id: number;
    id_material: number;
    material?: Material;
    quantity: number;
}

export type Inventory = {
    id: number;
    type: string;
    name: string;
    description: string;
    quantity: number;
    quantity_type: string;
}

export type Theme = {
    id: number;
    name: string;
    description: string;
    subthemes?: Subtheme | Subtheme[];
}

export type Subtheme = {
    id: number;
    name: string;
    description: string;
    id_theme: number;
    theme?: Theme;
    print_models?: PrintModel | PrintModel[];
}

export type PrintModel = {
    id: number;
    id_subtheme: number;
    subtheme?: Subtheme;
    id_brand:number;
    brand?:BrandModel;
    id_set:number;
    set?:SetModel;
    name: string;
    description: string;
    url_image: string;

    sales?: Sale | Sale[]
}

export type BrandModel = {
    id:number;
    name:string;
    description?:string;
    print_models:PrintModel | PrintModel[]
}

export type SetModel = {
    id:number;
    name:string;
    description?:string;
    print_models:PrintModel | PrintModel[]
}

// tickets
export type FailureRisk = {
    low: number;
    medium: number;
    high: number;
}

export type GeneralPrice = {
    id: number;
    id_material_type: number;
    material_type?: MaterialType;

    date: string;
    
    wear: number;
    electricity: number;
    margin: number;
    failure_risk?: FailureRisk;

    formula?: string;
    sales: Sale | Sale[]
}

export type Sale = {
    uuid?: string;
    id: number;
    id_ticket: number;
    ticket: Ticket;

    id_print_model: number;
    print_model: PrintModel;

    id_general_price: number;
    general_price: GeneralPrice;

    material_quantity: number;
    print_time: number;

    risk: string;
    error_sale?: ErrorSale;

    discount?: number;
    raw_total: number;
    total: number;
}

export type ErrorSale = {
    id: number;
    id_sale: number;
    sale: Sale;
    waste: number;
    reajusted_price: number;
    description?: string;
}

export type Ticket = {
    id: number;
    sales: Sale | Sale[];

    id_client: number;
    client: Client;

    id_user: number;
    user: User;

    date: string;
    subject: string;

    uuid?: string;
    total?: number;
}

export type TypeDict = {
    sale: Sale;
    error_sale: ErrorSale;
    ticket: Ticket;
    general_price: GeneralPrice;
    client: Client;
    print_model:PrintModel;
    brand_model:BrandModel;
    set_model:SetModel;
    theme:Theme;
    subtheme:Subtheme;
    material_type:MaterialType;
    material:Material;
    material_inventory:MaterialInventory;
};