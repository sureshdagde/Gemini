import { ConfigService } from '@nestjs/config';
export declare class HealthService {
    private configService;
    constructor(configService: ConfigService);
    check(): object;
}
