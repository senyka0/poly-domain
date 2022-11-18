# Poly Domains

Mint your own ENS domain with .poly ending as a NFT, which you can sell then on OpenSea !
Link: https://poly-domain.vercel.app/
OpenSea: https://testnets.opensea.io/collection/polygon-ens-v4

## Installation

```bash
npm i
```

in .env file specify:
```bash
GOERLI_URL
POLYGON_UR
PRIVATE_KEY
ETHERSCAN_API
POLYSCAN_API
```

### HardHat
```bash
npx hardhat run scripts/deploy.ts --network mumbai
# after
npx hardhat verify --network mumbai <address> "<your ens ending>"
```

### Next.js
```bash
npm run dev
# or
yarn dev
```
