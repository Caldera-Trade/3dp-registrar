# Caldera Trade 3DP Registrar

[![NPM version](https://img.shields.io/npm/v/@caldera-trade/3dp-registrar.svg)](https://www.npmjs.com/package/@caldera-trade/3dp-registrar)
[![NPM downloads](https://img.shields.io/npm/dm/@caldera-trade/3dp-registrar.svg)](https://www.npmjs.com/package/@caldera-trade/3dp-registrar)
[![](https://dcbadge.vercel.app/api/server/7zzX3xGs6h?style=flat)](https://discord.gg/7zzX3xGs6h)

[![Build Status](https://github.com/caldera-trade/3dp-registrar/actions/workflows/.github/workflows/main.yaml/badge.svg)](https://github.com/caldera-trade/3dp-registrar/actions)
<!-- [![Coverage Status](https://codecov.io/gh/placeholder/branch/master/graph/badge.svg)](https://codecov.io/gh/placeholder) -->
<!-- [![Known Vulnerabilities](https://snyk.io/test/github/placeholder/badge.svg)](https://snyk.io/test/github/placeholder) -->

The Caldera Trade 3DP Registrar provides your JavaScript & TypeScript applications easy access to Polkadot Judgements.

This library can be used by NodeJS applications, tools, and other automations to provide users Judgements and validate KYC.

## Installation
You can install the SDK using npm or yarn
```
npm install @caldera-trade/3dp-registrar
```
```
yarn add @caldera-trade/3dp-registrar
```

## Usage
#### Discord Validation
```typescript
import { validateMessageSignature } from "@caldera-trade/3dp-registrar";

process.env['P3D_REGISTRAR_MNEMONIC'] = '<some_mnemonic>'; // We suggest using Doppler or another secrets management syste to inject your secrets instead

// Create new client with your private access tokens
await validateMessageSignature(message, message.content, 1);
```

### Website Validation
```typescript
import {
    extractDataAndSignature,
	isJudgementRequestSubmitted,
	provideJudgement,
	verifyOnChainIdentity,
} from "@caldera-trade/3dp-registrar";

process.env['P3D_REGISTRAR_MNEMONIC'] = '<some_mnemonic>'; // We suggest using Doppler or another secrets management syste to inject your secrets instead

/** Validate Identity */
const { validOnChainIdentity, isReasonable } =
    await verifyOnChainIdentity(walletAddress);


/** Check if Judgement Extrinsic is on Blockchain */
const judgmentRequestSubmitted = await isJudgementRequestSubmitted(
    walletAddress,
    registrarIndex,
    registrarFee,
);

/** Provide Judgement */
await provideJudgement(walletAddress, mnemonic, registrarIndex, 'Reasonable');
```

If you would like any additional features exposed, create an Issue or submit a Pull Request!
