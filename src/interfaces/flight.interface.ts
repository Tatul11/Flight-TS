import { Sequelize } from "sequelize";
type flightModel = "flights" | "company" | "date" | "price" | "status";

export type statusType = "landed" | "arrived";

export interface IFlight<T> {
  flights: string;
  company: string;
  date: Date;
  price: number;
  status: T;
}

export interface Idb {
  users: any;
  sequelize: Sequelize;
}
export interface IMethotType {
  where: { flight: string };
  defaults: {
    company: string;
    date: Date;
    price: number;
    status: statusType;
  };
}
