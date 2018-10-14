# Simple Persistence

Am experimental quasi-framework for dealing with object persistence in business applications. Replaces ORMs (they way they're normally used).

## Goal

To completely separate persistence operation from business logic.

## Concepts

An ORM entity corresponds to three different concepts:

* Entity States. A point in state space for an entity, i.e. just a plain object. Normally consists of primitives and basic types (strings, numbers, dates etc.)
* Entites. Objects that operate on entity states in accordance with its business rules.
* Repositories. Objects that persist entity states and perform queries. Works against the persistence layer.
