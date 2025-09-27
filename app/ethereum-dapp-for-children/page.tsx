'use client';

import { useEffect, useMemo, useState } from 'react';

type EthereumRequestArgs = { method: string; params?: unknown[] | Record<string, unknown> };

type EthereumProvider = {
  request: (args: EthereumRequestArgs) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
};

function getWindowEthereum(): EthereumProvider | undefined {
  if (typeof window === 'undefined') return undefined;
  const maybe = (window as unknown as { ethereum?: unknown }).ethereum;
  if (maybe && typeof maybe === 'object' && 'request' in maybe) {
    return maybe as EthereumProvider;
  }
  return undefined;
}

export default function EthereumDappForChildrenPage() {
  const ethereum = useMemo(() => getWindowEthereum(), []);

  const [accounts, setAccounts] = useState<string[]>([]);
  const [chainId, setChainId] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [connecting, setConnecting] = useState(false);
  const [txHash, setTxHash] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!ethereum) return;

    const handleAccountsChanged = (accs: string[]) => {
      setAccounts(accs);
    };
    const handleChainChanged = (nextChainId: string) => {
      setChainId(nextChainId);
      void refreshBalance();
    };

    ethereum.on?.('accountsChanged', handleAccountsChanged);
    ethereum.on?.('chainChanged', handleChainChanged);

    return () => {
      ethereum.removeListener?.('accountsChanged', handleAccountsChanged);
      ethereum.removeListener?.('chainChanged', handleChainChanged);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ethereum]);

  async function connectWallet() {
    if (!ethereum) {
      setError('No se encontró un proveedor Ethereum. Instala MetaMask.');
      return;
    }
    setError('');
    setConnecting(true);
    try {
      const accs = (await ethereum.request({ method: 'eth_requestAccounts' })) as string[];
      setAccounts(accs);
      const cid = (await ethereum.request({ method: 'eth_chainId' })) as string;
      setChainId(cid);
      await refreshBalance();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Fallo al conectar';
      setError(message);
    } finally {
      setConnecting(false);
    }
  }

  async function refreshBalance() {
    if (!ethereum) return;
    if (!accounts[0]) return;
    try {
      const wei = (await ethereum.request({ method: 'eth_getBalance', params: [accounts[0], 'latest'] })) as string;
      // parse hex wei to ether (simple, for demo only)
      const value = BigInt(wei);
      const ether = Number(value) / 1e18;
      setBalance(ether.toFixed(6));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Fallo al obtener balance';
      setError(message);
    }
  }

  async function signMessage() {
    if (!ethereum || !accounts[0]) return;
    setError('');
    try {
      const from = accounts[0];
      const msg = '¡Hola! Soy una DApp amigable para niños.';
      await ethereum.request({ method: 'personal_sign', params: [msg, from] });
      alert('Mensaje firmado correctamente');
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Fallo al firmar';
      setError(message);
    }
  }

  async function sendSmallTx() {
    if (!ethereum || !accounts[0]) return;
    setError('');
    setTxHash('');
    try {
      // 0 ETH transfer to self as demonstration to avoid costs; user can modify
      const from = accounts[0];
      const to = accounts[0];
      const valueHex = '0x0';
      const hash = (await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{ from, to, value: valueHex }],
      })) as string;
      setTxHash(hash);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Fallo al enviar la transacción';
      setError(message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          DApp de Ethereum para niños
        </h1>
        <p className="text-muted-foreground">Conecta tu billetera, revisa tu balance y firma un mensaje.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Estado</p>
            <p className="font-medium">
              {accounts[0] ? 'Conectado' : 'Desconectado'} {chainId ? `(ChainId: ${chainId})` : ''}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={connectWallet}
              disabled={connecting}
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 disabled:opacity-50"
            >
              {connecting ? 'Conectando…' : 'Conectar MetaMask'}
            </button>
            <button
              onClick={refreshBalance}
              className="inline-flex h-9 items-center justify-center rounded-md border px-4 py-2 text-sm"
            >
              Actualizar balance
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Cuenta</p>
            <p className="break-all font-mono text-sm">{accounts[0] ?? '—'}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Balance (ETH)</p>
            <p className="font-mono">{balance || '0'}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={signMessage}
            className="inline-flex h-9 items-center justify-center rounded-md border px-4 py-2 text-sm"
          >
            Firmar mensaje
          </button>
          <button
            onClick={sendSmallTx}
            className="inline-flex h-9 items-center justify-center rounded-md border px-4 py-2 text-sm"
          >
            Enviar transacción (0 ETH)
          </button>
        </div>

        {txHash && (
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">Tx Hash</p>
            <p className="break-all font-mono text-sm">{txHash}</p>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 text-red-700 p-3 text-sm">{error}</div>
        )}
      </div>
    </div>
  );
}

