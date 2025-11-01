import WalletConnectProvider from "@walletconnect/web3-provider";
import QRCodeModal from "@walletconnect/qrcode-modal";

let walletConnectProvider: WalletConnectProvider | null = null;

/**
 * 創建 WalletConnect Provider
 */
export function createWalletConnectProvider() {
  if (!walletConnectProvider) {
    walletConnectProvider = new WalletConnectProvider({
      infuraId: "YOUR_INFURA_ID", // 可選：如果有 Infura ID
      rpc: {
        1: "https://eth.llamarpc.com", // Ethereum Mainnet
        5: "https://rpc.ankr.com/eth_goerli", // Goerli Testnet
        11155111: "https://rpc.ankr.com/eth_sepolia", // Sepolia Testnet
      },
      qrcodeModal: QRCodeModal,
      qrcodeModalOptions: {
        mobileLinks: [
          "metamask",
          "trust",
          "rainbow",
          "argent",
          "imtoken",
          "pillar",
        ],
      },
    });
  }
  return walletConnectProvider;
}

/**
 * 連接 WalletConnect
 */
export async function connectWalletConnect(): Promise<string | null> {
  try {
    const provider = createWalletConnectProvider();

    // 啟用連接（會顯示 QR Code modal）
    await provider.enable();

    // 取得連接的帳戶
    const accounts = (await provider.request({
      method: "eth_accounts",
    })) as string[];

    if (accounts && accounts.length > 0) {
      return accounts[0];
    }

    return null;
  } catch (error) {
    console.error("WalletConnect 連接失敗:", error);
    throw error;
  }
}

/**
 * 斷開 WalletConnect
 */
export async function disconnectWalletConnect(): Promise<void> {
  if (walletConnectProvider) {
    await walletConnectProvider.disconnect();
    walletConnectProvider = null;
  }
}

/**
 * 取得 WalletConnect Provider
 */
export function getWalletConnectProvider() {
  return walletConnectProvider;
}

/**
 * 監聽 WalletConnect 事件
 */
export function setupWalletConnectListeners(
  onAccountsChanged: (accounts: string[]) => void,
  onDisconnect: () => void
) {
  if (!walletConnectProvider) return;

  // 監聽帳戶變更
  walletConnectProvider.on("accountsChanged", onAccountsChanged);

  // 監聽斷開連接
  walletConnectProvider.on("disconnect", onDisconnect);
}

/**
 * 移除 WalletConnect 監聽器
 */
export function removeWalletConnectListeners(
  onAccountsChanged: (accounts: string[]) => void,
  onDisconnect: () => void
) {
  if (!walletConnectProvider) return;

  walletConnectProvider.removeListener("accountsChanged", onAccountsChanged);
  walletConnectProvider.removeListener("disconnect", onDisconnect);
}
