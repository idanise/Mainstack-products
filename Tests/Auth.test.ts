import request from 'supertest'; 
import server from '../index'; // Only import server from index.ts
import { connectToDatabase } from '../src/Services/database.service';

beforeAll(async () => {
    await connectToDatabase(); 
});


// AUTH TEST
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


/////////////////////////////////////////
// CATEGORY TESTS

// describe('Create category endpoint tests', () => {
//     jest.setTimeout(1000000);

//     let authToken: string;

//     beforeAll(async () => {
//             const loginResponse = await request(server)
//                 .post('/api/user/login')
//                 .send({
//                     email: 'daniseiheme@gmail.com',
//                     password: 'Password@123'
//                 });

//             authToken = loginResponse.body.data; 
  
//     });

//     it('should create a new category', async () => {
//         try {
//             const response = await request(server)
//                 .post('/api/category/create')
//                 .set('Authorization', `Bearer ${authToken}`)
//                 .send({
//                     name: 'New Category', 
//                     createdBy: "daniseiheme@gmail.com"
//                 });

//             expect(response.status).toBe(200);
        
//         } catch (error) {
//             console.error('Error creating category:', error);
//         }
//     });

// });


// describe('Create category endpoint tests', () => {
//     jest.setTimeout(1000000);

//     let authToken: string;

//     beforeAll(async () => {
//             const loginResponse = await request(server)
//                 .post('/api/user/login')
//                 .send({
//                     email: 'daniseiheme@gmail.com',
//                     password: 'Password@123'
//                 });

//             authToken = loginResponse.body.data; 
  
//     });

//     it('should create a new category', async () => {
//         try {
//             const response = await request(server)
//                 .post('/api/category/create')
//                 .set('Authorization', `Bearer ${authToken}`)
//                 .send({
//                     name: 'New Category', 
//                     createdBy: "daniseiheme@gmail.com"
//                 });

//             expect(response.status).toBe(200);
        
//         } catch (error) {
//             console.error('Error creating category:', error);
//         }
//     });

// });