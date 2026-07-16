"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCodespaceName = getCodespaceName;
exports.getBaseUrl = getBaseUrl;
exports.getApiMetadata = getApiMetadata;
function getCodespaceName() {
    return process.env.CODESPACE_NAME || '';
}
function getBaseUrl() {
    const codespaceName = getCodespaceName();
    return codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
}
function getApiMetadata() {
    const baseUrl = getBaseUrl();
    const codespaceName = getCodespaceName();
    return {
        baseUrl,
        CODESPACE_NAME: codespaceName || null,
        codespaceName: codespaceName || null,
        url: baseUrl
    };
}
