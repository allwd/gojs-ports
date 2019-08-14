import * as React from 'react';
import * as go from 'gojs';
import Diagram from './Diagram';
import { container } from '../../inversify.config';
import { componentSymbols } from '../IoC/Symbols';

import './main.scss';

function Index() {
    React.useEffect(() => {
        const diagramFactory = container.get<Function>(componentSymbols.diagramFactory);
        diagramFactory();
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