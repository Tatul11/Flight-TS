import { Op, Sequelize, where } from "sequelize";
import express, { Request, Response, NextFunction, Router } from "express";
import { IFlight, statusType } from "../interfaces/flight.interface";
import { IMethotType, Idb } from "../interfaces/flight.interface";

const userRouter: Router = express.Router();
const db: Idb = require("../db");
const Users = db.users;

userRouter.get("/create", (req: Request, res: Response, next: NextFunction) => {
  db.sequelize.sync({ force: true });
  res.send("Table created!");
});
userRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  // db.sequelize.query(`SELECT * FROM test2`)
  Users.findAll().then((results: any[]) => res.json(results));
});

userRouter.get("/order", (req: Request, res: Response, next: NextFunction) => {
  Users.findAll({ order: ["flights"] }).then((results: any[]) =>
    res.json(results)
  );
});

userRouter.post("/add", (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as IFlight<statusType>;
  const users = Users.create({ ...body });
  res.json({ users });
});

userRouter.post("/find", (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as IFlight<statusType>;
  const option: IMethotType = {
    where: { flight: body.flights },
    defaults: {
      company: "AirArabia",
      date: new Date(),
      price: 43000,
      status: "arrived",
    },
  };
  Users.findOrCreate(option)
    .then((results: any) => {
      if (results.isNewRecord) {
        res.json({ user: "user is exist" });
      } else {
        res.json(results);
      }
    })
    .catch((err: any) => console.log({ message: err.message }));
  res.json({ status: "created" });
});

userRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as IFlight<statusType>;
  const { id } = req.params;
  Users.findAll({
    where: {
      [Op.or]: [{ company: body.company }, { id: id }],
    },
  }).then((results: any[]) => res.json(results));
});

userRouter.delete(
  "/delete",
  (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    Users.destroy({
      where: {
        name: name,
      },
    });
    res.json({ status: "deleted" });
  }
);

userRouter.delete(
  "/delete/:id",
  (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    Users.destroy({
      where: {
        id: id,
      },
    });
    res.json({ status: "deleted" });
  }
);
module.exports = userRouter;
