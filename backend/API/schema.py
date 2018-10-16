import graphene
import API.businesslicenses.schema

class Query(API.businesslicenses.schema.Query, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query)
