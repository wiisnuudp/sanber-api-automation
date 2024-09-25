import request from "supertest";
import { expect } from "chai";
import { baseUrl } from "../data/config.js";

const payload = 
`{
    "name": "Toko Wisnu",
    "email": "wisnuuu@email.com",
    "password": "123abcd@"
}`

describe("create account", () => {
    it.skip("create user account", async () => {

        const response = await request (baseUrl)
            .post("/registration")
            .set("Content-Type", "application/json")
            .send(payload)

            expect((await response).status).to.equal(201)
            console.log((await response).body)
    }).timeout(10000)

    it("get user account", async () => {

        const response = await request (baseUrl)
            .get("/registration")
            .set("Content-Type", "application/json")

            console.log((await response).body)

            expect((await response).status).to.equal(200)
    }).timeout(10000)

})