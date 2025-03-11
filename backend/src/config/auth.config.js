export const auth_config = {
    jwtExpiration: "1h", // Token hết hạn sau 1 giờ
    jwtRefreshExpiration: "7d", // Refresh token hết hạn sau 7 ngày
    secret: process.env.JWT_SECRET

    /* for test */
    // jwtExpiration: 60,          // 1 minute
    // jwtRefreshExpiration: 120,  // 2 minutes
};
