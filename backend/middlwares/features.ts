import mongoose from "mongoose";
import { PaginationQuery, queryString } from "../Interfaces/features";

class Features {
  
public paginationResult!: PaginationQuery;

constructor(private readonly queryString: queryString , public mongooseQuery: mongoose.Query<any[], any>) { }

  pagination(NumOfEvents: number) {

    const page: number = this.queryString.page || 1;
    const limit: number = this.queryString.limit || 5;
    const skip: number = (page - 1) * limit;
    const endIndex: number = page * limit;
    const pagination: PaginationQuery = {}
    pagination.currentPage = Number(page);
    pagination.limit = Number(limit);
    pagination.totalPages = Math.ceil(NumOfEvents / limit);
    if (endIndex < NumOfEvents) {
      pagination.next = Number(page) + 1;
    }
    if (skip > 0) {
      pagination.prev = Number(page) - 1;
    }
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }

  filter(){
    const queryObject = { ...this.queryString}

    const excludedFields = ["page","limit"];
    excludedFields.forEach(field =>delete queryObject[field]);

    this.mongooseQuery =this.mongooseQuery.find(queryObject)
    return this ;
  }


}
export default Features;

export class utils{
constructor(){}
generateReferenceCode(): string {
    return Math.floor(1000000 + Math.random() * 9000000).toString();
}
}


