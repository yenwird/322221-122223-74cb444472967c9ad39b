import { app, InvocationContext } from "@azure/functions";
import * as https from "https";
import * as df from 'durable-functions';
import { ActivityHandler, OrchestrationContext, OrchestrationHandler } from 'durable-functions';

const orchestrator = () => {}

export async function serviceBusQueueTrigger(message: unknown, context: InvocationContext): Promise<void> {
    context.log('Service bus queue function processed message:', message);
    const client = df.getClient(context);
    const instanceId: string = await client.startNew("orchestrator-322221-122223-74cb444472967c9ad39b", message);
    context.log(`Started orchestration with ID = '${instanceId}'.`);
}
app.serviceBusQueue('orchestrator-322221-122223-74cb444472967c9ad39b', {
    connection: 'azureQueueConnection',
    queueName: '322221-122223-74cb444472967c9ad39b',
    handler: serviceBusQueueTrigger,
    extraInputs: [df.input.durableClient()],
});