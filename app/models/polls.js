'use strict';var mongoose=require('mongoose'),Schema=mongoose.Schema,Poll=new Schema({creator:String,title:String,choices:[{text:String,votes:{type:Number,default:0,isRequired:!0}}]});module.exports=mongoose.model('Poll',Poll);