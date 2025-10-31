import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/lib/toast";

interface WalletContextType {
  address: string | null;
  isConnecting: boolean;
  connectMetaMask: () => Promise<void>;
  connectWalletConnect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // 檢查是否已連接（從 localStorage 恢復）
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress && window.ethereum) {
      // 驗證地址是否仍然有效
      window.ethereum
        .request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0 && accounts[0] === savedAddress) {
            setAddress(savedAddress);
          } else {
            localStorage.removeItem("walletAddress");
          }
        })
        .catch(() => {
          localStorage.removeItem("walletAddress");
        });
    }
  }, []);

  // 監聽帳戶變更
  useEffect(() => {
    if (!window.ethereum) return;

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
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, [address]);

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
        localStorage.setItem("walletAddress", account);
        toast.success("錢包連接成功");
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

  const connectWalletConnect = async () => {
    try {
      setIsConnecting(true);
      // WalletConnect 整合需要額外的套件
      // 這裡先顯示 Toast 提示
      toast.info("WalletConnect 整合開發中，請使用 MetaMask");
    } catch (error) {
      console.error("連接 WalletConnect 失敗:", error);
      toast.error("連接錢包失敗");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    localStorage.removeItem("walletAddress");
    toast.success("錢包已斷開連接");
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnecting,
        connectMetaMask,
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
