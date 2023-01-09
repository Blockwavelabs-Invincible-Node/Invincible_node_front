# Invincible Node Front

Our Goal is to absorb the EVM compatible multi-chain affiliated assets into Matic Network via Invincible node in order to contribute to becoming a 
sustaining-scalable chain

# Who should Use
People who wants to stake and also hedge risks by claiming stable token

#URL
https://www.invinciblenode.app/

# Contract Addresses

evmosRewardToken: 0x912998a3b40286d60DB0663eE8806F1864133958                                          
evmosLiquidStaking: 0x34afA6beCB13462caFc6b58855A6aE1fCD58E5c2                                           
stableCoinPool: 0x418894766B4e9a2Ee1b0Da7543a949d54716C4e8                                                  
kavaLiquidStaking": 0x5DD4af979214c5Eb994e708bE2A66cBA3882B567                                                    
polygonLiquidStaking": 0x5299e87CF929Ea0849740840736CD5d9476E68BA                                                     
kavaRewardToken":0xAd6c553BCe3079b4Dc52689fbfD4a2e72F1F3158                                                         
kavaLiquidStaking: 0x5DD4af979214c5Eb994e708bE2A66cBA3882B567                                                         
polygonRewardToken: 0x2F3EefaA999ECe148564e187CcA9e8B1eA7c2e89                                                                      

# Frontend
npm i                                                                                                 
npm start

# Backend
Run following commands for each chain ( Kava, Evmos, Polygon )

1. node ClaimReward.js
- Claim and update reward every hour
2. node ListenStakeEvent.js
- listen to stake event using event subscriber
3. node ListenUnbondEvent.js
- listen to unbond request using event subscriber
