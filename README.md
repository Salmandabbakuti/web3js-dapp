## Web3.js Dapp

Using Web3js library to interact with smartcontracts and sending transactions from remote node.

As we already know, in order to do transactions on blockchain network, we must sign our message (whether offline or online) and broadcast on network. for ethereum clients like geth, mist, MEW, Metamask and ganache we dont need to sign manually. because they hold our private keys and sign our messages with our private key automatically.

To interact with blockchain, we must be connected to any fully synced node. in this Dapp we are pointing to infura node.

in this Dapp, we are not using any of these clients. with plain web3.js, we need to hold our own private keys and sign manually and broadcast on network. thats all we are gonna do.

basically, this is a messenger like dapp where we can share text messages with anyone. once after creating account, you are able to send messages to anyone referring their Account address.


so, with Web3.js we can do all these operations. have a look at code
