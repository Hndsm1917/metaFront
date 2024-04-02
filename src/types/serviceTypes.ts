export interface FetchOptions {
	baseURL?: string
	endpoint: string
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
	headers?: HeadersInit
	body?: BodyInit | null
}
