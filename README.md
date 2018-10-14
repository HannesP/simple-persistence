# Simple Persistence

Am experimental quasi-framework for dealing with object persistence in business applications. Replaces ORMs (they way they're normally used).

## Goal

To completely separate persistence operation from business logic.

## Concepts

A traditional ORM entity here corresponds to three different concepts:

* Entity States. A point in state space for an entity, i.e. just a plain object. Normally consists of primitives and basic types (strings, numbers, dates etc.)
* Entites. Objects that operate on entity states in accordance with its business rules.
* Repositories. Objects that persist entity states and perform queries. Work against the persistence layer.

### Example

    const message = Message.from(
        senderId,
        recipientId,
        'Hello there!'
    );
    
    if (!message.containsFoulWords()) {
        message.approve();
    }

    messageRepository.persist(message);
