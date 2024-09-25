import { AudioClassificationPipeline, AutomaticSpeechRecognitionPipeline, DepthEstimationPipeline, DocumentQuestionAnsweringPipeline, FeatureExtractionPipeline, FillMaskPipeline, ImageClassificationPipeline, ImageFeatureExtractionPipeline, ImageSegmentationPipeline, ImageToImagePipeline, ImageToTextPipeline, ObjectDetectionPipeline, QuestionAnsweringPipeline, SummarizationPipeline, Text2TextGenerationPipeline, TextClassificationPipeline, TextGenerationPipeline, TextToAudioPipeline, TokenClassificationPipeline, TranslationPipeline, ZeroShotAudioClassificationPipeline, ZeroShotClassificationPipeline, ZeroShotImageClassificationPipeline, ZeroShotObjectDetectionPipeline } from '@xenova/transformers';
import { GenerativeAIEngineType, IGenerativeAIModel, IGenerativeAIWorkerConnector, IGenerativeAIWorkerOptions, IGenerativeAIPromptWorkerConnectorParameters, IGenerativeAIWorkerConnectorPromptResult } from '@crewdle/web-sdk-types';
type Tasks = AudioClassificationPipeline | AutomaticSpeechRecognitionPipeline | DepthEstimationPipeline | DocumentQuestionAnsweringPipeline | FeatureExtractionPipeline | FillMaskPipeline | ImageClassificationPipeline | ImageFeatureExtractionPipeline | ImageSegmentationPipeline | ImageToImagePipeline | ImageToTextPipeline | ObjectDetectionPipeline | QuestionAnsweringPipeline | SummarizationPipeline | Text2TextGenerationPipeline | TextClassificationPipeline | TextGenerationPipeline | TextToAudioPipeline | TokenClassificationPipeline | TranslationPipeline | ZeroShotClassificationPipeline | ZeroShotAudioClassificationPipeline | ZeroShotImageClassificationPipeline | ZeroShotObjectDetectionPipeline;
export declare class TransformersGenerativeAIWorkerConnector implements IGenerativeAIWorkerConnector {
    pipelines: Map<string, Tasks>;
    initialize(workflowId: string, models: Map<string, IGenerativeAIModel>): Promise<void>;
    close(): Promise<void>;
    getEngineType(): GenerativeAIEngineType;
    processJob(parameters: IGenerativeAIPromptWorkerConnectorParameters, options: IGenerativeAIWorkerOptions): Promise<IGenerativeAIWorkerConnectorPromptResult>;
    processJobStream(parameters: IGenerativeAIPromptWorkerConnectorParameters, options?: IGenerativeAIWorkerOptions): AsyncGenerator<IGenerativeAIWorkerConnectorPromptResult>;
    processTokenClassificationPipeline(prompt: string, task: TokenClassificationPipeline): Promise<string[]>;
    processSummarizationPipeline(prompt: string, task: SummarizationPipeline): Promise<string>;
    processTranslationPipeline(prompt: string, task: TranslationPipeline): Promise<string>;
}
export {};
