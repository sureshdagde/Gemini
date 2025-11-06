declare class PartDto {
    text: string;
}
declare class ContentDto {
    parts: PartDto[];
}
export declare class GeminiDirectDto {
    contents: ContentDto[];
}
export declare class GenerateTextDto {
    prompt: string;
    maxTokens?: number;
    temperature?: number;
}
export {};
