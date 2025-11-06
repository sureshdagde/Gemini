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
exports.GeminiResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class GeminiDataDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The generated text from Gemini AI',
        example: 'Once upon a time, there was a robot named Canvas who discovered the beauty of colors...',
    }),
    __metadata("design:type", String)
], GeminiDataDto.prototype, "generatedText", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The original prompt that was sent',
        example: 'Write a short story about a robot learning to paint',
    }),
    __metadata("design:type", String)
], GeminiDataDto.prototype, "prompt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp when the response was generated',
        example: '2024-01-15T10:30:00.000Z',
    }),
    __metadata("design:type", String)
], GeminiDataDto.prototype, "timestamp", void 0);
class GeminiResponseDto {
}
exports.GeminiResponseDto = GeminiResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicates if the request was successful',
        example: true,
    }),
    __metadata("design:type", Boolean)
], GeminiResponseDto.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The response data from Gemini AI',
        type: GeminiDataDto,
    }),
    __metadata("design:type", GeminiDataDto)
], GeminiResponseDto.prototype, "data", void 0);
//# sourceMappingURL=gemini-response.dto.js.map