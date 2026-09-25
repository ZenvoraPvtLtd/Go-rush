# Ride State Machine Test Plan

## A. Valid Transitions
Ensure each step in the happy path works: REQUESTED -> SEARCHING -> OFFERED -> ASSIGNED -> DRIVER_EN_ROUTE -> DRIVER_ARRIVED -> STARTED -> IN_PROGRESS -> COMPLETED.

## B. Invalid Transitions
Verify rejections: COMPLETED -> STARTED, CANCELLED -> ASSIGNED, etc.

## C. Authorization
Customer cannot mutate driver states. Driver cannot mutate other drivers' rides.

## D. Concurrency
Simulate two drivers accepting the same ride simultaneously. Verify atomic DB transaction prevents double assignment.

## E. Idempotency
Repeated valid requests with the same idempotency key must not create duplicate events or state changes.

## F. OTP
Test invalid, expired, and correct OTPs for the DRIVER_ARRIVED -> STARTED transition.