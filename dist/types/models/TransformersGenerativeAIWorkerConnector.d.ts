import type { GenerativeAIEngineType, IGenerativeAIModel, IGenerativeAIWorkerConnector, IGenerativeAIWorkerOptions, IJobParametersAI, IJobResultAI } from '@crewdle/web-sdk-types';
export declare class TransformersGenerativeAIWorkerConnector implements IGenerativeAIWorkerConnector {
    pipelines: Map<string, any>;
    initialize(workflowId: string, models: Map<string, IGenerativeAIModel>): Promise<void>;
    close(): Promise<void>;
    getEngineType(): GenerativeAIEngineType;
    processJob(parameters: IJobParametersAI, options: IGenerativeAIWorkerOptions): Promise<IJobResultAI>;
    processJobStream(parameters: IJobParametersAI, options?: IGenerativeAIWorkerOptions): AsyncGenerator<IJobResultAI>;
}
