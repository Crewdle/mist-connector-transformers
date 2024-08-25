# Crewdle Mist Transformers Generative AI Connector

## Introduction

The Crewdle Mist Transformers Generative AI Connector is a solution designed to seamlessly run AI models within your applications. This connector enables applications to harness the power of generative AI, providing robust and high-performance model execution capabilities. It's an ideal choice for developers seeking to implement scalable and sophisticated AI-driven functionalities within their ecosystem.

## Getting Started

Before diving in, ensure you have installed the [Crewdle Mist SDK](https://www.npmjs.com/package/@crewdle/web-sdk).

## Installation

```bash
npm install @crewdle/mist-connector-transformers
```

## Usage

```TypeScript
const { TransformersGenerativeAIWorkerConnector } = await import('@crewdle/mist-connector-transformers');

sdk = await SDK.getInstance(config.vendorId, config.accessToken, {
  generativeAIWorkerConnector: TransformersGenerativeAIWorkerConnector,
}, config.secretKey);
```

## Need Help?

Reach out to support@crewdle.com or raise an issue in our repository for any assistance.

## Join Our Community

For an engaging discussion about your specific use cases or to connect with fellow developers, we invite you to join our Discord community. Follow this link to become a part of our vibrant group: [Join us on Discord](https://discord.gg/XJ3scBYX).
