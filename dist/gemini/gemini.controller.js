"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nest_winston_1 = require("nest-winston");
const gemini_service_1 = require("./gemini.service");
const generate_text_dto_1 = require("./dto/generate-text.dto");
const gemini_response_dto_1 = require("./dto/gemini-response.dto");
let GeminiController = class GeminiController {
    constructor(geminiService, logger) {
        this.geminiService = geminiService;
        this.logger = logger;
    }
    async generateContentDirect(geminiDirectDto) {
        try {
            this.logger.log(`Generating content with direct API format`, 'GeminiController');
            const result = await this.geminiService.generateContentDirect(geminiDirectDto);
            this.logger.log('Content generated successfully', 'GeminiController');
            return {
                success: true,
                data: {
                    generatedText: result,
                    prompt: geminiDirectDto.contents[0]?.parts[0]?.text || 'Direct API call',
                    timestamp: new Date().toISOString(),
                },
            };
        }
        catch (error) {
            this.logger.error(`Error generating content: ${error.message}`, error.stack, 'GeminiController');
            throw new common_1.HttpException({
                success: false,
                error: 'Failed to generate content',
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async generateText(generateTextDto) {
        try {
            this.logger.log(`Generating text for prompt: ${generateTextDto.prompt.substring(0, 50)}...`, 'GeminiController');
            const result = await this.geminiService.generateText(generateTextDto.prompt, generateTextDto.maxTokens, generateTextDto.temperature);
            this.logger.log('Text generated successfully', 'GeminiController');
            return {
                success: true,
                data: {
                    generatedText: result,
                    prompt: generateTextDto.prompt,
                    timestamp: new Date().toISOString(),
                },
            };
        }
        catch (error) {
            this.logger.error(`Error generating text: ${error.message}`, error.stack, 'GeminiController');
            throw new common_1.HttpException({
                success: false,
                error: 'Failed to generate text',
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async chat(generateTextDto) {
        try {
            this.logger.log(`Starting chat with message: ${generateTextDto.prompt.substring(0, 50)}...`, 'GeminiController');
            const result = await this.geminiService.chat(generateTextDto.prompt, generateTextDto.maxTokens, generateTextDto.temperature);
            this.logger.log('Chat response generated successfully', 'GeminiController');
            return {
                success: true,
                data: {
                    generatedText: result,
                    prompt: generateTextDto.prompt,
                    timestamp: new Date().toISOString(),
                },
            };
        }
        catch (error) {
            this.logger.error(`Error in chat: ${error.message}`, error.stack, 'GeminiController');
            throw new common_1.HttpException({
                success: false,
                error: 'Failed to process chat message',
                message: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.GeminiController = GeminiController;
__decorate([
    (0, common_1.Post)('generate-text'),
    (0, swagger_1.ApiOperation)({
        summary: 'Generate content using direct Gemini API format',
        description: 'Send content in the exact format expected by Gemini REST API'
    }),
    (0, swagger_1.ApiBody)({ type: generate_text_dto_1.GeminiDirectDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Content generated successfully',
        type: gemini_response_dto_1.GeminiResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid request parameters'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error or Gemini API error'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_text_dto_1.GeminiDirectDto]),
    __metadata("design:returntype", Promise)
], GeminiController.prototype, "generateContentDirect", null);
__decorate([
    (0, common_1.Post)('generate-text-simple'),
    (0, swagger_1.ApiOperation)({
        summary: 'Generate text using Gemini AI',
        description: 'Send a prompt to Gemini AI and receive generated text response'
    }),
    (0, swagger_1.ApiBody)({ type: generate_text_dto_1.GenerateTextDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Text generated successfully',
        type: gemini_response_dto_1.GeminiResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid request parameters'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error or Gemini API error'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_text_dto_1.GenerateTextDto]),
    __metadata("design:returntype", Promise)
], GeminiController.prototype, "generateText", null);
__decorate([
    (0, common_1.Post)('chat'),
    (0, swagger_1.ApiOperation)({
        summary: 'Start a chat conversation with Gemini AI',
        description: 'Send a message to Gemini AI in a conversational context'
    }),
    (0, swagger_1.ApiBody)({ type: generate_text_dto_1.GenerateTextDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Chat response generated successfully',
        type: gemini_response_dto_1.GeminiResponseDto
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid request parameters'
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal server error or Gemini API error'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [generate_text_dto_1.GenerateTextDto]),
    __metadata("design:returntype", Promise)
], GeminiController.prototype, "chat", null);
exports.GeminiController = GeminiController = __decorate([
    (0, swagger_1.ApiTags)('gemini'),
    (0, common_1.Controller)('gemini'),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)),
    __metadata("design:paramtypes", [gemini_service_1.GeminiService, Object])
], GeminiController);
//# sourceMappingURL=gemini.controller.js.map