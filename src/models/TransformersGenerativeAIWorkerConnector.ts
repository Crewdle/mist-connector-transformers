import {
  AudioClassificationPipeline, AutomaticSpeechRecognitionPipeline, DepthEstimationPipeline, DocumentQuestionAnsweringPipeline,
  FeatureExtractionPipeline, FillMaskPipeline, ImageClassificationPipeline, ImageFeatureExtractionPipeline, ImageSegmentationPipeline,
  ImageToImagePipeline, ImageToTextPipeline, ObjectDetectionPipeline, pipeline, PipelineType, QuestionAnsweringPipeline,
  SummarizationPipeline, SummarizationSingle, Text2TextGenerationPipeline, TextClassificationPipeline, TextGenerationPipeline,
  TextToAudioPipeline, TokenClassificationPipeline, TokenClassificationSingle, TranslationPipeline, TranslationSingle, ZeroShotAudioClassificationPipeline,
  ZeroShotClassificationPipeline, ZeroShotImageClassificationPipeline, ZeroShotObjectDetectionPipeline
} from '@xenova/transformers';

import type { GenerativeAIEngineType, IGenerativeAIModel, IGenerativeAIWorkerConnector, IGenerativeAIWorkerOptions, IJobParametersAI, IJobResultAI } from '@crewdle/web-sdk-types';

type Tasks = AudioClassificationPipeline | AutomaticSpeechRecognitionPipeline | DepthEstimationPipeline | DocumentQuestionAnsweringPipeline | FeatureExtractionPipeline | FillMaskPipeline | ImageClassificationPipeline | ImageFeatureExtractionPipeline | ImageSegmentationPipeline | ImageToImagePipeline | ImageToTextPipeline | ObjectDetectionPipeline | QuestionAnsweringPipeline | SummarizationPipeline | Text2TextGenerationPipeline | TextClassificationPipeline | TextGenerationPipeline | TextToAudioPipeline | TokenClassificationPipeline | TranslationPipeline | ZeroShotClassificationPipeline | ZeroShotAudioClassificationPipeline | ZeroShotImageClassificationPipeline | ZeroShotObjectDetectionPipeline;
export class TransformersGenerativeAIWorkerConnector implements IGenerativeAIWorkerConnector {
  pipelines: Map<string, Tasks> = new Map();

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

  getEngineType(): GenerativeAIEngineType {
    return 'transformers' as GenerativeAIEngineType;
  }

  async processJob(parameters: IJobParametersAI, options: IGenerativeAIWorkerOptions): Promise<IJobResultAI> {
    const task = this.pipelines.get(options.model.id);

    if (!task) {
      throw new Error('Model not found');
    }

    if (task instanceof TokenClassificationPipeline) {
      return {
        output: await this.processTokenClassificationPipeline(parameters.prompt, task),
      };
    }

    if (task instanceof SummarizationPipeline) {
      return {
        output: await this.processSummarizationPipeline(parameters.prompt, task),
      };
    }

    if (task instanceof TranslationPipeline) {
      return {
        output: await this.processTranslationPipeline(parameters.prompt, task),
      };
    }

    throw new Error('Task not supported');
  }

  processJobStream(parameters: IJobParametersAI, options?: IGenerativeAIWorkerOptions): AsyncGenerator<IJobResultAI> {
    throw new Error('Method not supported.');
  }

  async processTokenClassificationPipeline(prompt: string, task: TokenClassificationPipeline): Promise<string[]> {
    const result = await task(prompt);
    
    return result.map((r) => (r as TokenClassificationSingle).word);
  }

  async processSummarizationPipeline(prompt: string, task: SummarizationPipeline): Promise<string> {
    const result = await task(prompt);
    
    return (result[0] as SummarizationSingle).summary_text;
  }

  async processTranslationPipeline(prompt: string, task: TranslationPipeline): Promise<string> {
    const result = await task(prompt);

    return (result[0] as TranslationSingle).translation_text;
  }
}