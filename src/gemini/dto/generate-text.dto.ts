import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, Max, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PartDto {
  @ApiProperty({
    description: 'Text content of the part',
    example: 'Explain how AI works in details',
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}

class ContentDto {
  @ApiProperty({
    description: 'Array of parts containing the content',
    type: [PartDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PartDto)
  parts: PartDto[];
}

export class GeminiDirectDto {
  @ApiProperty({
    description: 'Array of content objects for Gemini API',
    type: [ContentDto],
    example: [
      {
        parts: [
          {
            text: 'Explain how AI works in details'
          }
        ]
      }
    ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ContentDto)
  contents: ContentDto[];
}

export class GenerateTextDto {
  @ApiProperty({
    description: 'The text prompt to send to Gemini AI',
    example: 'Write a short story about a robot learning to paint',
    minLength: 1,
    maxLength: 4000,
  })
  @IsString()
  @IsNotEmpty()
  prompt: string;

  @ApiProperty({
    description: 'Maximum number of tokens to generate',
    example: 1000,
    minimum: 1,
    maximum: 4000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(4000)
  maxTokens?: number;

  @ApiProperty({
    description: 'Temperature for randomness in generation (0.0 to 1.0)',
    example: 0.7,
    minimum: 0.0,
    maximum: 1.0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0.0)
  @Max(1.0)
  temperature?: number;
}