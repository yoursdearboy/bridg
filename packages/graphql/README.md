# BRIDG GraphQL

## Style guide

The API is heavily follows FHIR GraphQL API [1] and various best practices such as Input and Filter types, etc...

Each resource have at least two top level queries (as in FHIR [1]):

- `Resource(id: ID)`
- `ResourceList(filter: ResourceFilter)`

We don't use plural field names, because BRIDG uses singular names everywhere.

Appending `List` suffix is simmilar to other conventions here.
Something similar is done by Hasura [9] for aggregates.

And three mutations (as in FHIR [1]):

- `ResourceCreate(input: ResourceInput)`
- `ResourceUpdate(id: ID, input: ResourceInput)`
- `ResourceDelete(id: ID)`

Similar mutation naming conventions are used by GitLab [3]

> mutation names should follow the convention '{Resource}{Action}' or '{Resource}{Action}{Attribute}'.

and Jake Dawkins [5]

> The general pattern we follow for mutation naming is
> Entity + Action = entityAction

and Shopify [6]

> Rule #17: Prefix mutation names with the object they are mutating for alphabetical grouping (e.g. use orderCancel instead of cancelOrder).

and Sophia Willows. [7]

Though it contrasts with one used by many other GraphQL API providers (e.g. Apollo [4], GitHub and many others).

Another common convention is to suffix Input types with `Input` [4] [7] [8] and filter types with `Filter` [8].

For realtionships there are three common strategy described in [6], we use embedding for simple collections and separate utations for complex ones.
This results in mutations like `PersonPostalAddressCreate`.

## References

1. [Using GraphQL with FHIR](https://build.fhir.org/graphql.html)
2. [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
3. [GraphQL API style guide by GitLab](https://docs.gitlab.com/development/api_graphql_styleguide/)
4. [Schema Naming Conventions by Apollo](https://www.apollographql.com/docs/graphos/schema-design/guides/naming-conventions)
5. [GraphQL Style Guide by Jake Dawkins](https://jakedawkins.com/blog/graphql-style.guide/)
6. [Shopify GraphQL Design Tutorial](https://github.com/Shopify/graphql-design-tutorial/blob/master/TUTORIAL.md)
7. [My take on GraphQL naming conventions by Sophia Willows](https://sophiabits.com/blog/graphql-naming-conventions)
8. [Naming conventions by Benjie Gillam](https://benjie.dev/graphql/naming)
9. [Hasura docs](https://hasura.io/docs/3.0/index/)
