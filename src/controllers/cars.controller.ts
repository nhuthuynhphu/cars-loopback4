import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Cars} from '../models';
import {CarsRepository} from '../repositories';

export class CarsController {
  constructor(
    @repository(CarsRepository)
    public carsRepository : CarsRepository,
  ) {}

  @post('/cars')
  @response(200, {
    description: 'Cars model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cars)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cars, {
            title: 'NewCars',
            exclude: ['id'],
          }),
        },
      },
    })
    cars: Omit<Cars, 'id'>,
  ): Promise<Cars> {
    return this.carsRepository.create(cars);
  }

  @get('/cars/count')
  @response(200, {
    description: 'Cars model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cars) where?: Where<Cars>,
  ): Promise<Count> {
    return this.carsRepository.count(where);
  }

  @get('/cars')
  @response(200, {
    description: 'Array of Cars model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cars, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cars) filter?: Filter<Cars>,
  ): Promise<Cars[]> {
    return this.carsRepository.find(filter);
  }

  @patch('/cars')
  @response(200, {
    description: 'Cars PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cars, {partial: true}),
        },
      },
    })
    cars: Cars,
    @param.where(Cars) where?: Where<Cars>,
  ): Promise<Count> {
    return this.carsRepository.updateAll(cars, where);
  }

  @get('/cars/{id}')
  @response(200, {
    description: 'Cars model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cars, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cars, {exclude: 'where'}) filter?: FilterExcludingWhere<Cars>
  ): Promise<Cars> {
    return this.carsRepository.findById(id, filter);
  }

  @patch('/cars/{id}')
  @response(204, {
    description: 'Cars PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cars, {partial: true}),
        },
      },
    })
    cars: Cars,
  ): Promise<void> {
    await this.carsRepository.updateById(id, cars);
  }

  @put('/cars/{id}')
  @response(204, {
    description: 'Cars PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cars: Cars,
  ): Promise<void> {
    await this.carsRepository.replaceById(id, cars);
  }

  @del('/cars/{id}')
  @response(204, {
    description: 'Cars DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.carsRepository.deleteById(id);
  }
}
