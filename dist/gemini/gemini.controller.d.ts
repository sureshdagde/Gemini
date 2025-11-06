import { LoggerService } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { GenerateTextDto, GeminiDirectDto } from './dto/generate-text.dto';
import { GeminiResponseDto } from './dto/gemini-response.dto';
export declare class GeminiController {
    private readonly geminiService;
    private readonly logger;
    constructor(geminiService: GeminiService, logger: LoggerService);
    generateContentDirect(geminiDirectDto: GeminiDirectDto): Promise<GeminiResponseDto>;
    generateText(generateTextDto: GenerateTextDto): Promise<GeminiResponseDto>;
    chat(generateTextDto: GenerateTextDto): Promise<GeminiResponseDto>;
}
