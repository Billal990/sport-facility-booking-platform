import { Model } from "mongoose";

export interface TFacility {
    name:string;
    description:string;
    pricePerHour:number;
    location:string;
    isDeleted:boolean;
}

export interface FacilityModel extends Model<TFacility>{
    isExistsFacility(id:string):Promise<TFacility>
}
