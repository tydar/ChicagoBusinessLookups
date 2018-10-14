from django.db import models

class BusinessLicense(models.Model):
    dba_name = models.CharField(max_length=500)
    legal_name = models.CharField(max_length=500)
    license_number = models.IntegerField()

    def __str__(self):
        return self.dba_name + ": " + self.license_number
