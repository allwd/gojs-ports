import 'reflect-metadata';
import { Container } from 'inversify';
import ComponentsModule from './app/IoC/ComponentsModule';
import ConstantsModule from './app/IoC/ConstantsModule';

const container = new Container();
container.load(ComponentsModule);
container.load(ConstantsModule);

export { container };
