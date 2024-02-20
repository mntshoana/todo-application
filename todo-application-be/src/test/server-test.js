const request = require("supertest");
const server = require("../main/service/server");
const { resolve } = require("superagent/lib/request-base");


describe("Test retrieval of the list of tasks stored in the database", () => {
    test("GET method should respond with an http code 200", () => {
        return request(server)
            .get("/api/tasks")
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.body.message).toBe('success');
                expect(response.body.data).toBeDefined();
            });
    });
});

let insertedId = -1;
describe("Test insertion of the a single tasks into the database", () => {
    test("PUT method should respond with an http code 201", () => {
        return request(server, { json: true })
            .put("/api/task")
            .send({
                "title": 'test title',
                "description": 'test description',
                "date": '2020-01-01',
                "isDone": 0
            })
            .then(response => {
                expect(response.status).toBe(201);
                expect(response.body.message).toBe('success');
                expect(response.body.data).toBeDefined();
                insertedId = response.body.id;
            });
    });
});

describe("Test update of the a single tasks stored in the database", () => {
    test("POST method should respond with an http code 200", () => {
        return request(server)
            .post("/api/task/" + insertedId)
            .send({ "isDone": 1 })
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.body.message).toBe('success');
                expect(response.body.data).toBeDefined();
            });
    });
});

describe("Test retrieval of the a single tasks stored in the database", () => {
    test("GET method should respond with an http code 200", () => {
        return request(server)
            .get("/api/task/" + insertedId)
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.body.message).toBe('success');
                expect(response.body.data).toBeDefined();
            });
    });
});

describe("Test retrieval of the a single tasks stored in the database", () => {
    test("GET method should respond with an http code 404", () => {
        return request(server)
            .get("/api/task/-1")
            .then(response => {
                expect(response.status).toBe(404);
                expect(response.body.error).toBe('Task not found');
                expect(response.body.data).toBeUndefined()
                    ;
            });
    });
});

describe("Test editting a single tasks stored in the database", () => {
    test("Post method should respond with an http code 200", () => {
        return request(server)
            .post("/api/task/" + insertedId, {
                isDone: 1
            })
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.body.message).toBe('success');
                expect(response.body.data).toBeDefined();
            });
    });
});

describe("Test deletion of the a single tasks stored in the database", () => {
    test("Delete method should respond with an http code 204", () => {
        return request(server)
            .delete("/api/task/" + insertedId)
            .then(response => {
                expect(response.status).toBe(204);
                expect(response.body).toBeDefined();
            });
    });
});


describe("Test path which does not exist", () => {
    test("get method should respond with an http code 404", () => {
        return request(server)
            .get("/api/anything")
            .then(response => {
                expect(response.status).toBe(404);
            });
    });
});