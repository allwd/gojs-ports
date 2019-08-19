import * as React from 'react';
import Diagram from './Diagram';
import { container } from '../../inversify.config';
import { componentSymbols } from '../IoC/Symbols';
import ContainerClass from '../helpers/Container';

import './main.scss';

const Container: ContainerClass = container.get(componentSymbols.container);

function Index() {
    React.useEffect(() => {
        Container.init();
    }, [])

    return (
        <div className={'container'}>
            <div className={'wrapper'}>
                <Diagram />
            </div>
        </div>
    )
}

export default Index;