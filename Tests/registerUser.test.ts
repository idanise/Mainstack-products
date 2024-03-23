import request from 'supertest'; 
import server, * as app from '../index'; 
import { User } from '../src/Models/Auth/userModel';
import { connectToDatabase } from '../src/Services/database.service';

beforeAll(async () => {
    await connectToDatabase(); 
});

describe('POST /api/user/signup', () => {

    jest.setTimeout(10000);
    it('should register a new user', async () => {
        const userData = {
            firstName: 'Danise',
            lastName: 'Iheme',
            middleName: null,
            phoneNumber: '08120076569',
            email: 'x@gmail.com',
            password: 'Password@123',
            confirmPassword: 'Password@123',
        };

        const response = await request(server)
            .post('/api/user/signup')
            .send(userData);

        expect(response.status).toBe(200);
    });
});