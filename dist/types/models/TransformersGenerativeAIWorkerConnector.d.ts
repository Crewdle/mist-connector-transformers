import { AudioClassificationPipeline, AutomaticSpeechRecognitionPipeline, DepthEstimationPipeline, DocumentQuestionAnsweringPipeline, FeatureExtractionPipeline, FillMaskPipeline, ImageClassificationPipeline, ImageFeatureExtractionPipeline, ImageSegmentationPipeline, ImageToImagePipeline, ImageToTextPipeline, ObjectDetectionPipeline, QuestionAnsweringPipeline, SummarizationPipeline, Text2TextGenerationPipeline, TextClassificationPipeline, TextGenerationPipeline, TextToAudioPipeline, TokenClassificationPipeline, TranslationPipeline, ZeroShotAudioClassificationPipeline, ZeroShotClassificationPipeline, ZeroShotImageClassificationPipeline, ZeroShotObjectDetectionPipeline } from '@xenova/transformers';
import { type GenerativeAIEngineType, type IGenerativeAIModel, type IGenerativeAIWorkerConnector, type IGenerativeAIWorkerOptions, type IJobPromptAIParameters, type IPromptResult } from '@crewdle/web-sdk-types';
type Tasks = AudioClassificationPipeline | AutomaticSpeechRecognitionPipeline | DepthEstimationPipeline | DocumentQuestionAnsweringPipeline | FeatureExtractionPipeline | FillMaskPipeline | ImageClassificationPipeline | ImageFeatureExtractionPipeline | ImageSegmentationPipeline | ImageToImagePipeline | ImageToTextPipeline | ObjectDetectionPipeline | QuestionAnsweringPipeline | SummarizationPipeline | Text2TextGenerationPipeline | TextClassificationPipeline | TextGenerationPipeline | TextToAudioPipeline | TokenClassificationPipeline | TranslationPipeline | ZeroShotClassificationPipeline | ZeroShotAudioClassificationPipeline | ZeroShotImageClassificationPipeline | ZeroShotObjectDetectionPipeline;
export declare class TransformersGenerativeAIWorkerConnector implements IGenerativeAIWorkerConnector {
    pipelines: Map<string, Tasks>;
    initialize(workflowId: string, models: Map<string, IGenerativeAIModel>): Promise<void>;
    close(): Promise<void>;
    getEngineType(): GenerativeAIEngineType;
    processJob(parameters: IJobPromptAIParameters, options: IGenerativeAIWorkerOptions): Promise<IPromptResult>;
    processJobStream(parameters: IJobPromptAIParameters, options?: IGenerativeAIWorkerOptions): AsyncGenerator<IPromptResult>;
    processTokenClassificationPipeline(prompt: string, task: TokenClassificationPipeline): Promise<string[]>;
    processSummarizationPipeline(prompt: string, task: SummarizationPipeline): Promise<string>;
    processTranslationPipeline(prompt: string, task: TranslationPipeline): Promise<string>;
}
export {};
