import request from 'supertest'; 
import server from '../index'; // Only import server from index.ts
import { connectToDatabase } from '../src/Services/database.service';

beforeAll(async () => {
    await connectToDatabase(); 
});



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