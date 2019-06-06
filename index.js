function addCredentials() {
  let userCredentials = `Private Key: <input type="text" id="userKey" placeholder="Type Your Private Key.."/> <br/><br/>
      <button id="submit" class="align-center" onclick="ready()">Submit</button>`
      document.querySelector("#profile-content").innerHTML =userCredentials;
    }
let nodeProvider= prompt("Please Enter Your Infura URL. We Never Store Your API keys and Valid for This Session Only.", "https://ropsten.infura.io/v3/");
    addCredentials();
    function ready(){
let key= document.getElementById("userKey").value;
let hexKey="0x"+key;
let acc= web3.eth.accounts.privateKeyToAccount(hexKey);
let account= acc.address;
let privateKey1 = new ethereumjs.Buffer.Buffer(key, 'hex');
const provider = new Web3.providers.HttpProvider(nodeProvider); 
const web3 = new Web3(provider);
console.log(web3.version);
const contract_Address = "0x88fc0739e42b7b3ff835d4cb654ae0740f3752b0";
const abi =[{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"createAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"_content","type":"string"}],"name":"writeMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getMessage","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"address"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"messagesLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"userDetails","outputs":[{"name":"","type":"string"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}];
web3.eth.defaultAccount =account;
const contract = new web3.eth.Contract(abi, contract_Address);


web3.eth.net.isListening()
   .then(() => console.log('web3 is connected'))
   .catch(e => console.log('Wow. Something went wrong'));
 
function start(){

contract.methods.userDetails().call().then(function(result1){

  let userDetails=`<span>${result1[0]}</span> <br/>
  <span>${result1[1]}</span> <br/>`
  document.querySelector("#profile-content").innerHTML=userDetails;

});

}
ready.start=start;
start();

function initMessages(){
	contract.methods.messagesLength().call().then(function(result2){
	 let maxMessages = result2;
	  let sectionContent = ''
	  for(let i = 0; i < maxMessages; i++) {
           contract.methods.getMessage(i).call().then(function(message){
         sectionContent += `<div class="message-box">
                    <div>${message[2]}</div>
                    <div>${message[0]} says:</div>
                    <div>${message[1]}</div>
                    <div>Sent On: ${message[3]}</div>
                </div>`
 if(i === maxMessages - 1) document.querySelector('#messages').innerHTML = sectionContent
           	//methods go here
           });
        }
}); 
}
ready.initMessages=initMessages;
function createAccount(){
const  userName= contract.methods.createAccount(document.getElementById("name").value).encodeABI();

web3.eth.getTransactionCount(account, (err, txCount) => {
// Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       contract_Address,
    value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
    gasLimit: web3.utils.toHex(2100000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
    data:userName  
  }
    // Sign the transaction
    const tx =new ethereumjs.Tx(txObject);
    tx.sign(privateKey1);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    // Broadcast the transaction
    const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
        console.log(tx)
        document.getElementById("log").innerHTML="Transaction Submitted.. Please Wait A Moment.."+ tx;
    });
});

}
ready.createAccount=createAccount;
function sendMessage(){
	const messageData= contract.methods.writeMessage(document.getElementById("address").value,document.getElementById("write-message").value).encodeABI();

web3.eth.getTransactionCount(account, (err, txCount) => {
// Build the transaction
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    to:       contract_Address,
    value:    web3.utils.toHex(web3.utils.toWei('0', 'ether')),
    gasLimit: web3.utils.toHex(2100000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
    data:messageData  
  }
    // Sign the transaction
    const tx = new ethereumjs.Tx(txObject);
    tx.sign(privateKey1);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    // Broadcast the transaction
    const transaction = web3.eth.sendSignedTransaction(raw, (err, tx) => {
        console.log(tx)
        document.getElementById("log").innerHTML="Transaction Submitted.. Please Wait A Moment.."+ tx;
    });
});
   }
   ready.sendMessage=sendMessage;
  }
