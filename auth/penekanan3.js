import request from "supertest";
import { expect } from "chai";
import { baseUrl } from "../data/config.js";
import { payCat, payCus, payload, payProduct, payPurchases, paySales, payUnits } from "../data/payload.js";

let accessToken;
let refreshToken;
let userId;
let unitId;
let categoryId;
let cusId;
let productId;
let purchaseId;
let currentDate = "2024-09-25"
let futureDate = "2024-09-26"
let getSalesId;

describe("endpoint - auth", () => {

    //get token
    it("get token auth", async () => {

        const response = await request (baseUrl)
        .post("/authentications")
        .set("Content-Type", "application/json")
        .send(payload)

        accessToken = (await response).body.data.accessToken
        refreshToken = (await response).body.data.refreshToken
        userId = (await response).body.data.user.id

        console.log('accessToken :', accessToken)
        console.log('refreshToken :', refreshToken)
        console.log('userId :', userId)


    }).timeout(10000)

    //login
    it("successfully login", async ()=> {
        const response = await request(baseUrl)
        .post('/authentications')
        .send(payload)
        .set("Content-Type", "application/json")

        // console.log((await response).body)

        //assertion
        expect((await response).status).to.equal(201)
        expect((await response).body.status).to.equal("success");
        expect((await response).body.message).to.equal("Authentication berhasil ditambahkan");
        expect((await response).body.data)
        .to.have.property("accessToken")
        .to.be.a("string");
      expect((await response).body.data)
        .to.have.property("refreshToken")
        .to.be.a("string");

    }).timeout(5000)
})

describe.skip("endpoint - users", async ()=> {
        //get user
        it("users - get user detail", async ()=> {
            const response = await request (baseUrl)
            .get("/users/" + (userId))
            .set("Authorization", `Bearer ${accessToken}`)
    
            console.log((await response).body)
    
            //assertion
            expect((await response).status).to.equal(200)
            expect((await response).body.status).to.equal("success")
    
        }).timeout(5000)
})

describe.skip("endpoint - units", async ()=> {

    //create unit
    it.skip("units - create units", async ()=> {
        const response = await request (baseUrl)
        .post("/units")
        .send(payUnits)
        .set("Authorization", `Bearer ${accessToken}`)

        unitId = (await response).body.data.units[0].id

        console.log("unitId", unitId)

        //assertion
        expect((await response).status).to.equal(201)
        expect((await response).body.status).to.equal("success")
        expect((await response).body.message).to.equal("Unit berhasil ditambahkan")
    })

    //get unit
    it("units - get units detail", async ()=> {
        const response = await request (baseUrl)
        .get("/units")
        .set("Authorization", `Bearer ${accessToken}`)

        unitId = (await response).body.data.units[0].id
        console.log("unitId :", unitId)

        //assertion
        expect((await response).status).to.equal(200)
        expect((await response).body.status).to.equal("success")
    
    }).timeout(5000)
})

describe.skip("endpoint - categories", async ()=> {
    //create category
    it.skip("categories - create category", async ()=> {
        const response = await request (baseUrl)
        .post("/categories")
        .send(payCat)
        .set("Authorization", `Bearer ${accessToken}`)

        console.log((await response).body)

        //assertion
        expect((await response).status).to.equal(201)
        expect((await response).body.status).to.equal("success")
        expect((await response).body.message).to.equal("Category berhasil ditambahkan")

    }).timeout(5000)

    //get category
    it("categories - get category", async ()=> {
        const response = await request (baseUrl)
        .get("/categories")
        .set("Authorization", `Bearer ${accessToken}`)

        categoryId = (await response).body.data.categories[0].id
        console.log('categoryId :', categoryId)

        //assertion
        expect((await response).status).to.equal(200)
        expect((await response).body.status).to.equal("success")

    }).timeout(5000)
})

describe.skip("endpoint - customers", async ()=> {

    //create customer
    it.skip("customers - create customers", async ()=> {
        const response = await request (baseUrl)
        .post("/customers")
        .send(payCus)
        .set("Authorization", `Bearer ${accessToken}`)

        console.log((await response).body)

        //assertion
        expect((await response).status).to.equal(201)
        expect((await response).body.status).to.equal("success")
        expect((await response).body.message).to.equal("Customer berhasil ditambahkan")
    })

    //get customer
    it("customers - get customers", async ()=> {
        const response = await request (baseUrl)
        .get("/customers")
        .set("Authorization", `Bearer ${accessToken}`)

        console.log((await response).body.data)

        cusId = (await response).body.data.customers[0].id
        console.log("CustomerId", cusId)

        //assertion
        expect((await response).status).to.equal(200)
        expect((await response).body.status).to.equal("success")
    })
})

describe.skip("endpoint - product", async ()=> {

    //create products
    it.skip("customers - create product", async ()=> {
        const response = await request (baseUrl)
        .post("/products")
        .send(payProduct)
        .set("Authorization", `Bearer ${accessToken}`)

        console.log((await response).body)

        //assertion
        expect((await response).status).to.equal(201)
        expect((await response).body.status).to.equal("success")
        expect((await response).body.message).to.equal("Product berhasil ditambahkan")
    })

    //get product
    it("customers - get product", async ()=> {
        const response = await request (baseUrl)
        .get("/products")
        .set("Authorization", `Bearer ${accessToken}`)

        productId = (await response).body.data.products[0].id
        console.log('productId :', productId)

        //assertion
        expect((await response).status).to.equal(200)
        expect((await response).body.status).to.equal("success")
    })
})

describe.skip("endpoint - sales", async ()=> {

    //create sales
    it.skip("sales - create sales", async ()=> {
        const response = await request (baseUrl)
        .post("/sales")
        .send(paySales)
        .set("Authorization", `Bearer ${accessToken}`)

        console.log((await response).body)

        //assertion
        expect((await response).status).to.equal(201)
        expect((await response).body.status).to.equal("success")
        expect((await response).body.message).to.equal("transaksi ditambahkan")
    })

    //get sales data
    it("sales - get list sale data", async ()=> {
        const response = await request (baseUrl)
        .get(`/sales`+`?startDate=${currentDate}&endDate=${futureDate}`)
        .set("Authorization", `Bearer ${accessToken}`)

        getSalesId = (await response).body.data.sales[0].id
        console.log('salesId :', getSalesId)

        //assertion
        expect((await response).status).to.equal(200)
        expect((await response).body.status).to.equal("success")
    })

    //get sales order data
    it("sales - get sale order data", async ()=> {
        const response = await request (baseUrl)
        .get(`/sales/`+ (getSalesId))
        .set("Authorization", `Bearer ${accessToken}`)

        console.log((await response).body)

        //assertion
        expect((await response).status).to.equal(200)
        expect((await response).body.status).to.equal("success")
    })
})

describe("endpoint - purchases", async ()=> {

    //create transaction
    it.skip("transaction - create transaction", async ()=> {
        const response = await request (baseUrl)
        .post("/purchases")
        .send(payPurchases)
        .set("Authorization", `Bearer ${accessToken}`)

        console.log((await response).body)

        //assertion
        expect((await response).status).to.equal(201)
        expect((await response).body.status).to.equal("success")
        expect((await response).body.message).to.equal("transaksi ditambahkan")
    })

    //get list transaction
    it("transaction - get list transaction", async ()=> {
        const response = await request (baseUrl)
        .get(`/purchases`+`?startDate=${currentDate}&endDate=${futureDate}`)
        .set("Authorization", `Bearer ${accessToken}`)

        purchaseId = (await response).body.data.purchases[0].id
        console.log('purchaseId :', purchaseId)

        //assertion
        expect((await response).status).to.equal(200)
        expect((await response).body.status).to.equal("success")
    })

    //get transaction detail
    it("transaction - get transaction detail", async ()=> {
        const response = await request (baseUrl)
        .get('/purchases/'+(purchaseId))
        .set("Authorization", `Bearer ${accessToken}`)

        console.log((await response).body)

        //assertion
        expect((await response).status).to.equal(200)
        expect((await response).body.status).to.equal("success")
    })
})