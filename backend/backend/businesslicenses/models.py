from django.db import models

class BusinessLicense(models.Model):
    dba_name = models.CharField(max_length=500)
    legal_name = models.CharField(max_length=500)
    license_number = models.IntegerField()
    expiration_date = models.DateField()
    zip_code = models.CharField(max_length=12)

    def __str__(self):
        return self.dba_name + ": " + self.license_number
