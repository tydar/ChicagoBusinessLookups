import graphene

from graphene_django.types import DjangoObjectType
from .models import BusinessLicense

class BusinessLicenseType(DjangoObjectType):
    class Meta:
        model = BusinessLicense

class Query(object):
    all_licenses = graphene.List(BusinessLicenseType)

    def resolve_all_licenses(self, info, **kwargs):
        return BusinessLicense.objects.all()
