const brand = ['BMW', 'Mercedes', 'Audi', 'Volvo', 'Honda', 'Toyota', 'Nissan', 'Renault',
  'Ford', 'Ferrari', 'Lambargini', 'Jaguar', 'Lada', 'Hyundai', 'Bentley'];

const model = ['Granta', 'Mustang', 'Sierra', 'A4', 'SLA', 'Gelentvagen', 'Skyline', 'Mark II', 'Logan', 'Daster',
  'Escort', 'Kalina Sport', 'Solaris', 'Civic', 'Prius', 'Corolla', 'Camry', 'V40'];

function randomIndex(arr: string[]) {
  return Math.floor(Math.random() * arr.length);
}

export const getRandomCarName = (): string => `${brand[randomIndex(brand)]} ${model[randomIndex(model)]}`;
