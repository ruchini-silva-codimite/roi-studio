export const assumptions = {
  organization: {
    users: 1000,
    workdaysPerYear: 220,
    industry: "general",
    scenario: "chromeos_vlauncher_vs_chromeos_native"
  },
  productivity: {
    timeToLaunchWithout: 40,
    timeToLaunchWith: 10,
    appsPerUserPerDay: 10,
    interruptionsPerDay: 5,
    focusRecoverySeconds: 15,
    employeeHourlyRate: 35
  },
  itOps: {
    ticketsPerUserPerYear: 6,
    accessRelatedTicketPercent: 30,
    ticketResolutionMinutes: 30,
    itHourlyRate: 35,
    ticketReductionPercent: 25
  },
  onboarding: {
    newUsersPerYear: 100,
    onboardingMinutesWithout: 60,
    onboardingMinutesWith: 15
  },
  healthcare: {
    enabled: false,
    travelersPerYear: 0,
    travelerHoursWithout: 4,
    travelerHoursWith: 1,
    travelerHourlyValue: 50
  },
  cost: {
    vlauncherCostPerUserPerYear: 60
  }
};
