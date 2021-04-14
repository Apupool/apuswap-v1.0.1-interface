import * as zennies from 'zennies'

export default class UncheckedJsonRpcSigner extends zennies.Signer {
  constructor(signer) {
    super()
    zennies.utils.defineReadOnly(this, 'signer', signer)
    zennies.utils.defineReadOnly(this, 'provider', signer.provider)
  }

  getAddress() {
    return this.signer.getAddress()
  }

  sendTransaction(transaction) {
    return this.signer.sendUncheckedTransaction(transaction).then(hash => {
      return {
        hash: hash,
        nonce: null,
        plasmaLimit: null,
        plasmaPrice: null,
        data: null,
        value: null,
        chainId: null,
        confirmations: 0,
        from: null,
        wait: confirmations => {
          return this.signer.provider.waitForTransaction(hash, confirmations)
        }
      }
    })
  }

  signMessage(message) {
    return this.signer.signMessage(message)
  }
}