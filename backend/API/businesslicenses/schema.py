from graphene import relay, ObjectType
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .models import BusinessLicense

class LicenseNode(DjangoObjectType):
    class Meta:
        model = BusinessLicense
        filter_fields = {
                'dba_name': ['exact', 'icontains'],
                'legal_name': ['exact', 'icontains'],
                'license_number': ['exact'],
                'zip_code': ['exact'],
        }
        interfaces = (relay.Node, )

class Query(object):
    all_licenses = DjangoFilterConnectionField(LicenseNode)
    license = relay.Node.Field(LicenseNode)
