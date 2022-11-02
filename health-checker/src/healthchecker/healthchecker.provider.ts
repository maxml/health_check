import { HealthcheckerSimpleCheck, HealthcheckerDetailedCheck } from "./healthchecker";

export const HealthCheckerProvider = {
  provide: "HealthChecker",
  useValue: [HealthcheckerSimpleCheck, HealthcheckerDetailedCheck],
};
