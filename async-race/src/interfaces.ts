export interface CarProfile {
  name: string,
  color: string,
  id?: number
}

export interface Winners {
  id: number,
  wins: number,
  time: number
}

export interface Velocity {
  velocity: number,
  distance: number,
}

export interface AnimationOptions {
  timing: Function,
  draw: Function,
  duration: number,
}

export interface AnimationState {
  carId: string,
  requestId: number,
}
