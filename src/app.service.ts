import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: 'Welcome to NestJS Gemini API!',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      documentation: '/api'
    };
  }
}