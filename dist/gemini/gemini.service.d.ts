import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GeminiDirectDto } from './dto/generate-text.dto';
export declare class GeminiService {
    private configService;
    private readonly logger;
    private apiKey;
    private baseUrl;
    constructor(configService: ConfigService, logger: LoggerService);
    generateContentDirect(geminiDirectDto: GeminiDirectDto): Promise<string>;
    generateText(prompt: string, maxTokens?: number, temperature?: number): Promise<string>;
    chat(message: string, maxTokens?: number, temperature?: number): Promise<string>;
}
