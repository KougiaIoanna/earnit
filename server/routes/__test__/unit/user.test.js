const request = require("supertest");
const app = require("../../../server");
const routes = require("../../user");

const deleteUser = async (email) => {
  const response = await request(app)
    .delete("/delete-user")
    .send({ email: email });
};

const createUser = async () => {
  await request(app).post("/user").send({
    email: "mary@gmail.com",
    username: "mary",
    password: "verysecretpassword",
    confirmPassword: "verysecretpassword",
  });
};

const signin = async () => {
  await request(app).post("/signin").send({
    email: "test@gmail.com",
    password: "password",
  });
};
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2MjI3NDE1NCwiZXhwIjoxNjkzODMxNzU0fQ.lPsnHUY41BS3ckRzxmMlEGP44DiQbCqe69PA4gUchrg";

describe("POST/create-user", () => {
  beforeEach(() => {
    deleteUser("doe@gmail.com");
  });
  test("if given a valid username, password and confirm password, should respond with json created successfully", async () => {
    const response = await request(app).post("/user").send({
      email: "doe@gmail.com",
      username: "jane",
      password: "verysecretpassword",
      confirmPassword: "verysecretpassword",
    });
    expect(response.body.message.data.affectedRows).toBe(1);

    expect(response.body.message.message).toStrictEqual(
      "user created successfully"
    );
  });
  test("if given a valid username, password and confirm password, should respond with a 200 status code", async () => {
    const response = await request(app).post("/user").send({
      email: "doe@gmail.com",
      username: "jane",
      password: "verysecretpassword",
      confirmPassword: "verysecretpassword",
    });
    expect(response.body.message.data.affectedRows).toBe(1);
    expect(response.statusCode).toBe(200);
  });

  deleteUser("doe@gmail.com");

  test("if data is missing, should respond with a status code of 400", async () => {
    const bodyData = [
      { email: "doe@gmail.com" },
      { email: "doe@gmail.com", username: "doe" },
      { username: "doe" },
      { email: "doe@gmail.com", password: "123456789" },
      { email: "doe@gmail.com", confirmPassword: "123456789" },
      { password: "123456789" },
      { password: "123456789", username: "doe" },
      { password: "123456789", confirmPassword: "123456789" },
      { confirmPassword: "123456789", username: "doe" },
      {},
    ];
    for (const i of bodyData) {
      const response = await request(app).post("/user").send(i);
      expect(response.statusCode).toBe(400);
    }
  });

  deleteUser("doe@gmail.com");

  test("if given invalid email, should respond with json invalid email", async () => {
    const response = await request(app).post("/user").send({
      email: "doe",
      password: "verysecretpassword",
      confirmPassword: "verysecretpassword",
    });
    expect(response.body).toStrictEqual({
      success: false,
      message: "Invalid email!",
    });
  });

  deleteUser("doe@gmail.com");

  test("if given invalid password, should respond with json invalid password", async () => {
    const response = await request(app).post("/user").send({
      email: "doe@gmail.com",
      password: "very",
      confirmPassword: "very",
    });
    expect(response.body).toStrictEqual({
      success: false,
      message: "Password must be 8 to 20 characters long!",
    });
  });

  deleteUser("doe@gmail.com");

  test("if given passwords that do not match, should respond with json passwords dont match", async () => {
    const response = await request(app).post("/user").send({
      email: "doe@gmail.com",
      password: "verysecretpassword",
      confirmPassword: "verysecretindeed",
    });
    expect(response.body).toStrictEqual({
      success: false,
      message: "Both password must be same!",
    });
  });
  deleteUser("doe@gmail.com");
});

describe("POST/signin", () => {
  createUser();
  test("if given a valid email and matching password, response should have email", async () => {
    const response = await request(app).post("/signin").send({
      email: "mary@gmail.com",
      password: "verysecretpassword",
    });
    expect(response.body.message.email).toEqual("mary@gmail.com");
  });
  test("if given a valid email and matching password, should respond with a 200 status code", async () => {
    const response = await request(app).post("/signin").send({
      email: "mary@gmail.com",
      password: "verysecretpassword",
    });

    expect(response.statusCode).toBe(200);
  });

  test("if the username and/or password is missing, should respond with json email/password is required and with a status code of 400", async () => {
    const bodyData = [
      { email: "mary@gmail.com" },
      { password: "verysecretpassword" },
      {},
    ];
    for (const i of bodyData) {
      const response = await request(app).post("/signin").send(i);
      expect(response.statusCode).toBe(400);
      expect(response.body).toStrictEqual({
        success: false,
        message: "email/password is required",
      });
    }
  });

  test("if email/password dont match, should respond with json email/password dont match ", async () => {
    const response = await request(app).post("/signin").send({
      email: "mary@gmail.com",
      password: "notmaryspassword",
    });
    expect(response.body).toStrictEqual({
      success: false,
      message: "email/password dont match",
    });
  });

  deleteUser("mary@gmail.com");
});

describe("POST/sign-out", () => {
  signin();
  test("should respond with json successfully signed out and with a status code of 200", async () => {
    const response = await request(app).post("/signout").send({
      token: token,
    });
    expect(response.body.message.status).toEqual("successfully signed out");
    expect(response.statusCode).toBe(200);
  });
});
