import request from 'supertest'; 
import server from '../index'; // Only import server from index.ts
import { connectToDatabase } from '../src/Services/database.service';

beforeAll(async () => {
    await connectToDatabase(); 
});


/**------------------------------------------------- START PRODUCTS TEST ------------------------- */ 

describe('POST /api/user/signup', () => {
    jest.setTimeout(1000000);

    it('should return "User exists" response when user already exists', async () => {
        const userData = {
            firstName : "Danise",
            lastName : "Iheme", 
            middleName : null, 
            phoneNumber : "08120076569", 
            email : "daniseiheme@gmail.com", 
            password : "Password@123", 
            confirmPassword : "Password@123"
        };

        const response = await request(server)
            .post('/api/user/signup')
            .send(userData);

        expect(response.status).toBe(400);

        expect(response.body).toEqual({
            responseCode: '04',
            responseMessage: 'User exists',
            data: null
        }); 
    });
});



describe('POST /api/user/signup', () => {
    jest.setTimeout(1000000);

    it('should return password does not match', async () => {
        const email = `testuser${Math.floor(Math.random() * 100000)}@example.com`;

        const userData = {
            firstName : "Danise",
            lastName : "Iheme", 
            middleName : null, 
            phoneNumber : "08120076569", 
            email : email, 
            password : "Password@12", 
            confirmPassword : "Password@123"
        };

        const response = await request(server)
            .post('/api/user/signup')
            .send(userData);

            expect(response.status).toBe(400);

            expect(response.body.errors).toBeDefined();
    
            const validationError = response.body.errors[0];
            expect(validationError.msg).toBe('Passwords do not match');
            expect(validationError.type).toBe('field');
            expect(validationError.value).toBe('Password@123');
            expect(validationError.path).toBe('confirmPassword');
            expect(validationError.location).toBe('body');
    });
});


describe('POST /api/user/signup', () => {
    jest.setTimeout(1000000);

    it('should create a user', async () => {
        const email = `testuser${Math.floor(Math.random() * 100000)}@example.com`;

        const userData = {
            firstName: 'Test',
            lastName: 'User', 
            middleName: null, 
            phoneNumber: '08120076569', 
            email: email, 
            password: 'Password@123', 
            confirmPassword: 'Password@123'
        };

        const response = await request(server)
            .post('/api/user/signup')
            .send(userData);

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            responseCode: '00',
            responseMessage: 'Success',
            data: {
                acknowledged: true,
                insertedId: expect.any(String) 
            }
        }); 
    });
});


describe('POST /api/user/login', () => {
    jest.setTimeout(1000000);

    it('should login a user', async () => {

        const userData = {
            email: 'daniseiheme@gmail.com',
            password: 'Password@123', 
        };

        const response = await request(server)
            .post('/api/user/login')
            .send(userData);

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            responseCode: '00',
            responseMessage: 'Success',
            data: expect.any(String) 
        });
    });
});




describe('POST /api/user/login', () => {
    jest.setTimeout(1000000);

    it('should throw an invalid password a user', async () => {

        const userData = {
            email: 'daniseiheme@gmail.com',
            password: 'Password@12', 
        };

        const response = await request(server)
            .post('/api/user/login')
            .send(userData);

        expect(response.status).toBe(401);

        expect(response.body).toEqual({
            responseCode: '07',
            responseMessage: 'Invalid credentials',
            data: null
        });
    });
});
 /**------------------------------------------------- END AUTH TEST ------------------------- */ 


/**------------------------------------------------- BEGIN CATEGORY TEST ------------------------- */ 


//This tests all the category endpoints
describe('Create category endpoint tests', () => {
    jest.setTimeout(1000000);

    let authToken: string;
    let categoryId: string;

    beforeAll(async () => {
        const loginResponse = await request(server)
            .post('/api/user/login')
            .send({
                email: 'daniseiheme@gmail.com',
                password: 'Password@123'
            });

        authToken = loginResponse.body.data;
    });

    it('should create a new category', async () => {
        try {
            const response = await request(server)
                .post('/api/category/create')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name: 'New Category',
                    createdBy: "daniseiheme@gmail.com"
                });

            expect(response.status).toBe(200);
            expect(response.body.responseCode).toBe("00");
            expect(response.body.responseMessage).toBe("Success");
            expect(response.body.data.acknowledged).toBe(true);
            expect(response.body.data.insertedId).toBeDefined(); 
            categoryId = response.body.data.insertedId; 
        
        } catch (error) {
            console.error('Error creating category:', error);
        }
    });

    describe('Get category by id', () => {
        jest.setTimeout(1000000);

        it('should get a category by id', async () => {
            try {
                const response = await request(server)
                    .get(`/api/category/get?categoryId=${categoryId}`)
                    .set('Authorization', `Bearer ${authToken}`);

                expect(response.status).toBe(200);
                expect(response.body.responseCode).toBe("00");
                expect(response.body.responseMessage).toBe("Success");
                expect(response.body.data).toBeDefined();
                expect(response.body.data._id).toBe(categoryId);
        
            } catch (error) {
                console.error('Error getting category by id:', error);
            }
        });
    });

    describe('Get all category', () => {
        jest.setTimeout(1000000);

        it('should get all category', async () => {
            try {
                const response = await request(server)
                    .get(`/api/category/getall`)
                    .set('Authorization', `Bearer ${authToken}`);

                expect(response.status).toBe(200);
                expect(response.body.responseCode).toBe("00");
                expect(response.body.responseMessage).toBe("Success");
                expect(response.body.data).toBeDefined();        
            } catch (error) {
                console.error('Error getting category by id:', error);
            }
        });
    });



    describe('Update single category', () => {
        jest.setTimeout(1000000);

        it('should update a category by id', async () => {
            try {

                const updateData = {
                    name : "Updated bag",
                };

                const response = await request(server)
                    .put(`/api/category/update?categoryId=${categoryId}`)
                    .set('Authorization', `Bearer ${authToken}`)
                    .send(updateData); 

                expect(response.status).toBe(200);
                expect(response.body.responseCode).toBe("00");
                expect(response.body.responseMessage).toBe("Success");
            } catch (error) {
                console.error('Error getting category by id:', error);
            }
        });
    });


    describe('Delete single category', () => {
        jest.setTimeout(1000000);

        it('should delete a category by id', async () => {
            try {

                 const response = await request(server)
                    .delete(`/api/category/delete?categoryId=${categoryId}`)
                    .set('Authorization', `Bearer ${authToken}`)

                expect(response.status).toBe(200);
                expect(response.body.responseCode).toBe("00");
                expect(response.body.responseMessage).toBe("Success");
            } catch (error) {
                console.error('Error getting category by id:', error);
            }
        });
    });

});

/**------------------------------------------------- END CATEGORY TEST ------------------------- */ 




/**------------------------------------------------- BEGIN PRODUCT TEST ------------------------- */ 

describe('Create product endpoint tests', () => {
    jest.setTimeout(1000000);

    let authToken: string;
    let productId: string;

    beforeAll(async () => {
        const loginResponse = await request(server)
            .post('/api/user/login')
            .send({
                email: 'daniseiheme@gmail.com',
                password: 'Password@123'
            });

        authToken = loginResponse.body.data;
    });

    it('should create a new product', async () => {
        try {
            const response = await request(server)
                .post('/api/product/create')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    name : "Test product bag", 
                    category : "660035e90f6d3033ddf28ad2", 
                    description : "Dami gee gucci bag", 
                    price : "100000", 
                    quantity : "10", 
                    photo : "iVBORw0KGgoAAAANSUhEUgAAAC8AAAAxCAYAAABK+/BHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAADqSURBVGhD7ZGNCoUgDEZ9/5f2tosflK1InfuBHRiD0u18VWpgUt6KlLci5a1IeSvM5EtZX53yM6R86+qkfOvqpHzr6qQ8DZGqEUbPcxwz5D7+SAh38gAhUBwSe48Z8vJnngKEkAd9iFDyAPtCyhO0c2Uv7v8nrA6bYWZnf+dyWzPAqDx39vZEKwDkz8Xx+q71C0+HJel3QLKvN9zIz/A4YXeAlG+dZWcAFfkdAaRmfpoiHUJVHkiFMJEnQssTq8vDykuJE9OTSGJGxIU8GJVxJU+M/AV38uBLCLfyACG4kmSLvBYpb0Vg+Vp/7LxqdPE2nigAAAAASUVORK5CYII=", 
                    createdBy : "daniseiheme@gmail.com"
                });

            expect(response.status).toBe(200);
            expect(response.body.responseCode).toBe("00");
            expect(response.body.responseMessage).toBe("Success");
            expect(response.body.data.acknowledged).toBe(true);
            expect(response.body.data.insertedId).toBeDefined(); 
            productId = response.body.data.insertedId; 
            console.log(`This is the product id of the new product ${productId}`); 
        
        } catch (error) {
            console.error('Error creating product:', error);
        }
    });



    describe('Get product by id', () => {
        jest.setTimeout(1000000);

        it('should get a product by id', async () => {
            try {
                const response = await request(server)
                    .get(`/api/product/get?productId=${productId}`)
                    .set('Authorization', `Bearer ${authToken}`);

                expect(response.status).toBe(200);
                expect(response.body.responseCode).toBe("00");
                expect(response.body.responseMessage).toBe("Success");
                expect(response.body.data).toBeDefined();
                expect(response.body.data._id).toBe(productId);
        
            } catch (error) {
                console.error('Error getting category by id:', error);
            }
        });
    });


    describe('Get all products by category', () => {
        jest.setTimeout(1000000);

        it('should get a product by id', async () => {
            try {
                const response = await request(server)
                    .get(`/api/product/get/productsByCategory?categoryId=660035e90f6d3033ddf28ad2`)
                    .set('Authorization', `Bearer ${authToken}`);

                expect(response.status).toBe(200);
                expect(response.body.responseCode).toBe("00");
                expect(response.body.responseMessage).toBe("Success");
                expect(response.body.data).toBeDefined();
        
            } catch (error) {
                console.error('Error getting category by id:', error);
            }
        });
    });

    describe('Update single product', () => {
        jest.setTimeout(1000000);

        it('should update a product by id', async () => {
            try {

                const updateData = {
                    name : "Sample update for bag", 
                    description : "This is an update test", 
                    price : "52000", 
                    quantity : "54", 
                    numberSold : "23"          
                };

                const response = await request(server)
                    .put(`/api/product/update?productId=${productId}`)
                    .set('Authorization', `Bearer ${authToken}`)
                    .send(updateData); 

                expect(response.status).toBe(200);
                expect(response.body.responseCode).toBe("00");
                expect(response.body.responseMessage).toBe("Success");

                console.log(`This is the product id of the product to update${productId}`); 

            } catch (error) {
                console.error('Error getting product by id:', error);
            }
        });
    });


    describe('Delete product by id', () => {
        jest.setTimeout(1000000);

        it('should delete a product by id', async () => {
            try {

                 const response = await request(server)
                    .delete(`/api/product/delete?productId=${productId}`)
                    .set('Authorization', `Bearer ${authToken}`)

                expect(response.status).toBe(200);
                expect(response.body.responseCode).toBe("00");
                expect(response.body.responseMessage).toBe("Success");
            } catch (error) {
                console.error('Error getting product by id:', error);
            }
        });
    });

});

/**------------------------------------------------- END PRODUCT TEST ------------------------- */ 
