export default {
    secret: String(process.env.JWT_SECRET), // Chuỗi bí mật để mã hóa JWT
    jwtExpiration: "1h", // Token hết hạn sau 1 giờ
    jwtRefreshExpiration: "7d", // Refresh token hết hạn sau 7 ngày
};
