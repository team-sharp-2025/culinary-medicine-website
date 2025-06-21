export class ApiResponse<T> {
    success: boolean
    response: T | null
    total: number
    error: { message: string } | null
    timestamp: string

    private constructor(
        success: boolean,
        response: T | null,
        error: { message: string } | null
    ) {
        this.success = success
        this.response = response
        this.total = Array.isArray(response) ? response.length : response ? 1 : 0
        this.error = error
        this.timestamp = new Date().toISOString()
    }

    static success<T>(response: T): ApiResponse<T> {
        return new ApiResponse<T>(true, response, null)
    }

    static error<T>(message: string): ApiResponse<T> {
        return new ApiResponse<T>(false, null, { message: message })
    }
}
