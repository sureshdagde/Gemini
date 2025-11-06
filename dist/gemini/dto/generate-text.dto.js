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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateTextDto = exports.GeminiDirectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PartDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Text content of the part',
        example: 'Explain how AI works in details',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PartDto.prototype, "text", void 0);
class ContentDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of parts containing the content',
        type: [PartDto],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PartDto),
    __metadata("design:type", Array)
], ContentDto.prototype, "parts", void 0);
class GeminiDirectDto {
}
exports.GeminiDirectDto = GeminiDirectDto;
__decorate([
    (0, swagger_1.ApiProperty)({
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
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ContentDto),
    __metadata("design:type", Array)
], GeminiDirectDto.prototype, "contents", void 0);
class GenerateTextDto {
}
exports.GenerateTextDto = GenerateTextDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The text prompt to send to Gemini AI',
        example: 'Write a short story about a robot learning to paint',
        minLength: 1,
        maxLength: 4000,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GenerateTextDto.prototype, "prompt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Maximum number of tokens to generate',
        example: 1000,
        minimum: 1,
        maximum: 4000,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(4000),
    __metadata("design:type", Number)
], GenerateTextDto.prototype, "maxTokens", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Temperature for randomness in generation (0.0 to 1.0)',
        example: 0.7,
        minimum: 0.0,
        maximum: 1.0,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.0),
    (0, class_validator_1.Max)(1.0),
    __metadata("design:type", Number)
], GenerateTextDto.prototype, "temperature", void 0);
//# sourceMappingURL=generate-text.dto.js.map