import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // TODO: constructor(private readonly healthCheck: HealthChecker) {}

  getHello(): string {
    return 'Hello World!';
  }
}
