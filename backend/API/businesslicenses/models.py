from django.db import models

# Create your models here.
class BusinessLicense(models.Model):
    dba_name = models.CharField(max_length=250)
    legal_name = models.CharField(max_length=250)
    license_number = models.IntegerField()
    expiration_date = models.DateField()
    zip_code = models.CharField(max_length=11)

    def __str__(self):
        return self.legal_name + " doing business as " + self.dba_name
