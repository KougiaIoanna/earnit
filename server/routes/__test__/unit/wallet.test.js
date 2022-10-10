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
var walletId;
const req = supertest(http.createServer(app));
const signin = async () => {
  await request(app).post("/signin").send({
    email: "test@gmail.com",
    password: "password",
  });
};

describe("POST/ create wallet", () => {
  signin();
  test("if name and/or balance is missing, should respond with a status code of 400", async () => {
    const bodyData = [
      {
        walletName: "cash",
      },
      {
        balance: 0,
      },
    ];
    for (const i of bodyData) {
      const response = await req
        .post("/wallet")
        .set("Authorization", token)
        .send(i);

      expect(response.statusCode).toBe(400);
    }
  });

  test("if name and balance given, should respond with a status code of 200", async () => {
    const response = await req
      .post("/wallet")
      .set("Authorization", token)
      .send({ walletName: "cash", walletBalance: 40 });
    expect(response.body.message.data.affectedRows).toBe(1);

    expect(response.statusCode).toBe(200);
  });
});

describe("GET/ wallet by id", () => {
  signin();
  test("given a wallet id, should return the wallet's record", async () => {
    const response = await req
      .get("/wallet/2")
      .set("Authorization", token)
      .catch((error) => {
        console.log("error with get wallet by id");
      });
    expect(response.statusCode).toBe(200);

    expect(response.body.message.data).toEqual([
      {
        balance: 40,
        user_id: 1,
        wallet_id: 2,
        wallet_name: "cash",
      },
    ]);
  });
  test("given a wallet id that isn't in the database, should return empty array", async () => {
    const response = await req.get("/wallet/3").set("Authorization", token);
    expect(response.body.message.data).toEqual([]);
  });
});

describe("GET/ wallets", () => {
  signin();
  test("if given an auth token, should return the users wallets", async () => {
    const response = await req
      .get("/wallet")
      .set("Authorization", token)
      .catch((error) => {
        console.log("error with get wallets");
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          { user_id: userId },
          { wallet_name: "Paypal" },
          { wallet_name: "cash" }
        ),
      ])
    );
  });
});

describe("PUT/ wallet", () => {
  test("should update wallet name and balance when given both those values", async () => {
    const before = await req.get("/wallet/1").set("Authorization", token);
    let namebefore = before.body.message.data[0].wallet_name;
    let balancebefore = parseInt(before.body.message.data[0].balance);
    const response = await req
      .put("/wallet/1")
      .set("Authorization", token)
      .send({ walletName: namebefore + "!", balance: balancebefore + 1 });
    expect(response.statusCode).toBe(200);
    const after = await req.get("/wallet/1").set("Authorization", token);

    expect(after.body.message.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          { wallet_name: namebefore + "!" },
          { balance: balancebefore + 1 }
        ),
      ])
    );
    await req
      .put("/wallet/1")
      .set("Authorization", token)
      .send({ walletName: namebefore, balance: balancebefore });
  });

  test("if mandatory fields are missing, should respond with json mandatory fields cannot be null", async () => {
    const bodyData = [
      {
        walletBalance: 5,
      },
      {
        walletName: "cash",
      },
      {
        walletBalance: 5,
        walletName: null,
      },
      {
        walletBalance: null,
        walletName: "cash",
      },
    ];
    for (const i of bodyData) {
      const response = await req
        .put("/wallet/1")
        .set("Authorization", token)
        .send(i);
      expect(response.body.message).toBe("mandatory fields cannot be null");
    }
  });
});

describe("PATCH/ wallet amount", () => {
  signin();
  test("if given an amount, should update wallet's balance", async () => {
    const before = await req.get("/wallet/1").set("Authorization", token);
    let balancebefore = parseInt(before.body.message.data[0].balance);
    const response = await req
      .patch("/wallet/1")
      .set("Authorization", token)
      .send({
        balance: balancebefore + 1,
      });
    expect(response.statusCode).toBe(200);
    const after = await req.get("/wallet/1").set("Authorization", token);
    expect(after.body.message.data[0].balance).toBe(balancebefore + 1);
    await req.patch("/wallet/1").set("Authorization", token).send({
      balance: balancebefore,
    });
  });
});

describe("DELETE/ wallet", () => {
  signin();
  test("should delete the account", async () => {
    const response = await req.delete("/wallet/3").set("Authorization", token);
    expect(response.statusCode).toBe(200);
  });
});
