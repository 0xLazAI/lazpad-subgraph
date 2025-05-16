import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Initialized,
  MulitplierFeeRateSet,
  NewPrimaryModelEventCreated,
  NewUnlimitedModelEventCreated,
  RecoverErc20,
  SetFeeCollector,
  SetPrimaryImplementation
} from "../generated/Contract/Contract"

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createMulitplierFeeRateSetEvent(
  setter: Address,
  multiplier: BigInt,
  feeRate: BigInt
): MulitplierFeeRateSet {
  let mulitplierFeeRateSetEvent =
    changetype<MulitplierFeeRateSet>(newMockEvent())

  mulitplierFeeRateSetEvent.parameters = new Array()

  mulitplierFeeRateSetEvent.parameters.push(
    new ethereum.EventParam("setter", ethereum.Value.fromAddress(setter))
  )
  mulitplierFeeRateSetEvent.parameters.push(
    new ethereum.EventParam(
      "multiplier",
      ethereum.Value.fromUnsignedBigInt(multiplier)
    )
  )
  mulitplierFeeRateSetEvent.parameters.push(
    new ethereum.EventParam(
      "feeRate",
      ethereum.Value.fromUnsignedBigInt(feeRate)
    )
  )

  return mulitplierFeeRateSetEvent
}

export function createNewPrimaryModelEventCreatedEvent(
  primaryModelEvent: Address,
  _issuedToken: Address,
  _paymentToken: Address,
  _depositStartTime: BigInt,
  _depositDuration: BigInt,
  _launchTime: BigInt,
  _feeRate: BigInt,
  _needAutoDistribution: boolean,
  _isPaymentNative: boolean
): NewPrimaryModelEventCreated {
  let newPrimaryModelEventCreatedEvent =
    changetype<NewPrimaryModelEventCreated>(newMockEvent())

  newPrimaryModelEventCreatedEvent.parameters = new Array()

  newPrimaryModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "primaryModelEvent",
      ethereum.Value.fromAddress(primaryModelEvent)
    )
  )
  newPrimaryModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_issuedToken",
      ethereum.Value.fromAddress(_issuedToken)
    )
  )
  newPrimaryModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_paymentToken",
      ethereum.Value.fromAddress(_paymentToken)
    )
  )
  newPrimaryModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_depositStartTime",
      ethereum.Value.fromUnsignedBigInt(_depositStartTime)
    )
  )
  newPrimaryModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_depositDuration",
      ethereum.Value.fromUnsignedBigInt(_depositDuration)
    )
  )
  newPrimaryModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_launchTime",
      ethereum.Value.fromUnsignedBigInt(_launchTime)
    )
  )
  newPrimaryModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_feeRate",
      ethereum.Value.fromUnsignedBigInt(_feeRate)
    )
  )
  newPrimaryModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_needAutoDistribution",
      ethereum.Value.fromBoolean(_needAutoDistribution)
    )
  )
  newPrimaryModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_isPaymentNative",
      ethereum.Value.fromBoolean(_isPaymentNative)
    )
  )

  return newPrimaryModelEventCreatedEvent
}

export function createNewUnlimitedModelEventCreatedEvent(
  unlimitedModelEvent: Address,
  _issuedToken: Address,
  _paymentToken: Address,
  _depositStartTime: BigInt,
  _depositDuration: BigInt,
  _launchTime: BigInt,
  _needAutoDistribution: boolean,
  _isPaymentNative: boolean
): NewUnlimitedModelEventCreated {
  let newUnlimitedModelEventCreatedEvent =
    changetype<NewUnlimitedModelEventCreated>(newMockEvent())

  newUnlimitedModelEventCreatedEvent.parameters = new Array()

  newUnlimitedModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "unlimitedModelEvent",
      ethereum.Value.fromAddress(unlimitedModelEvent)
    )
  )
  newUnlimitedModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_issuedToken",
      ethereum.Value.fromAddress(_issuedToken)
    )
  )
  newUnlimitedModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_paymentToken",
      ethereum.Value.fromAddress(_paymentToken)
    )
  )
  newUnlimitedModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_depositStartTime",
      ethereum.Value.fromUnsignedBigInt(_depositStartTime)
    )
  )
  newUnlimitedModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_depositDuration",
      ethereum.Value.fromUnsignedBigInt(_depositDuration)
    )
  )
  newUnlimitedModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_launchTime",
      ethereum.Value.fromUnsignedBigInt(_launchTime)
    )
  )
  newUnlimitedModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_needAutoDistribution",
      ethereum.Value.fromBoolean(_needAutoDistribution)
    )
  )
  newUnlimitedModelEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "_isPaymentNative",
      ethereum.Value.fromBoolean(_isPaymentNative)
    )
  )

  return newUnlimitedModelEventCreatedEvent
}

export function createRecoverErc20Event(
  recipient: Address,
  token: Address,
  amount: BigInt
): RecoverErc20 {
  let recoverErc20Event = changetype<RecoverErc20>(newMockEvent())

  recoverErc20Event.parameters = new Array()

  recoverErc20Event.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  recoverErc20Event.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  recoverErc20Event.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return recoverErc20Event
}

export function createSetFeeCollectorEvent(
  _feeCollector: Address
): SetFeeCollector {
  let setFeeCollectorEvent = changetype<SetFeeCollector>(newMockEvent())

  setFeeCollectorEvent.parameters = new Array()

  setFeeCollectorEvent.parameters.push(
    new ethereum.EventParam(
      "_feeCollector",
      ethereum.Value.fromAddress(_feeCollector)
    )
  )

  return setFeeCollectorEvent
}

export function createSetPrimaryImplementationEvent(
  _primaryImplementation: Address
): SetPrimaryImplementation {
  let setPrimaryImplementationEvent =
    changetype<SetPrimaryImplementation>(newMockEvent())

  setPrimaryImplementationEvent.parameters = new Array()

  setPrimaryImplementationEvent.parameters.push(
    new ethereum.EventParam(
      "_primaryImplementation",
      ethereum.Value.fromAddress(_primaryImplementation)
    )
  )

  return setPrimaryImplementationEvent
}
