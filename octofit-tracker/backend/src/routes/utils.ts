export function getCodespaceName() {
  return process.env.CODESPACE_NAME || '';
}

export function getBaseUrl() {
  const codespaceName = getCodespaceName();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

export function getApiMetadata() {
  const baseUrl = getBaseUrl();
  const codespaceName = getCodespaceName();
  return {
    baseUrl,
    CODESPACE_NAME: codespaceName || null,
    codespaceName: codespaceName || null,
    url: baseUrl
  };
}
