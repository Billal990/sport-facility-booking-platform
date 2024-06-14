import { Schema, model } from "mongoose";
import { FacilityModel, TFacility } from "./facility.interface";

const facilitySchema = new Schema<TFacility, FacilityModel>({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    pricePerHour:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
}, {versionKey:false})

facilitySchema.pre('find', function(next){
    this.find({isDeleted:{$ne:true}})
    next()
})

facilitySchema.pre('findOne', function(next){
    this.findOne({isDeleted:{$ne:true}})
    next()
})

facilitySchema.statics.isExistsFacility = async function(id){
    return await Facility.findById(id)
}

export const Facility = model<TFacility, FacilityModel>('Facility', facilitySchema)