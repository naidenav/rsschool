export interface CarProfile {
  name: string,
  color: string,
  id?: number
}

export interface CarsInfo {
  cars: CarProfile[],
  totalCars: number,
}

export interface WinnerProfile {
  id: number,
  wins: number,
  time: number
}

export interface Velocity {
  velocity: number,
  distance: number
}

export interface AnimationState {
  carId: string,
  requestId: number
}

export interface Winners {
  winner: WinnerProfile,
  car: CarProfile,
}

export interface WinnersInfo {
  winners: Winners[],
  totalWinners: number,
}

export interface IsSuccess {
  success: boolean,
}
