import { BigInt } from "@graphprotocol/graph-ts";
import {
    CapIssueModelEventInitialized as InitialEvent,
    FeeCharged as FeeChargedEvent,
    IssueSoldOut as IssueSoldOutEvent,
    IssuedTokenCharge as IssuedTokenChargeEvent,
    IssuerChargedRaised as IssuerChargedRaisedEvent,
    PaymentTokenEmergencyWithdraw as PaymentTokenEmergencyWithdrawEvent,
    RecoverStopped as RecoverStoppedEvent,
    SetUserAlocation as SetUserAlocationEvent,
    Stopped as StoppedEvent,
    UpdateDepositDurationEvent as UpdateDepositDuration,
    UpdateLaunchTimeEvent as UpdateLaunchTime,
    UserParticipated as UserParticipatedEvent,
    claimIssuedTokenEvent as ClaimIssuedTokenEvent,
  } from "../generated/CapIssueModel/CapIssueModel"
  import {
    Issue,
    UserInvestment,
    UserDeposit,
    UserAllocation,
    UserRefund,
  } from "../generated/schema"
  
  export function CapIssueModelEventInitialized(event: InitialEvent): void {
    let entity = new Issue(event.address.toHexString());

    // type Issue @entity(immutable: false){
    //     id: ID!
    //     type: String!
    //     issuer: String!
    //     issueToken: String!
    //     paymentToken: String
    //     depositStart: BigInt!
    //     duration: BigInt!
    //     launchTime: BigInt!
    //     price: BigInt!
    //     issuedTokenAmount: BigInt!
    //     targetRaised: BigInt!
    //     minDeposit: BigInt!
    //     maxDeposit: BigInt
    //     storageIssuedTokenAmount: BigInt!
    //     feeRate: BigInt
    //     hasFeeCharged: Boolean
    //     stopped: Boolean
    //     needAutoDistribution: Boolean
    //     isPaymentNative: Boolean
    //     soldOut: Boolean
    //     participantsSize: BigInt!
    //     blockNumber: BigInt!
    //     createTimestamp: BigInt!
    //     updateTimestamp: BigInt!
    //     transactionHash: Bytes!
    //   }


    entity.type = "CAP";
    entity.issuer = event.params.issuer.toHexString();
    entity.issueToken = event.params.issueToken.toHexString();
    entity.paymentToken = event.params.paymentToken.toHexString();
    entity.depositStart = event.params.depositStart;
    entity.duration = event.params.duration;
    entity.launchTime = event.params.launchTime;
    entity.price = event.params.price;
    entity.issuedTokenAmount = event.params.issuedTokenAmount;
    entity.targetRaised = event.params.targetRaised;
    entity.minDeposit = event.params.minDeposit;
    entity.maxDeposit = event.params.maxDeposit;
    entity.storageIssuedTokenAmount = BigInt.fromString("0");
    entity.feeRate = event.params.feeRate;
    entity.hasFeeCharged = false;
    entity.stopped = false;
    entity.needAutoDistribution = false;
    entity.isPaymentNative = event.params.isPaymentNative;
    entity.soldOut = false;
    entity.paymentTokenReserve = BigInt.fromString("0");
    entity.participantsSize = BigInt.fromString("0");
    entity.blockNumber = event.block.number;
    entity.createTimestamp = event.block.timestamp;
    entity.updateTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;
    entity.save()
  }
  
  export function UserParticipated(
    event: UserParticipatedEvent
  ): void {
     let depositEntity = new UserDeposit(event.transaction.hash.toHexString());
     let issue = Issue.load(event.address.toHexString());
     if(issue != null){
        depositEntity.issueToken = issue.issueToken;
     }else{
        depositEntity.issueToken = "";
     }
     depositEntity.user = event.params.user.toHexString();
     depositEntity.issue = event.address.toHexString();
     depositEntity.buyAmount = event.params.paidAmount;
     depositEntity.blockNumber = event.block.number;
     depositEntity.createTimestamp = event.block.timestamp;
     depositEntity.updateTimestamp = event.block.timestamp;
     depositEntity.transactionHash = event.transaction.hash;
     depositEntity.save();

    //  issueToken: String! 
    //  allocation: BigInt!
    //  balance: BigInt!
    //  refunds: BigInt!
    //  hasClaimedRefunds: Boolean!
    //  hasClaimedIssuedToken: Boolean!
    //  blockNumber: BigInt!
    //  createTimestamp: BigInt!
    //  updateTimestamp: BigInt!
    //  transactionHash: Bytes!
     let investmentEntity = UserInvestment.load(event.address.toHexString() + "_" + event.params.user.toHexString());
     let isNew = false;
     if(investmentEntity == null){
        isNew = true;
        investmentEntity = new UserInvestment(event.address.toHexString() + "_" + event.params.user.toHexString());
        investmentEntity.user = event.params.user.toHexString();
        investmentEntity.issue = event.address.toHexString();
        investmentEntity.balance = BigInt.fromString("0");
        investmentEntity.createTimestamp = event.block.timestamp;
        investmentEntity.hasClaimedRefunds = false;
        investmentEntity.hasClaimedIssuedToken = false;
        investmentEntity.allocation = BigInt.fromString("0");
        investmentEntity.refunds = BigInt.fromString("0");
        if(issue != null){
            investmentEntity.issueToken = issue.issueToken;
         }else{
            investmentEntity.issueToken = "";
         }
     }

     investmentEntity.balance = investmentEntity.balance.plus(event.params.paidAmount);
     investmentEntity.blockNumber = event.block.number;
     investmentEntity.updateTimestamp = event.block.timestamp;
     investmentEntity.transactionHash = event.transaction.hash;
     investmentEntity.save();

     if(issue != null){
        if(isNew){
            issue.participantsSize = issue.participantsSize.plus(BigInt.fromString("1"));
        }
        issue.paymentTokenReserve = event.params.paymentTokenReserve;
        issue.blockNumber = event.block.number;
        issue.updateTimestamp = event.block.timestamp;
        issue.transactionHash = event.transaction.hash;
        issue.save();
     }
  }
  
  export function IssueSoldOut(
    event: IssueSoldOutEvent
  ): void {
    let entity = Issue.load(event.address.toHexString());
    if(entity != null){
        entity.soldOut = true;
        entity.blockNumber = event.block.number
        entity.updateTimestamp = event.block.timestamp
        entity.transactionHash = event.transaction.hash
        entity.save()
    }
    
  }
  
  export function IssuedTokenCharge(
    event: IssuedTokenChargeEvent
  ): void {
    let issue = Issue.load(event.address.toHexString());
    if(issue != null){
        issue.storageIssuedTokenAmount = event.params.storageAmount;
        issue.needAutoDistribution = true;
        issue.blockNumber = event.block.number;
        issue.updateTimestamp = event.block.timestamp;
        issue.transactionHash = event.transaction.hash;
        issue.save();
    }
  }
  
  export function SetUserAlocation(event: SetUserAlocationEvent): void {
    let investmentEntity = UserInvestment.load(event.address.toHexString() + "_" + event.params.user.toHexString());
    if(investmentEntity != null){
        investmentEntity.allocation = event.params.allocation;
        investmentEntity.blockNumber = event.block.number;
        investmentEntity.updateTimestamp = event.block.timestamp;
        investmentEntity.transactionHash = event.transaction.hash;
        investmentEntity.save();
    }
  }
  
  export function claimIssuedTokenEvent(event: ClaimIssuedTokenEvent): void {
    let investmentEntity = UserInvestment.load(event.address.toHexString() + "_" + event.params.user.toHexString());
    if(investmentEntity != null){
        investmentEntity.hasClaimedIssuedToken = true;
        investmentEntity.blockNumber = event.block.number;
        investmentEntity.updateTimestamp = event.block.timestamp;
        investmentEntity.transactionHash = event.transaction.hash;
        investmentEntity.save();
    }
    let issue = Issue.load(event.address.toHexString());
    if(issue != null){
        issue.storageIssuedTokenAmount = event.params.storageIssuedTokenAmount;
        issue.blockNumber = event.block.number;
        issue.updateTimestamp = event.block.timestamp;
        issue.transactionHash = event.transaction.hash;
        issue.save();
    }
  }
  
  export function Stopped(
    event: StoppedEvent
  ): void {
    let issue = Issue.load(event.address.toHexString());
    if(issue != null){
        issue.stopped = true;
        issue.blockNumber = event.block.number;
        issue.updateTimestamp = event.block.timestamp;
        issue.transactionHash = event.transaction.hash;
        issue.save();
    }
  }

  export function UpdateDepositDurationEvent(
    event: UpdateDepositDuration
  ): void {
    let issue = Issue.load(event.address.toHexString());
    if(issue != null){
        issue.duration = event.params.newDuration;
        issue.blockNumber = event.block.number;
        issue.updateTimestamp = event.block.timestamp;
        issue.transactionHash = event.transaction.hash;
        issue.save();
    }
  }



  export function UpdateLaunchTimeEvent(
    event: UpdateLaunchTime
  ): void {
    let issue = Issue.load(event.address.toHexString());
    if(issue != null){
        issue.launchTime = event.params.newLuanchTime;
        issue.blockNumber = event.block.number;
        issue.updateTimestamp = event.block.timestamp;
        issue.transactionHash = event.transaction.hash;
        issue.save();
    }
  }


  export function PaymentTokenEmergencyWithdraw(
    event: PaymentTokenEmergencyWithdrawEvent
  ): void {
    let issue = Issue.load(event.address.toHexString());
    if(issue != null){
        issue.paymentTokenReserve = event.params.paymentTokenReserve;
        issue.blockNumber = event.block.number;
        issue.updateTimestamp = event.block.timestamp;
        issue.transactionHash = event.transaction.hash;
        issue.save();
    }
    let investmentEntity = UserInvestment.load(event.address.toHexString() + "_" + event.params.user.toHexString());
    if(investmentEntity != null){
        investmentEntity.balance = investmentEntity.balance.minus(event.params.amount);
        investmentEntity.hasEmergencyWithdraw = true;
        investmentEntity.blockNumber = event.block.number;
        investmentEntity.updateTimestamp = event.block.timestamp;
        investmentEntity.transactionHash = event.transaction.hash;
        investmentEntity.save();
    }
  }


  export function IssuerChargedRaised(
    event: IssuerChargedRaisedEvent
  ): void {
    let issue = Issue.load(event.address.toHexString());
    if(issue != null){
        issue.paymentTokenReserve = issue.paymentTokenReserve.minus(event.params.amount);
        issue.blockNumber = event.block.number;
        issue.updateTimestamp = event.block.timestamp;
        issue.transactionHash = event.transaction.hash;
        issue.save();
    }
  }


  export function RecoverStopped(
    event: RecoverStoppedEvent
  ): void {
    let issue = Issue.load(event.address.toHexString());
    if(issue != null){
        issue.stopped = false;
        issue.blockNumber = event.block.number;
        issue.updateTimestamp = event.block.timestamp;
        issue.transactionHash = event.transaction.hash;
        issue.save();
    }
  }

  export function FeeCharged(
    event: FeeChargedEvent
  ): void {
    let issue = Issue.load(event.address.toHexString());
    if(issue != null){
        issue.hasFeeCharged = true;
        if(issue.paymentTokenReserve > event.params.fees){
            issue.paymentTokenReserve = issue.paymentTokenReserve.minus(event.params.fees);
        }else{
            issue.paymentTokenReserve = BigInt.fromString("0");
        }
       
        issue.blockNumber = event.block.number;
        issue.updateTimestamp = event.block.timestamp;
        issue.transactionHash = event.transaction.hash;
        issue.save();
    }
  }

  
  