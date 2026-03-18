# RSK Bytecode Verifier for Rootstock

### A Professional Verification Dashboard for Smart Contracts on Rootstock

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Foundry](https://img.shields.io/badge/Foundry-✓-orange)](https://book.getfoundry.sh/)

Verify that deployed smart contracts on Rootstock match their source code by comparing on-chain bytecode with locally compiled bytecode.

• **Documentation** • 

---

# 📖 About Rootstock

Rootstock (RSK) is the first smart contract platform secured by the Bitcoin network through merge-mining. It brings Ethereum-compatible smart contracts to Bitcoin, enabling developers to build decentralized applications with Bitcoin-level security.

## Key Features of Rootstock

* 🛡️ **Bitcoin Security** – Secured by merge-mining with Bitcoin's hashing power
* 💰 **Native Currency** – RBTC (Rootstock Bitcoin) pegged 1:1 with BTC
* ⚡ **EVM Compatible** – Supports Ethereum smart contracts and tooling
* 🌐 **Infrastructure** – RIF (Rootstock Infrastructure Framework)
* 📈 **Scalability** – ~30 second block time

---

# 🔍 What is RSK Bytecode Verifier?

RSK Bytecode Verifier is a web application that verifies whether a deployed contract on Rootstock matches its compiled source code.

It compares:

* On-chain bytecode
* Locally compiled bytecode

to ensure **trust and transparency**.

## Why Use RSK Bytecode Verifier?

* 🔐 Verify deployed smart contracts
* 🔍 Detect mismatched bytecode
* 🌐 Supports Rootstock Mainnet & Testnet
* ⚡ Instant comparison
* 🦊 MetaMask wallet support
* 🎨 Modern developer dashboard UI

---

# ✨ Features

## Core Features

* Fetch deployed bytecode using `eth_getCode`
* Compare normalized bytecode
* Keccak256 hashing
* Metadata stripping option
* Byte-level diff viewer
* Automatic network switching

## Advanced Features

* Real-time input validation
* Copy hash to clipboard
* Dark / Light theme
* Mobile responsive
* Example Foundry contract

---

# 🎨 User Interface

* Dark theme UI
* Rootstock orange accent color
* Tailwind + ShadCN UI components
* Clean dashboard layout
* Dedicated pages for:

  * Docs
  * About
  * Contact

---

# 🏗️ Architecture

```
Frontend (Next.js + TypeScript)
        │
        ▼
Wallet Connection (RainbowKit + Wagmi)
        │
        ▼
Rootstock RPC
        │
        ▼
Rootstock Blockchain
(Mainnet & Testnet)
```

---

# 🛠️ Technology Stack

## Frontend

* Next.js 14
* TypeScript
* Tailwind CSS
* ShadCN UI

## Web3

* RainbowKit
* Wagmi
* Viem
* ethers.js

## Smart Contracts

* Solidity 0.8.20
* Foundry
* OpenZeppelin

## Dev Tools

* Git
* Vercel
* Jest
* React Testing Library

---

# 🚀 Quick Start

## Prerequisites

* Node.js 18+
* npm / yarn
* MetaMask (optional)
* Git

---

# Installation

Clone repository

```bash
git clone https://github.com/rootstock/rsk-bytecode-verifier.git
cd rsk-bytecode-verifier
```

Install dependencies

```bash
npm install
```

Copy `.env.example` to `.env` and fill in values:

```bash
cp .env.example .env
```

Then edit `.env`:

```env
NEXT_PUBLIC_RSK_MAINNET_RPC=https://public-node.rsk.co
NEXT_PUBLIC_RSK_TESTNET_RPC=https://public-node.testnet.rsk.co
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

Run project

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🧪 Foundry Contract Example

Go to contracts folder

```bash
cd contracts
```

Install foundry

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

Install dependencies

```bash
forge install
```

Build contract

```bash
forge build
```

Deploy contract

```bash
forge script script/Deploy.s.sol --rpc-url rsk-testnet --broadcast
```

---

# 📚 Usage Guide

1. Open **Dashboard**
2. Connect wallet
3. Enter contract address
4. Paste compiled bytecode
5. Toggle metadata option
6. Click **Compare Bytecode**

Result:

✅ Match
❌ Mismatch (with byte diff)

---

# 📁 Project Structure

```
rsk-bytecode-verifier

src/
 ├ app/
 ├ components/
 ├ hooks/
 ├ lib/
 ├ types/
 ├ config/

contracts/
 ├ src/
 ├ script/
 ├ test/

.env.example
package.json
tailwind.config.js
tsconfig.json
README.md
```

---

# 🧪 Testing

Run tests

```bash
npm test
```

Watch tests

```bash
npm run test:watch
```

Tests include

* Bytecode comparison logic
* UI behavior
* Verification hooks

---

# 🐛 Troubleshooting

## MetaMask

Problem: wallet not connecting
Solution: refresh page & unlock MetaMask

## Wrong Network

Switch network to

* Rootstock Mainnet (30)
* Rootstock Testnet (31)

## Bytecode mismatch

Enable **Ignore metadata hash**

---

# 🤝 Contributing

1. Fork repository
2. Create branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/new-feature
```

5. Open Pull Request

---

# 📝 License

MIT License

---

# 🔗 Useful Links

* Rootstock Official
* Rootstock Docs
* Rootstock Explorer
* Rootstock Faucet
* Foundry Book
* RainbowKit
* Wagmi

---

# 🏆 Built For

Rootstock Hacktivator Program

This project demonstrates:

* Production-ready Rootstock tool
* Smart contract verification
* Full stack Web3 development
* Next.js + Foundry integration

---

**Built with ❤️ for Rootstock (RSK)**


