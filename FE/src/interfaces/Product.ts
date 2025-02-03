export interface IProduct {
    _id?: string;
    title?: string;
    price?: number;
    description?: string;
    image?: string;
    categoryId?: string;
}
export interface Category{
    _id?: string;
    name?:string;
    slug?:string
}