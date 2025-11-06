import { ApiProperty } from '@nestjs/swagger';

class GeminiDataDto {
  @ApiProperty({
    description: 'The generated text from Gemini AI',
    example: 'Once upon a time, there was a robot named Canvas who discovered the beauty of colors...',
  })
  generatedText: string;

  @ApiProperty({
    description: 'The original prompt that was sent',
    example: 'Write a short story about a robot learning to paint',
  })
  prompt: string;

  @ApiProperty({
    description: 'Timestamp when the response was generated',
    example: '2024-01-15T10:30:00.000Z',
  })
  timestamp: string;
}

export class GeminiResponseDto {
  @ApiProperty({
    description: 'Indicates if the request was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'The response data from Gemini AI',
    type: GeminiDataDto,
  })
  data: GeminiDataDto;
}