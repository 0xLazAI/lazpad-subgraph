import {
  Initialized as InitializedEvent,
  MulitplierFeeRateSet as MulitplierFeeRateSetEvent,
  NewPrimaryModelEventCreated as NewPrimaryModelEventCreatedEvent,
  NewUnlimitedModelEventCreated as NewUnlimitedModelEventCreatedEvent,
  RecoverErc20 as RecoverErc20Event,
  SetFeeCollector as SetFeeCollectorEvent,
  SetPrimaryImplementation as SetPrimaryImplementationEvent
} from "../generated/Contract/Contract"
import {
  Initialized,
  MulitplierFeeRateSet,
  NewPrimaryModelEventCreated,
  NewUnlimitedModelEventCreated,
  RecoverErc20,
  SetFeeCollector,
  SetPrimaryImplementation
} from "../generated/schema"

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMulitplierFeeRateSet(
  event: MulitplierFeeRateSetEvent
): void {
  let entity = new MulitplierFeeRateSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.setter = event.params.setter
  entity.multiplier = event.params.multiplier
  entity.feeRate = event.params.feeRate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewPrimaryModelEventCreated(
  event: NewPrimaryModelEventCreatedEvent
): void {
  let entity = new NewPrimaryModelEventCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.primaryModelEvent = event.params.primaryModelEvent
  entity._issuedToken = event.params._issuedToken
  entity._paymentToken = event.params._paymentToken
  entity._depositStartTime = event.params._depositStartTime
  entity._depositDuration = event.params._depositDuration
  entity._launchTime = event.params._launchTime
  entity._feeRate = event.params._feeRate
  entity._needAutoDistribution = event.params._needAutoDistribution
  entity._isPaymentNative = event.params._isPaymentNative

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewUnlimitedModelEventCreated(
  event: NewUnlimitedModelEventCreatedEvent
): void {
  let entity = new NewUnlimitedModelEventCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.unlimitedModelEvent = event.params.unlimitedModelEvent
  entity._issuedToken = event.params._issuedToken
  entity._paymentToken = event.params._paymentToken
  entity._depositStartTime = event.params._depositStartTime
  entity._depositDuration = event.params._depositDuration
  entity._launchTime = event.params._launchTime
  entity._needAutoDistribution = event.params._needAutoDistribution
  entity._isPaymentNative = event.params._isPaymentNative

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRecoverErc20(event: RecoverErc20Event): void {
  let entity = new RecoverErc20(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.recipient = event.params.recipient
  entity.token = event.params.token
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetFeeCollector(event: SetFeeCollectorEvent): void {
  let entity = new SetFeeCollector(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._feeCollector = event.params._feeCollector

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetPrimaryImplementation(
  event: SetPrimaryImplementationEvent
): void {
  let entity = new SetPrimaryImplementation(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._primaryImplementation = event.params._primaryImplementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
