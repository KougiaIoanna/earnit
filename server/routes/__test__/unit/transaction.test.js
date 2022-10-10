const request = require("supertest");
const app = require("../../../server");
const http = require("http");
const supertest = require("supertest");

const userId = 1;
const walletId = 1;
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

describe("POST/ create transaction", () => {
  signin();
  test("if given the mandatory fields (wallet, category, amount,date), should respond with a status code of 200", async () => {
    const bodyData = [
      {
        walletId: 1,
        categoryId: 1,
        transactionAmount: 5,
        transactionDate: "2022-11-02 20:57:05",
      },
    ];
    for (const i of bodyData) {
      const response = await req
        .post("/transaction")
        .set("Authorization", token)

        .send(i);
      expect(response.statusCode).toBe(200);
    }
  });

  test("if not given the mandatory fields, should respond with a status code of 400", async () => {
    const bodyData = [
      {
        categoryId: 1,
        transactionAmount: 5,
        transactionDate: "2022-09-02 20:57:05",
      },
      {
        walletId: 1,
        transactionAmount: 5,
        transactionDate: "2022-09-02 20:57:05",
      },
      {
        walletId: 1,
        categoryId: 1,
        transactionDate: "2022-09-02 20:57:05",
      },
      {
        walletId: 1,
        categoryId: 1,
        transactionAmount: 5,
      },

      {},
    ];
    for (const i of bodyData) {
      const response = await req
        .post("/transaction")
        .set("Authorization", token)
        .send(i);
      expect(response.statusCode).toBe(400);
    }
  });
});

describe("GET/ transaction by id", () => {
  signin();
  test("if given a transaction id, should return the transaction's record", async () => {
    const response = await req
      .get("/transaction/2")
      .set("Authorization", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.message.data).toEqual([
      {
        transaction_id: 2,
        user_id: 1,
        wallet_id: 1,
        category_id: 1,
        amount: 10,
        transaction_date: "2022-09-02T17:57:05.000Z",
        next_occurrence: "2022-09-10T14:57:05.000Z",
        interval_period: "8D",
        note: null,
        upcoming_transaction: "true",
      },
    ]);
  });
  test("if given a transaction id that isn't in the database, should return empty array", async () => {
    const response = await req
      .get("/transaction/4")
      .set("Authorization", token);
    expect(response.body.message.data).toEqual([]);
  });
});

describe("PATCH/ transaction", () => {
  test("should update transaction amount, transaction note, and upcoming transaction fields, and respond with a status code of 200", async () => {
    const before = await req.get("/transaction/2").set("Authorization", token);
    let oldAmount = parseInt(before.body.message.data[0].amount);
    const response = await req
      .patch("/transaction/3")
      .set("Authorization", token)
      .send({
        transactionAmount: oldAmount + 1,
        transactionNote: "a small note",
        upcomming: "true",
      });
    const after = await req.get("/transaction/3").set("Authorization", token);

    expect(after.body.message.data[0].amount).toBe(oldAmount + 1);
    await req.patch("/transaction/3").set("Authorization", token).send({
      transactionAmount: oldAmount,
      transactionNote: "a small note",
      upcomming: "true",
    });
  });
  test("should update only upcoming transaction field, and respond with a status code of 200", async () => {
    const response = await req
      .patch("/transaction/upcoming/3")
      .set("Authorization", token)
      .send({
        upcomming: "true",
      });
    expect(response.statusCode).toBe(200);
  });

  test("if given a date, should update the next occurence", async () => {
    const before = await req.get("/transaction/18").set("Authorization", token);
    let amountbefore = parseInt(before.body.message.data[0].amount);
    const response = await req
      .patch("/transaction/next-occurrence/18")
      .set("Autorization", token)
      .send({
        nextOccurrence: "2022-12-02T17:57:05.000Z",
      });
    expect(response.statusCode).toBe(200);
    const after = await req.get("/transaction/18").set("Authorization", token);
    expect(after.body.message.data[0].next_occurrence).toStrictEqual(
      "2022-12-02T15:57:05.000Z"
    );
    await req
      .put("/transaction/next-occurrence/18")
      .set("Autorization", token)
      .send({
        nextOccurrence: null,
      });
  });
});
describe("GET/ transactions", () => {
  signin();
  test("if given an auth token, should return all of the users transactions", async () => {
    const response = await req.get("/transaction").set("Authorization", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.message.data).toEqual(
      expect.arrayContaining([expect.objectContaining({ user_id: userId })])
    );
  });
  test("should return all upcoming transactions of the user and respond with a 200 status code", async () => {
    const response = await req
      .get("/transaction-recurring")
      .set("Authorization", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.message.data).toEqual(
      expect.arrayContaining([expect.objectContaining({ user_id: userId })])
    );
  });

  test("given a category, should return all of user's transactions with this category and respond with a 200 status code", async () => {
    const response = await req
      .get("/transaction-category/1")
      .set("Authorization", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.message.data).toEqual(
      expect.arrayContaining([expect.objectContaining({ user_id: userId })])
    );
  });
  test("given a wallet, should return all of user's transactions with this wallet and respond with a 200 status code", async () => {
    const response = await req
      .get("/transaction-wallet/1")
      .set("Authorization", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.message.data).toEqual(
      expect.arrayContaining([expect.objectContaining({ user_id: userId })])
    );
  });
});

describe("POST/ get daily total spending, filtered by categories and date range", () => {
  signin();
  test("if given a date range and a list of categories, should respond with the total spending amounts by day", async () => {
    const response = await req
      .post("/transaction-dailysum")
      .set("Authorization", token)
      .send({
        startDate: "2022-09-01 00:00:05",
        endDate: "2022-09-20 20:00:05",
        categoriesIds: [1],
      });
    //expect(response.statusCode).toBe(200);
    expect(response.body.message.data).toStrictEqual([
      { SumAmount: 20, transaction_date: "2022-09-01T21:00:00.000Z" },
    ]);
  });
});

describe("POST/ get total transaction amount by category, for a date range ", () => {
  signin();
  test("if given a date range, should return total transaction amount by category", async () => {
    const response = await req
      .post("/transaction-sum")
      .set("Authorization", token)
      .send({ fromDate: "2022-09-01 20:57:05", toDate: "2022-10-05 20:57:05" });
    expect(response.body.message.data).toStrictEqual([
      { category: 1, sum: 80 },
      { category: 2, sum: 10 },
      { category: 5, sum: 5 },
    ]);
    expect(response.statusCode).toBe(200);
  });
});

describe("POST/ get transactions filtered by categories and date range", () => {
  signin();
  test("given a list of categories and a date range, should return all of user's transactions in that date range and respond with a 200 status code", async () => {
    const response = await req
      .post("/transaction-budget")
      .set("Authorization", token)
      .send({
        categoriesIds: [1],
        startDate: "2022-09-01",
        endDate: "2022-09-10",
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message.data).toEqual(
      expect.arrayContaining([expect.objectContaining({ user_id: userId })])
    );
  });
});

describe("POST/ get transactions filtered by date range", () => {
  signin();
  test("given a date range should return all of user's transactions in that date range and respond with a 200 status code", async () => {
    const response = await req
      .post("/transaction-by-date-range")
      .set("Authorization", token)
      .send({ fromDate: "2022-09-01", toDate: "2022-09-10" });
    expect(response.statusCode).toBe(200);
    expect(response.body.message.data).toEqual(
      expect.arrayContaining([expect.objectContaining({ user_id: userId })])
    );
  });
});

describe("DELETE/ transaction", () => {
  signin();
  test("should delete the transaction, and respond with a status code of 200", async () => {
    const response = await req
      .delete("/transaction/4")
      .set("Authorization", token);
    expect(response.statusCode).toBe(200);
  });
});
