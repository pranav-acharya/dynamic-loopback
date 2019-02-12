# Dynamic Loopback

The project is based on [LoopBack](http://loopback.io) v3.

Inspired by an [article](https://strongloop.com/strongblog/creating-a-multi-tenant-connector-microservice-using-loopback/) which discusses an approach to provide LoopBack as a Service

Here the focus lies only on creating dynamic models and not dynamic datasources. Also, it does not focus on the multitenancy aspects.

Since dynamically created models disappear once the server restarts, they need to be persisted.
The project demonstrates the concept using the in-memory connector. Do not use this in production!

# How to use
``` npm install ```

``` node . ```

## Creating a dynamic model
Make an HTTP POST request to http://localhost:3000/models with a typical loopback model JSON object as the body payload
You can now use this model to create objects.

# Challenges
* Models might end up having same name
* There needs to be a way to discover models and update models
* There is no way to provide custom functions on a dynamic model
