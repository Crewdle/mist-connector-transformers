import { pipeline, PipelineType } from '@xenova/transformers';

import { IGenerativeAIModel, IGenerativeAIWorkerConnector, IGenerativeAIWorkerOptions, IJobParametersAI, IJobResultAI } from '@crewdle/web-sdk-types';

export class TransformersGenerativeAIWorkerConnector implements IGenerativeAIWorkerConnector {
  pipelines: Map<string, any> = new Map();

  async initialize(workflowId: string, models: Map<string, IGenerativeAIModel>): Promise<void> {
    for (const [modelId, model] of models) {
      const task = await pipeline(model.taskType as PipelineType, model.sourceUrl);
      this.pipelines.set(modelId, task);
    }
  }

  async close(): Promise<void> {
    for (const pipeline of this.pipelines.values()) {
      await pipeline.dispose();
    }
  }

  async processJob(parameters: IJobParametersAI, options: IGenerativeAIWorkerOptions): Promise<IJobResultAI> {
    const pipeline = this.pipelines.get(options.model.id);

    if (!pipeline) {
      throw new Error('Model not found');
    }

    const output = await pipeline(parameters.prompt);

    return {
      output,
    };
  }

  processJobStream(parameters: IJobParametersAI, options?: IGenerativeAIWorkerOptions): AsyncGenerator<IJobResultAI> {
    throw new Error('Method not supported.');
  }
}