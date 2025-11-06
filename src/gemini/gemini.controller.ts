import { 
  Controller, 
  Post, 
  Body, 
  Inject, 
  LoggerService, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody 
} from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { GeminiService } from './gemini.service';
import { GenerateTextDto, GeminiDirectDto } from './dto/generate-text.dto';
import { GeminiResponseDto } from './dto/gemini-response.dto';

@ApiTags('gemini')
@Controller('gemini')
export class GeminiController {
  constructor(
    private readonly geminiService: GeminiService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Post('generate-text')
  @ApiOperation({ 
    summary: 'Generate content using direct Gemini API format',
    description: 'Send content in the exact format expected by Gemini REST API'
  })
  @ApiBody({ type: GeminiDirectDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Content generated successfully',
    type: GeminiResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid request parameters' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Internal server error or Gemini API error' 
  })
  async generateContentDirect(@Body() geminiDirectDto: GeminiDirectDto): Promise<GeminiResponseDto> {
    try {
      this.logger.log(
        `Generating content with direct API format`,
        'GeminiController'
      );

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
    } catch (error) {
      this.logger.error(
        `Error generating content: ${error.message}`,
        error.stack,
        'GeminiController'
      );

      throw new HttpException(
        {
          success: false,
          error: 'Failed to generate content',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('generate-text-simple')
  @ApiOperation({ 
    summary: 'Generate text using Gemini AI',
    description: 'Send a prompt to Gemini AI and receive generated text response'
  })
  @ApiBody({ type: GenerateTextDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Text generated successfully',
    type: GeminiResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid request parameters' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Internal server error or Gemini API error' 
  })
  async generateText(@Body() generateTextDto: GenerateTextDto): Promise<GeminiResponseDto> {
    try {
      this.logger.log(
        `Generating text for prompt: ${generateTextDto.prompt.substring(0, 50)}...`,
        'GeminiController'
      );

      const result = await this.geminiService.generateText(
        generateTextDto.prompt,
        generateTextDto.maxTokens,
        generateTextDto.temperature
      );

      this.logger.log('Text generated successfully', 'GeminiController');

      return {
        success: true,
        data: {
          generatedText: result,
          prompt: generateTextDto.prompt,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      this.logger.error(
        `Error generating text: ${error.message}`,
        error.stack,
        'GeminiController'
      );

      throw new HttpException(
        {
          success: false,
          error: 'Failed to generate text',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('chat')
  @ApiOperation({ 
    summary: 'Start a chat conversation with Gemini AI',
    description: 'Send a message to Gemini AI in a conversational context'
  })
  @ApiBody({ type: GenerateTextDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Chat response generated successfully',
    type: GeminiResponseDto
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid request parameters' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Internal server error or Gemini API error' 
  })
  async chat(@Body() generateTextDto: GenerateTextDto): Promise<GeminiResponseDto> {
    try {
      this.logger.log(
        `Starting chat with message: ${generateTextDto.prompt.substring(0, 50)}...`,
        'GeminiController'
      );

      const result = await this.geminiService.chat(
        generateTextDto.prompt,
        generateTextDto.maxTokens,
        generateTextDto.temperature
      );

      this.logger.log('Chat response generated successfully', 'GeminiController');

      return {
        success: true,
        data: {
          generatedText: result,
          prompt: generateTextDto.prompt,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      this.logger.error(
        `Error in chat: ${error.message}`,
        error.stack,
        'GeminiController'
      );

      throw new HttpException(
        {
          success: false,
          error: 'Failed to process chat message',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}