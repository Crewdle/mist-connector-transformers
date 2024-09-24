import { pipeline, SummarizationPipeline, TokenClassificationPipeline, TranslationPipeline } from '@xenova/transformers';
import { AIJobType } from '@crewdle/web-sdk-types';
export class TransformersGenerativeAIWorkerConnector {
    pipelines = new Map();
    async initialize(workflowId, models) {
        for (const [modelId, model] of models) {
            if (model.engineType !== 'transformers') {
                continue;
            }
            const task = await pipeline(model.taskType, model.sourceUrl);
            this.pipelines.set(modelId, task);
        }
    }
    async close() {
        for (const pipeline of this.pipelines.values()) {
            await pipeline.dispose();
        }
    }
    getEngineType() {
        return 'transformers';
    }
    async processJob(parameters, options) {
        const task = this.pipelines.get(options.model.id);
        if (!task) {
            throw new Error('Model not found');
        }
        if (task instanceof TokenClassificationPipeline) {
            return {
                type: AIJobType.Prompt,
                output: await this.processTokenClassificationPipeline(parameters.prompt, task),
            };
        }
        if (task instanceof SummarizationPipeline) {
            return {
                type: AIJobType.Prompt,
                output: await this.processSummarizationPipeline(parameters.prompt, task),
            };
        }
        if (task instanceof TranslationPipeline) {
            return {
                type: AIJobType.Prompt,
                output: await this.processTranslationPipeline(parameters.prompt, task),
            };
        }
        throw new Error('Task not supported');
    }
    processJobStream(parameters, options) {
        throw new Error('Method not supported.');
    }
    async processTokenClassificationPipeline(prompt, task) {
        const result = await task(prompt);
        return result.map((r) => r.word);
    }
    async processSummarizationPipeline(prompt, task) {
        const result = await task(prompt);
        return result[0].summary_text;
    }
    async processTranslationPipeline(prompt, task) {
        const result = await task(prompt);
        return result[0].translation_text;
    }
}
