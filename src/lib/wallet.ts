/**
 * 格式化錢包地址為簡短格式
 * @param address 完整地址
 * @param startLength 開頭保留字符數（默認 6）
 * @param endLength 結尾保留字符數（默認 4）
 * @returns 格式化後的地址，例如: 0x1234...5678
 */
export function formatAddress(
  address: string,
  startLength: number = 6,
  endLength: number = 4
): string {
  if (!address) return "";
  if (address.length <= startLength + endLength) return address;
  
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

/**
 * 複製文字到剪貼簿
 * @param text 要複製的文字
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("複製失敗:", error);
    return false;
  }
}

/**
 * 檢查是否為有效的以太坊地址
 * @param address 地址
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

