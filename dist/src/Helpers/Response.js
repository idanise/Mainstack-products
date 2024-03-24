"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInfo = void 0;
const ResponseInfo = {
    Success: { code: "00", description: "Success" },
    Failed: { code: "01", description: "Failed" },
    NotFound: { code: "02", description: "Not Found" },
    InvalidId: { code: "03", description: "Invalid Id" },
    UserExists: { code: "04", description: "User exists" },
    SystemMalfunction: { code: "05", description: "System Failed" },
    InvalidUser: { code: "06", description: "Invalid email or password" },
    InvalidCredentials: { code: "07", description: "Invalid credentials" },
    ProductNotFound: { code: "08", description: "Product not found" },
    CategoryNotFound: { code: "09", description: "Category not found" }
};
exports.ResponseInfo = ResponseInfo;
