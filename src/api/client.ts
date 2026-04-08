export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface RequestOptions {
  method?: string;
  body?: unknown;
  token?: string;
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const fetchInit: RequestInit = {
    method,
    headers,
  };
  if (body !== undefined) {
    fetchInit.body = JSON.stringify(body);
  }

  const response = await fetch(path, fetchInit);

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText);
    throw new ApiError(response.status, text);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function uploadFile<T>(path: string, formData: FormData, token?: string): Promise<T> {
  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(path, {
    method: 'POST',
    headers,
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => response.statusText);
    throw new ApiError(response.status, text);
  }

  return response.json() as Promise<T>;
}
