export function withBasePath(path: string, basePath = import.meta.env.BASE_URL): string {
  const normalizedBase = basePath.endsWith("/") ? basePath : `${basePath}/`;
  return `${normalizedBase}${path.replace(/^\/+/, "")}`;
}
