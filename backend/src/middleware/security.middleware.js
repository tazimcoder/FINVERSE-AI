/**
 * ==========================================================
 * FINVERSE AI
 * Enterprise High Security & Anti-Brute-Force Middleware
 * ==========================================================
 */

// In-memory rate limiting store for IP tracking
const loginAttemptsMap = new Map();

/**
 * Anti-Brute Force Rate Limiter for Login Endpoint
 * Allows max 10 login attempts per IP address per 15 minutes.
 */
export function rateLimiterMiddleware(req, res, next) {
    const ip = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxAttempts = 10;

    const record = loginAttemptsMap.get(ip) || { count: 0, startTime: now };

    if (now - record.startTime > windowMs) {
        // Reset window
        record.count = 1;
        record.startTime = now;
    } else {
        record.count += 1;
    }

    loginAttemptsMap.set(ip, record);

    if (record.count > maxAttempts) {
        return res.status(429).json({
            success: false,
            message: "Too many login attempts from this IP address. Account temporarily locked for 15 minutes for security protection.",
        });
    }

    next();
}

/**
 * Security Headers Enforcer
 */
export function securityHeadersMiddleware(req, res, next) {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.setHeader("Content-Security-Policy", "default-src 'self' 'unsafe-inline' 'unsafe-eval' https:;");
    next();
}
