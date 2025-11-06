declare class GeminiDataDto {
    generatedText: string;
    prompt: string;
    timestamp: string;
}
export declare class GeminiResponseDto {
    success: boolean;
    data: GeminiDataDto;
}
export {};
