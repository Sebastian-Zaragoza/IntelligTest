const axios = require("axios");
const API_URL = "http://localhost:4001/api/auth";

describe('Authentication Login Test', () => {
    it('should return a JWT string with valid credentials', async () => {
        const credentials = {
            email: 'correo@correo.com',
            password: 'password',
        };
        const response = await axios.post(`${API_URL}/login`, credentials);

        expect(response.status).toBe(200);
        expect(typeof response.data).toBe('string');
        expect(response.data.length).toBeGreaterThan(0);
    });


    it('should return a 401 error for a wrong password', async () => {
        const credentials = {
            email: 'correo@correo.com',
            password: 'wrongpassword',
        };

        try {
            await axios.post(`${API_URL}/login`, credentials);
        } catch (error) {
            const axiosError = error as any;
            expect(axiosError.response.status).toBe(401);
            expect(axiosError.response.data).toEqual({ error: "Password doesn't match"});
        }
    });

    it('should return a 404 error for a non-existent user', async () => {
        const credentials = {
            email: 'nouser@example.com',
            password: 'anypassword',
        };

        try {
            await axios.post(`${API_URL}/login`, credentials);
        } catch (error) {
            const axiosError = error as any;
            expect(axiosError.response.status).toBe(404);
            expect(axiosError.response.data).toEqual({ error: "User not found" });
        }
    });

});