export interface CarProfile {
  name: string,
  color: string,
  id?: number
}

export interface WinnerProfile {
  id: number,
  wins: number,
  time: number
}

export interface Winners {
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
