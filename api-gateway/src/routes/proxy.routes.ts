import { Router } from "express";
import { createProxyMiddleware, Options as ProxyOptions } from "http-proxy-middleware";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

const sectionProxyConfig: ProxyOptions = {
    target: "http://section-service.intelligtest-namespace.svc.cluster.local:4000",
    changeOrigin: true,
    pathRewrite: {
        "^/api/sections": "/api/sections",
    },
    onProxyReq: (proxyReq, req) => {
        const userId = req.headers["x-user-id"];
        if (userId) {
            proxyReq.setHeader("x-user-id", userId);
        }
        if (req.body && typeof req.body === 'object') {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    }
};
router.use("/api/sections", authenticate, createProxyMiddleware(sectionProxyConfig));

const userProxyConfig: ProxyOptions = {
    target: "http://auth-service.intelligtest-namespace.svc.cluster.local:4001",
    changeOrigin: true,
    pathRewrite: {
        "^/api/auth/user": "/api/auth/user",
    },
    onProxyReq: (proxyReq, req) => {
        const userId = req.headers["x-user-id"];
        if (userId) {
            proxyReq.setHeader("x-user-id", userId);
        }
        if (req.body && typeof req.body === 'object') {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    }
};
router.use("/api/auth/user", authenticate, createProxyMiddleware(userProxyConfig));

const check_passwordProxyConfig: ProxyOptions = {
    target: "http://auth-service.intelligtest-namespace.svc.cluster.local:4001",
    changeOrigin: true,
    pathRewrite: {
        "^/api/auth/check-password": "/api/auth/check-password",
    },
    onProxyReq: (proxyReq, req) => {
        const userId = req.headers["x-user-id"];
        if (userId) {
            proxyReq.setHeader("x-user-id", userId);
        }
        if (req.body && typeof req.body === 'object') {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader('Content-Type', 'application/json');
            proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    }
};
router.use("/api/auth/check-password", authenticate, createProxyMiddleware(check_passwordProxyConfig));

const notesProxyConfig: ProxyOptions = {
    target: "http://notes-service:4002",
    changeOrigin: true,
    pathRewrite: {
        "^/api/notes": "/api/notes",
    },
    onProxyReq: (proxyReq, req) => {
        const userId = req.headers["x-user-id"];
        if (userId) {
            proxyReq.setHeader("x-user-id", userId);
        }
        const contentType = req.headers["content-type"] || "";
        if (
            req.body &&
            typeof req.body === "object" &&
            !contentType.includes("multipart/form-data")
        ) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader("Content-Type", "application/json");
            proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    }
};

router.use("/api/notes", authenticate, createProxyMiddleware(notesProxyConfig));

const testProxyConfig: ProxyOptions = {
    target: "http://test-service:4003",
    changeOrigin: true,
    pathRewrite: {
        "^/api/test": "/api/test",
    },
    onProxyReq: (proxyReq, req) => {
        const userId = req.headers["x-user-id"];
        if (userId) {
            proxyReq.setHeader("x-user-id", userId);
        }
        const contentType = req.headers["content-type"] || "";
        if (
            req.body &&
            typeof req.body === "object" &&
            !contentType.includes("multipart/form-data")
        ) {
            const bodyData = JSON.stringify(req.body);
            proxyReq.setHeader("Content-Type", "application/json");
            proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
            proxyReq.write(bodyData);
        }
    }
};

router.use("/api/test", authenticate, createProxyMiddleware(testProxyConfig));
export default router;