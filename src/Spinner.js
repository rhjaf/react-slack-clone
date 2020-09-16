import React from 'react';
import { Loader, Dimmer } from "semantic-ui-react";
// Dimmer gives a dark background to loader

const Spinner = () => (
    <Dimmer active>
        <Loader size="huge" content={"Preparing Chat..."} />
    </Dimmer>
)

export default Spinner;
