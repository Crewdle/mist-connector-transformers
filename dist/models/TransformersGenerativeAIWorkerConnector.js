import { pipeline } from '@xenova/transformers';
export class TransformersGenerativeAIWorkerConnector {
    pipelines = new Map();
    async initialize(workflowId, models) {
        for (const [modelId, model] of models) {
            const task = await pipeline(model.taskType, model.sourceUrl);
            this.pipelines.set(modelId, task);
        }
    }
    async close() {
        for (const pipeline of this.pipelines.values()) {
            await pipeline.dispose();
        }
    }
    async processJob(parameters, options) {
        const pipeline = this.pipelines.get(options.model.id);
        if (!pipeline) {
            throw new Error('Model not found');
        }
        const output = await pipeline(parameters.prompt);
        return {
            output,
        };
    }
    processJobStream(parameters, options) {
        throw new Error('Method not supported.');
    }
}
