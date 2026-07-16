function getCodespaceName() {
  return import.meta.env.VITE_CODESPACE_NAME || '';
}

export function getBaseUrl() {
  const codespaceName = getCodespaceName();
  return codespaceName
    ? `https://${codespaceName}`
    : 'http://localhost:8000';
    //`https://${codespaceName}-8000.app.github.dev`
}

export function getApiUrl(path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getBaseUrl()}${normalizedPath}`;
}
