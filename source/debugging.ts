import { LoggingLevel, Rx } from 'reactronic'

export function configureDebugging(): void {
  Rx.setLoggingMode(false, LoggingLevel.ErrorsOnly)
  Rx.setProfilingMode(false, {
    repetitiveUsageWarningThreshold: Number.MAX_SAFE_INTEGER,
    mainThreadBlockingWarningThreshold: 5,
    asyncActionDurationWarningThreshold: Number.MAX_SAFE_INTEGER,
    garbageCollectionSummaryInterval: Number.MAX_SAFE_INTEGER,
  })
}
