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

describe("POST/ create category", () => {
  signin();
  test("if given a name and type, should create a new record and respond with a status code of 200", async () => {
    const bodyData = [
      { categoryName: "medical", categoryType: "Spending" },
      { categoryName: "real estate", categoryType: "Income" },
    ];
    for (const i of bodyData) {
      const response = await req
        .post("/category")
        .set("Authorization", token)

        .send(i);
      expect(response.body.message.data.affectedRows).toBe(1);
      expect(response.statusCode).toBe(200);
    }
  });

  test("if not given a name and/or type, should respond with a status code of 400", async () => {
    const bodyData = [
      { categoryName: "medical" },
      { categoryType: "Spending" },
      {},
    ];
    for (const i of bodyData) {
      const response = await req
        .post("/category/")
        .set("Authorization", token)
        .send(i);
      expect(response.statusCode).toBe(400);
    }
  });
});

describe("GET/ category by id", () => {
  signin();
  test("if given a category id, should return the category's record", async () => {
    const response = await req.get("/category/2").set("Authorization", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.message.data).toEqual([
      {
        category_id: 2,
        user_id: 1,
        category_name: "gas",
        category_type: "Spending",
        budget_id: null,
        category_icon: null,
        hide: "true",
      },
    ]);
  });
  test("if given a category id that isn't in the database, should return empty array", async () => {
    const response = await req.get("/category/3").set("Authorization", token);
    expect(response.body.message.data).toEqual([]);
  });
});

describe("GET/ categories", () => {
  signin();
  test("if given an auth token, should return the users spending categories", async () => {
    const response = await req
      .get("/category/spending")
      .set("Authorization", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.message.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: userId,
          category_type: "Spending",
          category_name: "shopping",
          category_name: "gas",
          category_name: "medical",
        }),
      ])
    );
  });
  test("if given an auth token, should return the users income categories", async () => {
    const response = await req
      .get("/category/income")
      .set("Authorization", token);
    expect(response.statusCode).toBe(200);
    expect(response.body.message.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: userId,
          category_type: "Income",
          category_name: "job",
          category_name: "real estate",
        }),
      ])
    );
  });
});

describe("GET/ category from name", () => {
  test("if given a category name and a user id, should find category's id and respond with a status code of 200", async () => {
    const response = await req
      .get("/category/from/shopping")
      .set("Authorization", token);
    expect(response.body.message.data[0].category_id).toBe(1);
  });
});

describe("PUT/ category", () => {
  test("if given a new category name and icon, should respond with a status code of 200", async () => {
    const response = await req
      .put("/category/5")
      .set("Authorization", token)
      .send({ categoryName: "Job" });
    expect(response.statusCode).toBe(200);
    await req
      .put("/category/5")
      .set("Authorization", token)
      .send({ categoryName: "job" });
  });

  test("if given a new category name and icon, should update category name and icon", async () => {
    const response = await req
      .put("/category/5")
      .set("Authorization", token)
      .send({ categoryName: "Job" });
    const updated = await req.get("/category/5").set("Authorization", token);
    expect(updated.body.message.data[0].category_name).toBe("Job");
    await req
      .put("/category/5")
      .set("Authorization", token)
      .send({ categoryName: "job" });
  });

  test("if mandatory fields(name) are missing, should respond with json category name is a mandatory field", async () => {
    const response = await req
      .put("/category/5")
      .set("Authorization", token)
      .send({ icon: 35 });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("category name is a mandatory field");
  });
});

describe("PATCH/ update category with budget id", () => {
  test("if given a category id and a budget id, budget id should be saved for this category", async () => {
    await req
      .patch("/category/budget")
      .set("Authorization", token)
      .send({ categoryId: 1, budgetId: 1 });
    const updated = await req.get("/category/1").set("Authorization", token);
    expect(updated.body.message.data[0].budget_id).toBe(1);
    // await req
    //   .patch("/category/budget")
    //   .set("Authorization", token)
    //   .send({ categoryId: 1, budgetId: null });
    // const updated2 = await req.get("/category/1").set("Authorization", token);
    // expect(updated2.body.message.data[0].budget_id).toBe(null);
  });
  test("if given a category id and a budget id, should respond with a status code of 200", async () => {
    const response = await req
      .patch("/category/budget")
      .set("Authorization", token)
      .send({ categoryId: 1, budgetId: 1 });
    expect(response.statusCode).toBe(200);
    await req
      .patch("/category/budget")
      .set("Authorization", token)
      .send({ categoryId: 1, budgetId: null });
  });
  test("if category id is missing, should respond with json category id cannot be null", async () => {
    const response = await req
      .patch("/category/budget")
      .set("Authorization", token)
      .send({ categoryId: null });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("category id cannot be null");
  });
});

describe("PATCH/ hide category", () => {
  test("if given a category id, should update hide column with true", async () => {
    const response = await req.patch("/category/hide/2");
    const after = await req.get("/category/2").set("Authorization", token);
    expect(after.body.message.data[0].hide).toBe("true");
  });
});

describe("DELETE/ category", () => {
  signin();
  test("should delete the category, and respond with a status code of 200", async () => {
    const response = await req
      .delete("/category/6")
      .set("Authorization", token);
    expect(response.statusCode).toBe(200);
    const response2 = await req
      .delete("/category/7")
      .set("Authorization", token);
    expect(response2.statusCode).toBe(200);
  });
});
