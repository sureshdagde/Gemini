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
exports.GeminiService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nest_winston_1 = require("nest-winston");
let GeminiService = class GeminiService {
    constructor(configService, logger) {
        this.configService = configService;
        this.logger = logger;
        this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
        this.apiKey = this.configService.get('gemini.apiKey');
        if (!this.apiKey) {
            this.logger.error('Gemini API key is not configured', 'GeminiService');
            throw new Error('Gemini API key is required. Please set GEMINI_API_KEY environment variable.');
        }
        this.logger.log('Gemini service initialized successfully', 'GeminiService');
    }
    async generateContentDirect(geminiDirectDto) {
        try {
            this.logger.debug(`Generating content with direct API call`, 'GeminiService');
            const url = `${this.baseUrl}/gemini-2.5-flash:generateContent?key=${this.apiKey}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(geminiDirectDto),
            });
            if (!response.ok) {
                const errorText = await response.text();
                this.logger.error(`Gemini API error: ${response.status} - ${errorText}`, 'GeminiService');
                throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
            }
            const result = await response.json();
            if (!result.candidates || !result.candidates[0] || !result.candidates[0].content) {
                throw new Error('Invalid response format from Gemini API');
            }
            const text = result.candidates[0].content.parts[0].text;
            this.logger.debug(`Generated text length: ${text.length}`, 'GeminiService');
            return text;
        }
        catch (error) {
            this.logger.error(`Error generating content: ${error.message}`, error.stack, 'GeminiService');
            throw error;
        }
    }
    async generateText(prompt, maxTokens, temperature) {
        try {
            this.logger.debug(`Generating text with prompt length: ${prompt.length}, maxTokens: ${maxTokens}, temperature: ${temperature}`, 'GeminiService');
            const geminiRequest = {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            };
            const text = await this.generateContentDirect(geminiRequest);
            this.logger.debug(`Generated text length: ${text.length}`, 'GeminiService');
            return text;
        }
        catch (error) {
            this.logger.error(`Error generating text: ${error.message}`, error.stack, 'GeminiService');
            throw error;
        }
    }
    async chat(message, maxTokens, temperature) {
        try {
            this.logger.debug(`Starting chat with message length: ${message.length}`, 'GeminiService');
            const geminiRequest = {
                contents: [
                    {
                        parts: [
                            {
                                text: message
                            }
                        ]
                    }
                ]
            };
            const text = await this.generateContentDirect(geminiRequest);
            this.logger.debug(`Chat response length: ${text.length}`, 'GeminiService');
            return text;
        }
        catch (error) {
            this.logger.error(`Error in chat: ${error.message}`, error.stack, 'GeminiService');
            throw error;
        }
    }
};
exports.GeminiService = GeminiService;
exports.GeminiService = GeminiService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)),
    __metadata("design:paramtypes", [config_1.ConfigService, Object])
], GeminiService);
//# sourceMappingURL=gemini.service.js.map