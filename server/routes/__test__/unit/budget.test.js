const request = require("supertest");
const app = require("../../../server");
const http = require("http");
const supertest = require("supertest");

const userId = 1;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2MjI3NDE1NCwiZXhwIjoxNjkzODMxNzU0fQ.lPsnHUY41BS3ckRzxmMlEGP44DiQbCqe69PA4gUchrg";
const header = {
  headers: { Authorization: token },
};

const req = supertest(http.createServer(app));
const signin = async () => {
  await request(app).post("/signin").send({
    email: "test@gmail.com",
    password: "password",
  });
};

describe("POST/ create budget", () => {
  signin();
  test("if mandatory fields are missing, should respond with a status code of 400", async () => {
    const bodyData = [
      {
        userId: userId,
        budgetAmount: 100,
        budgetBalance: 100,
        endDate: "2022-10-30",
      },
      {
        userId: userId,
        budgetName: "dinner",
        budgetBalance: 100,
        endDate: "2022-10-30",
      },
      {
        userId: userId,
        budgetName: "dinner",
        budgetAmount: 100,
        endDate: "2022-10-30",
      },
      {
        userId: userId,
        budgetName: "dinner",
        budgetAmount: 100,
        budgetBalance: 100,
      },
      {
        budgetAmount: 100,
        budgetBalance: 100,
        endDate: "2022-10-30",
      },
    ];
    for (const i of bodyData) {
      const response = await req
        .post("/budget")
        .set("Authorization", token)
        .send(i);
      expect(response.statusCode).toBe(400);
    }
  });

  test("if mandatory fields given, should respond with a status code of 200", async () => {
    const response = await req
      .post("/budget")
      .set("Authorization", token)
      .send({
        budgetName: "drink",
        budgetAmount: 50,
        budgetBalance: 50,
        endDate: "2022-10-30",
      });
    expect(response.statusCode).toBe(200);
  });

  test("if mandatory fields given, should create a new record", async () => {
    const response = await req
      .post("/budget")
      .set("Authorization", token)
      .send({
        budgetName: "books",
        budgetAmount: 80,
        budgetBalance: 80,
        endDate: "2022-10-30",
      });

    expect(response.body.message.data.affectedRows).toBe(1);
  });
});

describe("GET/ budget by id", () => {
  signin();
  test("if given a budget id, should return the budget's record", async () => {
    const response = await req.get("/budget/1").set("Authorization", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.message.data).toEqual([
      {
        balance: 100,
        budget_id: 1,
        budget_name: "dinner",
        end_date: "2022-10-29T21:00:00.000Z",
        budget_amount: 100,
        note: null,
        start_date: "2022-10-19T21:00:00.000Z",
        user_id: 1,
      },
    ]);
  });
  test("if given a budget id that isn't in the database, should return empty array", async () => {
    const response = await req.get("/budget/2").set("Authorization", token);
    expect(response.body.message.data).toEqual([]);
  });
});

describe("GET/ budgets", () => {
  signin();
  test("given an auth token, should return the users budgets", async () => {
    const response = await req.get("/budget").set("Authorization", token);

    expect(response.statusCode).toBe(200);
    expect(response.body.message.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: userId,
          budget_name: "dinner",
          budget_name: "drink",
          budget_name: "books",
        }),
      ])
    );
  });
});

describe("PUT/ budget", () => {
  test("given all mandatory fields, should update budget", async () => {
    const before = await req.get("/budget/3").set("Authorization", token);
    let oldAmount = parseInt(before.body.message.data[0].budget_amount);
    const response = await req
      .put("/budget/3")
      .set("Authorization", token)
      .send({
        budgetName: "drink",
        budgetAmount: oldAmount + 10,
        budgetBalance: 60,
        endDate: "2022-10-30",
      });
    const after = await req.get("/budget/3").set("Authorization", token);
    let newAmount = parseInt(after.body.message.data[0].budget_amount);
    expect(newAmount).toBe(oldAmount + 10);
  });

  test("if mandatory fields are missing, should respond with a status code of 400", async () => {
    const bodyData = [
      {
        budgetAmount: 10,
        budgetBalance: 60,
        endDate: "2022-10-30",
      },
      {
        budgetName: "drink",
        budgetBalance: 60,
        endDate: "2022-10-30",
      },
      {
        budgetName: "drink",
        budgetAmount: 10,
        endDate: "2022-10-30",
      },
      {
        budgetName: "drink",
        budgetAmount: 10,
        budgetBalance: 60,
      },
      {
        budgetName: "drink",
        budgetAmount: 10,
        budgetBalance: 60,
        endDate: null,
      },
      {
        budgetName: "drink",
        budgetAmount: 10,
        budgetBalance: null,
        endDate: "2022-10-30",
      },
      {
        budgetName: null,
        budgetAmount: 10,
        budgetBalance: 60,
        endDate: "2022-10-30",
      },
      {
        budgetName: "drink",
        budgetAmount: null,
        budgetBalance: 60,
        endDate: "2022-10-30",
      },
    ];
    for (const i of bodyData) {
      const response = await req
        .put("/budget/3")
        .set("Authorization", token)
        .send(i);
      expect(response.statusCode).toBe(400);
    }
  });
});

describe("PATCH/ budget balance", () => {
  test("if given a balance, should update budget's balance", async () => {
    const budget = await req.get("/budget/3").set("Authorization", token);
    let oldBalance = parseInt(budget.body.message.data[0].balance);
    const response = await req
      .patch("/budget/3")
      .set("Authorization", token)
      .send({
        balance: oldBalance - 1,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message.data.affectedRows).toBe(1);
  });

  test("if not given a balance, should respond with json balance cannot be null", async () => {
    const response = await req
      .patch("/budget/3")
      .set("Authorization", token)
      .send({
        balance: null,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("balance cannot be null");
  });
});

describe("DELETE/ budget", () => {
  signin();
  test("should delete the budget", async () => {
    const response = await req.delete("/budget/4").set("Authorization", token);
    expect(response.statusCode).toBe(200);
  });
});
