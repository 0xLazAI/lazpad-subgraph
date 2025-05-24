specVersion: 1.3.0
indexerHints:
  prune: auto
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum
    name: NoCapIssue
    network: mainnet
    source:
      abi: NoCapIssue
      startBlock: 1200000
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - Issue
        - UserInvestment
        - UserDeposit
        - UserAllocation
        - UserRefund                                   
      abis:
        - name: NoCapIssue
          file: ./abis/NoCapIssue.json
      eventHandlers:
        - event: NoCapIssueEventInitialized(address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool)
          handler: NoCapIssueEventInitialized
        - event: UserParticipated(indexed address,uint256,uint256,uint256)
          handler: UserParticipated
        - event: IssuedTokenCharge(uint256,address,uint256)
          handler: IssuedTokenCharge
        - event: UserRefunds(indexed address,uint256,uint256)
          handler: UserRefunds          
        - event: SetUserAlocation(indexed address,uint256)
          handler: SetUserAlocation
        - event: claimIssuedTokenEvent(indexed address,uint256,uint256)
          handler: claimIssuedTokenEvent
        - event: Stopped()
          handler: Stopped
        - event: RecoverStopped()
          handler: RecoverStopped
        - event: UpdateDepositDurationEvent(uint256)
          handler: UpdateDepositDurationEvent
        - event: UpdateLaunchTimeEvent(uint256)
          handler: UpdateLaunchTimeEvent
        - event: PaymentTokenEmergencyWithdraw(indexed address,uint256,uint256)
          handler: PaymentTokenEmergencyWithdraw  
        - event: IssuerChargedRaised(indexed address,uint256,uint256)
          handler: IssuerChargedRaised
        - event: FeeCharged(indexed address,uint256)
          handler: FeeCharged   
                                                                                                                           
      file: ./src/NoCapIssue.ts    
  - kind: ethereum
    name: CapIssue
    network: mainnet
    source:
      abi: CapIssue
      startBlock: 1200000
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - Issue
        - UserInvestment
        - UserDeposit
        - UserAllocation 
      abis:
        - name: CapIssue
          file: ./abis/CapIssue.json
      eventHandlers:
        - event: CapIssueModelEventInitialized(address,address,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,bool,uint256)
          handler: CapIssueModelEventInitialized
        - event: UserParticipated(indexed address,uint256,uint256,uint256)
          handler: UserParticipated
        - event: IssueSoldOut(uint256,uint256,uint256)
          handler: IssueSoldOut
        - event: IssuedTokenCharge(uint256,address,uint256)
          handler: IssuedTokenCharge
        - event: SetUserAlocation(indexed address,uint256)
          handler: SetUserAlocation
        - event: claimIssuedTokenEvent(indexed address,uint256,uint256)
          handler: claimIssuedTokenEvent
        - event: Stopped()
          handler: Stopped
        - event: RecoverStopped()
          handler: RecoverStopped
        - event: UpdateDepositDurationEvent(uint256)
          handler: UpdateDepositDurationEvent
        - event: UpdateLaunchTimeEvent(uint256)
          handler: UpdateLaunchTimeEvent
        - event: PaymentTokenEmergencyWithdraw(indexed address,uint256,uint256)
          handler: PaymentTokenEmergencyWithdraw  
        - event: IssuerChargedRaised(indexed address,uint256,uint256)
          handler: issueInitIssuerChargedRaisedial
        - event: FeeCharged(indexed address,uint256)
          handler: FeeCharged   
      file: ./src/CapIssue.ts    
