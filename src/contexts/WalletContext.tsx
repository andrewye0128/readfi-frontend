import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/lib/toast";
import {
  connectWalletConnect as connectWC,
  disconnectWalletConnect,
  setupWalletConnectListeners,
  removeWalletConnectListeners,
} from "@/lib/walletconnect";

interface WalletContextType {
  address: string | null;
  isConnecting: boolean;
  walletType: "metamask" | "imtoken" | "walletconnect" | null;
  connectMetaMask: () => Promise<void>;
  connectImToken: () => Promise<void>;
  connectWalletConnect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletType, setWalletType] = useState<
    "metamask" | "imtoken" | "walletconnect" | null
  >(null);

  // 檢查是否已連接（從 localStorage 恢復）
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    const savedWalletType = localStorage.getItem("walletType") as
      | "metamask"
      | "imtoken"
      | "walletconnect"
      | null;

    if (savedAddress && savedWalletType) {
      if (savedWalletType === "metamask" && window.ethereum) {
        // 驗證 MetaMask 地址是否仍然有效
        window.ethereum
          .request({ method: "eth_accounts" })
          .then((accounts: string[]) => {
            if (accounts.length > 0 && accounts[0] === savedAddress) {
              setAddress(savedAddress);
              setWalletType("metamask");
            } else {
              localStorage.removeItem("walletAddress");
              localStorage.removeItem("walletType");
            }
          })
          .catch(() => {
            localStorage.removeItem("walletAddress");
            localStorage.removeItem("walletType");
          });
      } else if (savedWalletType === "imtoken") {
        // imToken 需要重新連接
        setAddress(savedAddress);
        setWalletType("imtoken");
      } else if (savedWalletType === "walletconnect") {
        // WalletConnect 需要重新連接
        setAddress(savedAddress);
        setWalletType("walletconnect");
      }
    }
  }, []);

  // 監聽帳戶變更
  useEffect(() => {
    if (walletType === "metamask" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else if (accounts[0] !== address) {
          setAddress(accounts[0]);
          localStorage.setItem("walletAddress", accounts[0]);
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        window.ethereum?.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      };
    } else if (walletType === "imtoken") {
      // imToken 也使用 ethereum provider
      if (window.ethereum) {
        const handleAccountsChanged = (accounts: string[]) => {
          if (accounts.length === 0) {
            disconnect();
          } else if (accounts[0] !== address) {
            setAddress(accounts[0]);
            localStorage.setItem("walletAddress", accounts[0]);
          }
        };

        window.ethereum.on("accountsChanged", handleAccountsChanged);

        return () => {
          window.ethereum?.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
        };
      }
    } else if (walletType === "walletconnect") {
      const handleWCAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else if (accounts[0] !== address) {
          setAddress(accounts[0]);
          localStorage.setItem("walletAddress", accounts[0]);
        }
      };

      const handleWCDisconnect = () => {
        disconnect();
      };

      setupWalletConnectListeners(handleWCAccountsChanged, handleWCDisconnect);

      return () => {
        removeWalletConnectListeners(
          handleWCAccountsChanged,
          handleWCDisconnect
        );
      };
    }
  }, [address, walletType]);

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      toast.error("請先安裝 MetaMask 錢包");
      return;
    }

    try {
      setIsConnecting(true);

      // 請求連接錢包
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const account = accounts[0];
        setAddress(account);
        setWalletType("metamask");
        localStorage.setItem("walletAddress", account);
        localStorage.setItem("walletType", "metamask");
        toast.success("MetaMask 連接成功");
      }
    } catch (error: any) {
      console.error("連接 MetaMask 失敗:", error);
      if (error.code === 4001) {
        toast.error("用戶拒絕連接請求");
      } else {
        toast.error("連接錢包失敗");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const connectImToken = async () => {
    // 直接檢查 window.ethereum 是否存在
    if (!window.ethereum) {
      toast.error("未檢測到錢包，請確保已安裝 imToken 或 MetaMask");
      return;
    }

    try {
      setIsConnecting(true);

      // 直接請求連接錢包
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const account = accounts[0];
        setAddress(account);
        setWalletType("imtoken");
        localStorage.setItem("walletAddress", account);
        localStorage.setItem("walletType", "imtoken");
        toast.success("連接成功");
      }
    } catch (error: any) {
      console.error("連接失敗:", error);
      if (error.code === 4001) {
        toast.error("用戶拒絕連接請求");
      } else {
        toast.error("連接錢包失敗，請重試");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const connectWalletConnect = async () => {
    try {
      setIsConnecting(true);

      // 連接 WalletConnect（會顯示 QR Code Modal）
      const account = await connectWC();

      if (account) {
        setAddress(account);
        setWalletType("walletconnect");
        localStorage.setItem("walletAddress", account);
        localStorage.setItem("walletType", "walletconnect");
        toast.success("WalletConnect 連接成功");
      } else {
        toast.error("未找到連接的帳戶");
      }
    } catch (error: any) {
      console.error("連接 WalletConnect 失敗:", error);
      if (error.message && error.message.includes("User closed modal")) {
        toast.error("用戶取消連接");
      } else {
        toast.error("連接錢包失敗");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    // 如果是 WalletConnect，需要斷開連接
    if (walletType === "walletconnect") {
      await disconnectWalletConnect();
    }

    setAddress(null);
    setWalletType(null);
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("walletType");
    toast.success("錢包已斷開連接");
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnecting,
        walletType,
        connectMetaMask,
        connectImToken,
        connectWalletConnect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
}

// TypeScript 類型定義
declare global {
  interface Window {
    ethereum?: any;
  }
}
