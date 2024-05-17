import { Card, Metric, Text, Flex } from '@tremor/react';
import React from 'react';
const CardBase= () => {
    return (
        <Card>
            <text>sales</text>
            <Metric>$ 67</Metric>
            <Flex>
                <Text>32% of anual target</Text>
                <Text>$ 33.33</Text>
            </Flex>
        </Card>
    )
}
export default CardBase