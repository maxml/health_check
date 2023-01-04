import { DynamicModule, Module } from "@nestjs/common";
import { HealthCheckerProvider } from "./healthchecker/healthchecker.provider";

const providers = [HealthCheckerProvider];

/**
 * The HealthCheck module integrates health checks
 * in your Nest application
 *
 * @publicApi
 */
@Module({
  providers: [...providers],
})
export class HealthCheckModule {
  static forRoot(): DynamicModule {
    return {
      module: HealthCheckModule,
      providers: [...providers],
    };
  }
}
