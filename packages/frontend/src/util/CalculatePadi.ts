export default function calculateHarvestDate(plantingDate: Date): Date {
  const growthDurationInDays = 135; // Durasi pertumbuhan padi dalam hari
  const harvestDate = new Date(plantingDate);
  harvestDate.setDate(harvestDate.getDate() + growthDurationInDays);
  return harvestDate;
}

export function calculateDaysFromDate(date: Date): number {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
}

interface DateDifference {
  weeks: number;
  days: number;
}

export function calculateDateDifference(dateA: Date): DateDifference {
  const dateB = new Date()
  const timeDifference = Math.abs(dateB.getTime() - dateA.getTime());
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const daysDifference = Math.floor(timeDifference / millisecondsInDay);
  const weeks = Math.floor(daysDifference / 7);
  const remainingDays = daysDifference % 7;

  return {
    weeks,
    days: remainingDays
  };
}

interface RemainingTime {
  weeks: number;
  days: number;
}

export function calculateRemainingTime(dateB: Date): RemainingTime {
  const currentDate = new Date();
  const timeDifference = Math.abs(dateB.getTime() - currentDate.getTime());
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const daysDifference = Math.floor(timeDifference / millisecondsInDay);
  const weeks = Math.floor(daysDifference / 7);
  const remainingDays = daysDifference % 7;

  return {
    weeks,
    days: remainingDays
  };
}

export function calculateRemainingDays(dateB: Date): number {
  const currentDate = new Date();
  const timeDifference = Math.abs(dateB.getTime() - currentDate.getTime());
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const daysDifference = Math.ceil(timeDifference / millisecondsInDay);

  return daysDifference;
}