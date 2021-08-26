import {Entity, model, property} from '@loopback/repository';

@model()
export class Cars extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  brand?: string;

  @property({
    type: 'string',
  })
  color?: string;

  @property({
    type: 'string',
  })
  model?: string;

  constructor(data?: Partial<Cars>) {
    super(data);
  }
}

export interface CarsRelations {
  // describe navigational properties here
}

export type CarsWithRelations = Cars & CarsRelations;
