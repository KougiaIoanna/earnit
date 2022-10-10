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

describe("POST/ create goal", () => {
  signin();
  test("if mandatory fields are missing(name), should respond with a status code of 400", async () => {
    const bodyData = [{}];
    for (const i of bodyData) {
      const response = await req
        .post("/goal")
        .set("Authorization", token)
        .send(i);
      expect(response.statusCode).toBe(400);
    }
  });

  test("if mandatory fields given(name), should create a record and respond with a status code of 200", async () => {
    const response = await req.post("/goal").set("Authorization", token).send({
      userId: userId,
      goalName: "vacation",
      targetAmount: 500,
      icon: 1,
    });
    expect(response.body.message.data.affectedRows).toBe(1);
    expect(response.statusCode).toBe(200);
  });
});

describe("GET/ goal by id", () => {
  signin();
  test("if given a goal id, should return the goal record", async () => {
    const response = await req.get("/goal/102").set("Authorization", token);

    expect(response.statusCode).toBe(200);

    expect(response.body.message.data).toEqual([
      {
        goal_id: 102,
        goal_name: "vacation",
        target_date: null,
        icon: 2,
        note: null,
        saved_amount: null,
        target_amount: 500,
        user_id: 1,
      },
    ]);
  });
  test("if given a goal id that isn't in the database, should return empty array", async () => {
    const response = await req.get("/goal/103").set("Authorization", token);
    expect(response.body.message.data).toEqual([]);
  });
});

describe("GET/ goals", () => {
  signin();
  test("if given an auth token, should return the users goals", async () => {
    const response = await req.get("/goal").set("Authorization", token);

    expect(response.statusCode).toBe(200);
    expect(response.body.message.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: userId,
          goal_name: "myGoal",
          goal_name: "vacation",
        }),
      ])
    );
  });
});

describe("PATCH/ update saved amount", () => {
  signin();
  test("if given a goal id and a new saved amount,should update the saved amount", async () => {
    const before = await req.get("/goal/120").set("Authorization", token);
    let oldSaved = parseInt(before.body.message.data[0].saved_amount);
    const response = await req
      .patch("/goal/120")
      .set("Authorization", token)
      .send({ amount: oldSaved + 10 });
    const after = await req.get("/goal/120").set("Authorization", token);
    let newSaved = parseInt(after.body.message.data[0].saved_amount);
    expect(newSaved).toBe(oldSaved + 10);
  });

  test("if amount field is missing, should respond with a status code of 400", async () => {
    const response = await req
      .patch("/goal/120")
      .set("Authorization", token)
      .send({});
    expect(response.statusCode).toBe(400);
  });
});

describe("PUT/ goal", () => {
  test("if given at least all mandatory fields, should update goal, and respond with a status code of 200", async () => {
    const response = await req
      .put("/goal/100")
      .set("Authorization", token)
      .send({
        goalName: "myGoal",
        tagretAmount: 1000,
        savedAmount: 0,
        targetDate: "2023-05-05",
        note: "a small note",
        icon: 1,
      });
    expect(response.statusCode).toBe(200);
  });

  test("if mandatory fields(name,icon) are missing, should respond with 'goal name is a mandatory field'", async () => {
    const response = await req
      .put("/goal/100")
      .set("Authorization", token)
      .send({ targetAmount: 50 });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("goal name is a mandatory field");
  });
});

describe("POST/ create goal assingment", () => {
  signin();
  test("if given a goal id and an amount, should create a new record and return a status code of 200", async () => {
    const response = await req
      .post("/goal-assignment/100")
      .set("Authorization", token)
      .send({ amount: 5 });
    expect(response.statusCode).toBe(200);
    expect(response.body.message.data.affectedRows).toBe(1);
  });
  test("if mandatory fields ( amount) are missing, should return a status code of 400", async () => {
    const bodyData = [{ amount: 5 }];
    for (const i of bodyData) {
      const response = await req
        .post("/goal-assignment")
        .set("Authorization", token)
        .send(i);
      expect(response.statusCode).toBe(404);
    }
  });
});

describe("POST/ calculate montly amount assigned to goal", () => {
  signin();
  test("if given a start and an end date, should return the total amount", async () => {
    const response = await req
      .post("/goal-assignment/monthly-sum/100")
      .set("Authorization", token)
      .send({ start: "2022-09-01", end: "2022-09-31" });
    expect(response.statusCode).toBe(200);
  });
});

describe("DELETE/ goal", () => {
  signin();
  test("should delete the goal", async () => {
    const response = await req.delete("/goal/101").set("Authorization", token);
    expect(response.statusCode).toBe(200);
  });
});
