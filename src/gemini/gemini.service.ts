import { Injectable, Inject, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { GeminiDirectDto } from './dto/generate-text.dto';

@Injectable()
export class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';

  constructor(
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.apiKey = this.configService.get<string>('gemini.apiKey');
    
    if (!this.apiKey) {
      this.logger.error('Gemini API key is not configured', 'GeminiService');
      throw new Error('Gemini API key is required. Please set GEMINI_API_KEY environment variable.');
    }

    this.logger.log('Gemini service initialized successfully', 'GeminiService');
  }

  async generateContentDirect(geminiDirectDto: GeminiDirectDto): Promise<string> {
    try {
      this.logger.debug(
        `Generating content with direct API call`,
        'GeminiService'
      );

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
        this.logger.error(
          `Gemini API error: ${response.status} - ${errorText}`,
          'GeminiService'
        );
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      
      if (!result.candidates || !result.candidates[0] || !result.candidates[0].content) {
        throw new Error('Invalid response format from Gemini API');
      }

      const text = result.candidates[0].content.parts[0].text;

      this.logger.debug(
        `Generated text length: ${text.length}`,
        'GeminiService'
      );

      return text;
    } catch (error) {
      this.logger.error(
        `Error generating content: ${error.message}`,
        error.stack,
        'GeminiService'
      );
      throw error;
    }
  }

  async generateText(
    prompt: string,
    maxTokens?: number,
    temperature?: number,
  ): Promise<string> {
    try {
      this.logger.debug(
        `Generating text with prompt length: ${prompt.length}, maxTokens: ${maxTokens}, temperature: ${temperature}`,
        'GeminiService'
      );

      // Convert simple prompt to Gemini API format
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

      this.logger.debug(
        `Generated text length: ${text.length}`,
        'GeminiService'
      );

      return text;
    } catch (error) {
      this.logger.error(
        `Error generating text: ${error.message}`,
        error.stack,
        'GeminiService'
      );
      throw error;
    }
  }

  async chat(
    message: string,
    maxTokens?: number,
    temperature?: number,
  ): Promise<string> {
    try {
      this.logger.debug(
        `Starting chat with message length: ${message.length}`,
        'GeminiService'
      );

      // Convert chat message to Gemini API format
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

      this.logger.debug(
        `Chat response length: ${text.length}`,
        'GeminiService'
      );

      return text;
    } catch (error) {
      this.logger.error(
        `Error in chat: ${error.message}`,
        error.stack,
        'GeminiService'
      );
      throw error;
    }
  }
}