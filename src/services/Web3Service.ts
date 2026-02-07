import { ethers } from 'ethers';

const PANCAKE_ROUTER_ADDRESS = '0x10ED43C718714eb63d5aA57B78B54704E256024E'; // V2 Router
const WBNB_ADDRESS = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const USDT_ADDRESS = '0x55d398326f99059fF775485246999027B3197955';

const ROUTER_ABI = [
  "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",
  "function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)"
];

export class Web3Service {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;

  constructor() {
    if (window.ethereum) {
      this.provider = new ethers.BrowserProvider(window.ethereum);
    }
  }

  async connect(): Promise<string> {
    if (!this.provider) throw new Error("No crypto wallet found");
    await this.provider.send("eth_requestAccounts", []);
    this.signer = await this.provider.getSigner();
    return await this.signer.getAddress();
  }

  async getBalance(address: string): Promise<string> {
    if (!this.provider) return '0.00';
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  async getGasPrice(): Promise<string> {
    if (!this.provider) return '0.00';
    const feeData = await this.provider.getFeeData();
    return ethers.formatUnits(feeData.gasPrice || 0, 'gwei');
  }

  async swapBNBForUSDT(amountInBNB: string): Promise<string> {
    if (!this.signer) await this.connect();
    if (!this.signer) throw new Error("Wallet not connected");

    const router = new ethers.Contract(PANCAKE_ROUTER_ADDRESS, ROUTER_ABI, this.signer);
    
    const amountIn = ethers.parseEther(amountInBNB);
    const path = [WBNB_ADDRESS, USDT_ADDRESS];
    const to = await this.signer.getAddress();
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

    // Calculate min amount out (5% slippage for safety in demo)
    // In production we would fetch getAmountsOut first
    // For this hackathon demo, we will accept any amount (amountOutMin = 0) to ensure tx succeeds easily
    // Or better, let's try to get a quote
    let amountOutMin = 0n;
    try {
        const amounts = await router.getAmountsOut(amountIn, path);
        const expectedOut = amounts[1];
        amountOutMin = (expectedOut * 95n) / 100n; // 5% slippage
    } catch (e) {
        console.warn("Could not estimate swap output, setting min to 0", e);
    }

    const tx = await router.swapExactETHForTokens(
      amountOutMin,
      path,
      to,
      deadline,
      { value: amountIn }
    );

    return tx.hash;
  }
}

export const web3Service = new Web3Service();
