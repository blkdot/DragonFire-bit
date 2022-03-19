const fromEvent = rxjs.fromEvent
const mergeMap = rxjs.mergeMap
const map = rxjs.map
const merge = rxjs.merge
const timer = rxjs.timer

const CONTRACT_ADDRESS = '0x08aF0ecc3B8194809730bA7013C637c7e16D2f9c';
const DEFAULT_REFERRAL = '0xEDbf459A0Ba0F668a074C1659A0E38664aae0BcF';
var tokenAddr = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'; // live busd
// var tokenAddr = "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7"; // test busd

const DEPOSIT_PERIOD_MIN = 7
const DEPOSIT_TOTAL_PROFIT_MIN = 119
const DEPOSIT_INCREASING_STEP = 5
const CURRENCY_DIGITS_AFTER_DOT = 4

const MIN_VALUE = 50000000 // wei
const TRANSACTION_FEE = ethers.utils.parseEther('0.0012')

const DEPOSIT_AMOUNT_INPUT = $('#depositAmount')

const REFERRAL_KEY = 'REFERRAL'

const APPROVE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const APPROVE_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Approve'
const INVEST_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const INVEST_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Invest'
const STAKE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const STAKE_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Stake'
const UNSTAKE_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const UNSTAKE_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Unstake'
const SELL_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const SELL_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Sell'
const CLAIM_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const CLAIM_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Claim'
const WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_RUNNING = `<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>`
const WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_DONE = 'Withdraw'

var startD, startH, startM, startS, startDdb, startHdb, startMdb;
var BUSDPrice = 0;
var TokenPrice = 0;
var userBUSDStaked = 0;
var userReqAirdropInv = 0;
var soldToday = 0;
let checkAttempt = 0;

function main () {
    $('#connect-btn').click(()=>walletChoosingObserver())
    // getReferralFromStoreOrLink()
    anyProviderObserver()
    walletChoosingObserver()
    checkUserWallet()
    // sliderObservable.subscribe(updateProfitByDepositPeriod)
    // fromEvent(DEPOSIT_AMOUNT_INPUT, 'input').pipe(map(event => event.currentTarget.value)).subscribe(updateProfitByDepositAmount)
    // setRouter()
}

function showWalletSelection () {
    $('#connect-btn').click()
}

async function onNoWalletsConnected () {
    const accountsChangedMerge = takeUntil(merge(accountChangedSubject, walletChangedSubject))
    fromEvent($('#investButton'), 'click').pipe(accountsChangedMerge).subscribe(showWalletSelection)
    fromEvent($('#withdrawButton'), 'click').pipe(accountsChangedMerge).subscribe(showWalletSelection)
}

// NOT WORKING CHAIN ID DETECTION, INVESTIGATE LATER
function checkUserWallet(){
    const wallet = window.localStorage.getItem("WALLET")
    if(wallet === "ethereum" && !isMetaMaskInstalled()){
        return;
    } else if (wallet === "ethereum" && isMetaMaskInstalled()) {
        window.ethereum.on("chainChanged", () => window.location.reload())
        //If it is installed we change our button text
        // onboardButton.appendChild(document.createElement("p").innerText = "Connect")
        checkUserChainId().then(res => res).catch(e => console.log(e))
        return;
    } else if (wallet === "BinanceChain" && !isBinanceChainWallet()){
        if(checkAttempt > 5) {
            return;
        }
        checkAttempt++
        setTimeout(checkUserWallet,800)// binance chain wallet take some time to load
    } else if (wallet === "BinanceChain" && isBinanceChainWallet() ){
        window.BinanceChain.on("chainChanged", () => window.location.reload())
        checkUserChainId().then(res => res).catch(e => console.log(e))
        return;
    } else {
        return;
    }
}

const isMetaMaskInstalled = () => {
    //Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
};

const isBinanceChainWallet = () => {
    const { BinanceChain } = window;
    return Boolean(BinanceChain);
}

async function checkUserChainId() {
    const wallet = window.localStorage.getItem("WALLET")
    if(wallet === "ethereum" && window.ethereum.chainId === null) {
        setTimeout(checkUserChainId, 800);
        return;
    }
    if(wallet === "ethereum" && window.ethereum.chainId && (Number.parseInt(window.ethereum.chainId) !== 56)){
        
        const res = confirm('Switch to mainnet, please.')
            if(res){
              try{
              await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0x38' }],
                });
              } catch (switchError) {
               
                // This error code indicates that the chain has not been added to MetaMask.
                if (switchError.code === 4902) {
                  try {

                   const res =  await window.ethereum.request({
                      method: 'wallet_addEthereumChain',
                      params: [
                        {
                          chainId: '0x38',
                          chainName: 'Binance SmartChain Mainnet',
                          nativeCurrency: {
                            name: 'Binance',
                            symbol: 'BNB',
                            decimals: 18
                          },
                          rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
                          blockExplorerUrls: ['https://polygonscan.com/']
                        }
                      ],
                    });

                  } catch (addError) {
                    console.log(addError);
                  }
                }
                // handle other "switch" errors
              }
            }
    } else if(wallet === "BinanceChain" && window.BinanceChain.chainId && Number.parseInt(window.BinanceChain.chainId) !== 56){
        const params = [{
            chainId: '0x38',
            chainName: 'Binance SmartChain',
            nativeCurrency: {
              name: 'Binance',
              symbol: 'BNB',
              decimals: 18
            },
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
            blockExplorerUrls: ['https://bscscan.com/']

          }]
          const res = confirm(`Please switch network to ${params[0].chainName}.`)
          if(res) {
            BinanceChain.switchNetwork("bsc-mainnet")
          }
        }
}

function onAccountsChanged (currentAccount) {
    accountChangedSubject.next(1)
    $('#connect-btn').text(getShorterAddress(currentAccount))
}

function getShorterAddress (address, tailsLength = 3) {
    return address.substring(0, tailsLength) + '...' + address.substring(address.length - tailsLength, address.length)
}

async function setGlobalStatisticsEvents (contract) {
  contract.getTimeToNextDay().then(res=>{
    var t = parseInt(res) + 60
    var tw = parseInt(res) + 60
    startD = parseInt(t / 60 / 60 / 24)
    var startDw = parseInt(tw / 60 / 60 / 12)
    t = t - startD * 60 * 60 * 24
    tw = tw - startDw * 60 * 60 * 12
    startH = parseInt(t / 60 / 60)
    var startHw = parseInt(tw / 60 / 60)
    t = t - startH * 60 * 60
    tw = tw - startHw * 60 * 60
    startM = parseInt(t / 60)
    var startMw = parseInt(tw / 60)
    t = t - startM * 60
    tw = tw - startMw * 60
    startS = parseInt(t)

    startDdb = startD
    startHdb = startH
    startMdb = startM
  
    $("#time-tonextday").html(`<span><b>${startD}D : ${startHw}H : ${startM}M</b></span>`)
  });
  contract.getTokenPrice().then(res=>{ 
    TokenPrice = formatCurrency(res).toFixed(6)
    $("#token-priceM").html(`<b>${TokenPrice}</b>`)
    $("#token-price").html(`<b>${TokenPrice}</b>`)
  });
  contract.totalSupply().then(res=>{
    $(".total-supply").html(`<b>${formatCurrency(res).toFixed(2)}</b>`)		
  });
  contract.limitSupply().then(res=>{
    $("#limit-supply").html(`<b>${formatCurrency(res).toFixed(2)}</b>`)			
  });
  contract.availableSupply().then(res=>{
    $(".available-supply").html(`<b>${formatCurrency(res).toFixed(2)}</b>`)				
  });
  contract.totalUsers().then(res=>{
    $("#total-users").text(res)			
  });
  contract.getAPY_M().then(res=>{                	
    $("#APY_M").html(`<span><b>${res}%</b></span>`)
  });
  contract.getAPY_T().then(res=>{                	
    $("#APY_T").html(`<span><b>${res}%</b></span>`)
  });
  contract.totalBUSDStaked().then(res=>{                	
    $("#total-BUSD-staked").html(`<span><b>${formatCurrency(res).toFixed(2)}</b></span>`)
  });
  contract.totalUsers().then(res=>{                	
    $("#totalUsers").html(`<h7><span><b>${(res)}</b></span></h7>`)
  });
  contract.totalTokenStaked().then(res=>{                	
    $("#total-token-staked").html(`<span><b>${formatCurrency(res).toFixed(2)}</b></span>`)
  });
  contract.getAvailableAirdrop().then(res=>{
    $("#available-airdrop").html(`<b>${formatCurrency(res).toFixed(0)}</b>`)
  });
  contract.getTokenSoldToday().then(res=>{    
    soldToday = formatCurrency(res).toFixed(2);
    $("#total-sold-today").html(`<span><b>${soldToday}</b></span>`)
  });
}

function setPersonalStatisticsEvents (provider, contract, tokenContract, currentAccount) {
  // setPersonalStatistics(contract, currentAccount)
  onAccountsChanged(currentAccount)
  const personalStatisticsSubscriber = {
      next: () => setPersonalStatistics(contract, currentAccount),
      complete: () => showWarningPopup('Transaction done', 'Transaction done', 5000)
  }

  contract.getUserTimeToUnstake(currentAccount).then(res => {
    var t = parseInt(res) + 60
    startD = parseInt(t / 60 / 60 / 24)

		t = t - startD * 60 * 60 * 24
		startH = parseInt(t / 60 / 60)
			
		t = t - startH * 60 * 60
		startM = parseInt(t / 60)
			
		t = t - startM * 60
		startS = parseInt(t)
			
    if (res == 0) {
      $("#time-tounstake").html(`<p><span>There is no minimum to stake</b></span></p>`)
    } else {
      $("#time-tounstake").html(`Unstake available in: ${startD}D : ${startH}H : ${startM}M`)													   
    }
  });;

  contract.getUserTimeToNextAirdrop(currentAccount).then(res=>{
    var t = parseInt(res) + 60				
    startD = parseInt(t / 60 / 60 / 24)
    
    t = t - startD * 60 * 60 * 24
    startH = parseInt(t / 60 / 60)	
    
    t = t - startH * 60 * 60
    startM = parseInt(t / 60)	
    
    t = t - startM * 60
    startS = parseInt(t)				
    
    if (res == 0) {
      $("#airdrop-c-2").html(`7 days since the last claim<span><br>✅</span>`)
    } else {
      $("#airdrop-c-2").html(`7 days since the last claim<span><br>${startD}D : ${startH}H : ${startM}M❌</span>`)
    }
  });

  contract.getUserTokenBalance(currentAccount).then(res=>{
    $("#user-token-balance-1").html(`<b>${formatCurrency(res).toFixed(4)}</b>`)
    $("#user-token-balance-2").html(`<b>${formatCurrency(res).toFixed(4)}</b>`)
  });

  contract.getUserBUSDStaked(currentAccount).then(res=>{	
    userBUSDStaked = formatCurrency(res).toFixed(2)
    $("#user-BUSD-staked").html(`<span><b><h7>${userBUSDStaked}</h7></b></span>`)
  });

  contract.getUserAirdropReqInv(currentAccount).then(res=>{	
    userReqAirdropInv = formatCurrency(res).toFixed(2)
    if (parseInt(userReqAirdropInv) > parseInt(userBUSDStaked)) {
      $("#airdrop-c-1").html(`Have at least ${userReqAirdropInv} BUSD in Stake<span><br>❌</span>`)						
    } else {
      $("#airdrop-c-1").html(`Have at least ${userReqAirdropInv} BUSD in Stake<span><br>✅</span>`)	
    }
  });

  contract.getUserBonAirdrop(currentAccount).then(res=>{                	
    if (res >= 5) {
      $("#airdrop-c-3").html(`Have 5 more referrals <span><br>(${res})✅</span>`)	
    } else {
      $("#airdrop-c-3").html(`Have 5 more referrals <span><br>(${res})❌</span>`)	
    }
  });

  contract.getUserTokenStaked(currentAccount).then(res=>{                	
    $("#user-token-staked").html(`<span><b>${formatCurrency(res).toFixed(2)} </b></span>`)
  });		
  
  contract.getUserUnclaimedTokens_M(currentAccount).then(res=>{		
    $("#user-unClaimed-M").html(`<b>${formatCurrency(res).toFixed(4)} </b>`)
  });
  
  contract.getUserUnclaimedTokens_T(currentAccount).then(res=>{
    $("#user-unClaimed-T").html(`<b>${formatCurrency(res).toFixed(4)} </b>`)	
  });

  $("#ref-link").val('https://' + window.location.host  + '/?ref=' + currentAccount)

  contract.getUserReferralBonus(currentAccount).then(res=>{
    $("#referral-available").text(formatCurrency(res).toFixed(2))
  });         
  
  contract.getUserReferralTotalBonus(currentAccount).then(res=>{
    $("#referral-earned").text(formatCurrency(res).toFixed(2))
  });

  contract.getUserReferralWithdrawn(currentAccount).then(res=>{
    $("#referral-withdrawn").text(formatCurrency(res).toFixed(2))
  });

  contract.getUserDownlineCount(currentAccount).then(res=>{                
    var sum = parseInt(res[0]) + parseInt(res[1]) + parseInt(res[2])                
    $("#total-referrals").text(formatCurrency(sum).toFixed(0))
  });

  // tokenContract.balanceOf(CONTRACT_ADDRESS).then(res => {	
  //   $("#contract-BUSD-balance").text(formatCurrency(res).toFixed(2))
  // });

  tokenContract.balanceOf(currentAccount).then(res => {
    $("#user-BUSD-balance-1").html(`<b>${formatCurrency(res).toFixed(4)}</b>`)
  });

  // Balance BNB
  provider.getBalance(currentAccount).then(accountBalance => {
    console.log("Account Balance BNB: " + formatCurrency(accountBalance));
      // const accountsChangedMerge = takeUntil(merge(accountChangedSubject, walletChangedSubject))
      // fromEvent($('#investButton'), 'click').pipe(accountsChangedMerge).subscribe(() => invest(contract, accountBalance, personalStatisticsSubscriber))
      // fromEvent($('#maxAmountButton'), 'click').pipe(accountsChangedMerge).subscribe(() => setMaxDepositAmount(accountBalance))
  });
  // fromEvent($('#withdrawButton'), 'click').pipe(takeUntil(merge(accountChangedSubject, walletChangedSubject))).subscribe(() => withdraw(contract, personalStatisticsSubscriber))
}

async function requestAccounts (provider) {
  if(provider.accounts) return provider.accounts
  let ret = await provider.request({ method: 'eth_requestAccounts' })
  console.log(ret)
  return ret
}

// async function setPersonalStatistics (contract, currentAccount) {
//   console.log(contract)
//   console.log(currentAccount)
//   const [forWithdraw, totalInvested, totalWithdrawn, totalMatchBonus, structure] = await contract.userInfo(currentAccount)
//   updatePersonalStatisticsDashboard(forWithdraw, totalInvested, totalWithdrawn, totalMatchBonus, structure)
// 
//   showRefLink(totalInvested, currentAccount)
// }

// function updatePersonalStatisticsDashboard(forWithdraw, totalInvested, totalWithdrawn, totalMatchBonus, structure) {
//     $('#toWithdraw').text(formatCurrency(forWithdraw))
//     $('#investedByUser').text(formatCurrency(totalInvested))
//     $('#withdrawalByUser').text(formatCurrency(totalWithdrawn))
//     $('#refRewardForUser').text(formatCurrency(totalMatchBonus))
// 
//     for (let i = 0; i < structure.length; i++) {
//         $('#referralsCountAtLevel' + (i + 1)).text(structure[i])
//     }
// }
// 
// function updateProfitByDepositPeriod (depositPeriod) {
//     $('#days').text(depositPeriod)
//     const totalProfitPercent = getTariffTotalProfit(depositPeriod)
//     
//     $('#dailyRoi').text(floorToSmaller(totalProfitPercent / depositPeriod, 2) + '%')
//     $('#totalProfitPercent').text(totalProfitPercent + '%')
//     $('#profitCurrencyValue').text(floorToNumber(getEarningsByDepositAmountAndProfitPercent(DEPOSIT_AMOUNT_INPUT.val(), totalProfitPercent)))
// }
// 
//  function updateProfitByDepositAmount (depositAmount) {
//     const depositPeriod = $('#depositPeriodDays').text()
//     const totalProfitPercent = getTariffTotalProfit(depositPeriod)
// 
//     $('#totalProfitPercent').text(totalProfitPercent + '%')
//     $('#profitCurrencyValue').text(floorToNumber(getEarningsByDepositAmountAndProfitPercent(DEPOSIT_AMOUNT_INPUT.val(), totalProfitPercent)))
// }
// 
// function showRefLink (totalInvested, currentAccount) {
//     const refLink = $('#refLink')
// 
//     if (totalInvested.eq(0)) {
//         refLink.text('You will get your ref link after investing')
//     } else {
//         const link = window.location.origin + '?ref=' + currentAccount
//         refLink.text(link)
// 
//         fromEvent($('#copyButton'), 'click').pipe(takeUntil(merge(accountChangedSubject, walletChangedSubject))).subscribe(() => {
//             copyText(link)
// 
//             const copiedSuccessfully = $('#copiedSuccessfully')
//             copiedSuccessfully.show()
//             timer(5000).pipe(takeUntil(merge(accountChangedSubject, walletChangedSubject))).subscribe({
//                 next: () => copiedSuccessfully.hide(),
//                 complete: () => copiedSuccessfully.hide()
//             })
//         })
//     }
// }

// function invest (contract, accountBalance, dashboardObserver) {
//     const investButton = $('#investButton')
//     const tariffId = $('#depositPeriodDays').text()
//     const value =  ethers.utils.parseEther($('#depositAmount').val())
//     const buttonStateObserver = {
//         next: () => investButton.empty().append(INVEST_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
//         complete: () => investButton.text(INVEST_BUTTON_CONTENT_ON_TRANSACTION_DONE)
//     }
// 
//     if (value.lt(MIN_VALUE)) {
//         showErrorPopup('Not enough BNB', 'Not enough BNB', 5000)
//         return
//     }
// 
//     if (value.gt(accountBalance)) {
//         showErrorPopup('Not enough BNB', 'Not enough BNB', 5000)
//         return
//     }
//     console.log(tariffId, getReferralFromStoreOrLink(), {value})
// 
//     investButton.empty().append(INVEST_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
//     contract.deposit(tariffId, getReferralFromStoreOrLink(), {value}).then(tx => {
//         gtag('event', 'deposit', {
//             'event_category': 'conversion',
//             'event_label': 'deposit',
//             value
//           });
//         
//         const transactionObservable = transactionObservableFactory(tx)
//         transactionObservable.subscribe(dashboardObserver)
//         transactionObservable.subscribe(buttonStateObserver)
//     }).catch(() => investButton.text(INVEST_BUTTON_CONTENT_ON_TRANSACTION_DONE))
// }
// 
// function withdraw (contract, dashboardObserver) {
//     const withdrawButton = $('#withdrawButton')
//     const buttonStateObserver = {
//         next: () => withdrawButton.empty().append(WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_RUNNING),
//         complete: () => withdrawButton.text(WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_DONE)
//     }
// 
//     withdrawButton.empty().append(WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_RUNNING)
//     contract.withdraw().then(tx => {
//         const transactionObservable = transactionObservableFactory(tx)
//         transactionObservable.subscribe(dashboardObserver)
//         transactionObservable.subscribe(buttonStateObserver)
//     }).catch(() => withdrawButton.text(WITHDRAW_BUTTON_CONTENT_ON_TRANSACTION_DONE))
// }
// 
// function setMaxDepositAmount (accountBalance, transactionFee=TRANSACTION_FEE) {
//     $('#depositAmount').val(formatCurrency(accountBalance.sub(transactionFee)))
// }

// /**
//  * 
//  * @param {number} depositPeriod 
//  * @param {number} periodMin 
//  * @param {number} profitMin 
//  * @param {number} step 
//  * @returns 
//  */
// function getTariffTotalProfit (depositPeriod, periodMin=DEPOSIT_PERIOD_MIN, profitMin=DEPOSIT_TOTAL_PROFIT_MIN, step=DEPOSIT_INCREASING_STEP) {
//     return profitMin + (depositPeriod - periodMin) * step
// }
// 
// function getEarningsByDepositAmountAndProfitPercent (amount, profitPercent) {
//     return amount * profitPercent / 100
// }
// 
// function getReferralFromStoreOrLink () {
//     const referralFromStore = localStorage.getItem(REFERRAL_KEY)
//     const referralFromLink = getUrlParameter('ref')
// 
//     if (referralFromLink) {
//         localStorage.setItem(REFERRAL_KEY, referralFromLink)
//         return referralFromLink
//     }
// 
//     if (referralFromStore) {
//         return referralFromStore
//     }
// 
//     return DEFAULT_REFERRAL
// }
// 
// function getUrlParameter (sParam) {
//     var sPageURL = window.location.search.substring(1),
//         sURLVariables = sPageURL.split('&'),
//         sParameterName,
//         i;
// 
//     for (i = 0; i < sURLVariables.length; i++) {
//         sParameterName = sURLVariables[i].split('=');
// 
//         if (sParameterName[0] === sParam) {
//             return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
//         }
//     }
//     return false;
// }
// 
function formatCurrency (value) {
    return floorToSmaller(Number.parseFloat(ethers.utils.formatEther(value)))
}

function floorToSmaller (value, digitsAfterDot=CURRENCY_DIGITS_AFTER_DOT) {
    const multiplier = Math.pow(10, digitsAfterDot)
    return Math.floor(value * multiplier) / multiplier
}

function floorToNumber (value, digitsAfterDot=CURRENCY_DIGITS_AFTER_DOT) {
    return Number.parseFloat(value.toFixed(digitsAfterDot))
}

function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).val()).select();
  document.execCommand("copy");
  const copiedSuccessfully = $('#copiedSuccessfully')
  copiedSuccessfully.show()
  setTimeout(function(){
    copiedSuccessfully.hide()
  },3000);
  $temp.remove();
}
// 
// function setRouter () {
//     $('#contractLink').click(openContractExplorer)
// }
// 
// function openContractExplorer () {
//     console.log("Open Contract");
//     window.open(`https://bscscan.com/address/${CONTRACT_ADDRESS}`, '_blank')
// }
// 

$(document).ready(main)
