import { ICat } from "@/models/cat";
import axios from "axios";

const BaseUrl = "https://cataas.com"

const CATApiInstanse = axios.create()

const CATApi = {
    GetRandomCat: async () => {
        const response = await CATApiInstanse.get<ICat>("/cat",{
            baseURL : BaseUrl
        })
        return response.data;
    },
    GetPhotoOfCat : async (id : string) => {
        return `${BaseUrl}/cat/${id}`;
    }

}

export default CATApi;