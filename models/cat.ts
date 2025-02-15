export interface ICat {
    tags : string[],
    createdAt: string,
    updatedAt : string,
    mimetype : string,
    size: Number,
    id : string
}

export interface ICatImage{
    url:string
}