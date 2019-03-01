from django.db import models

# Create your models here.


class Client(models.Model):
    id = models.AutoField(db_column='Id', primary_key=True)
    name = models.CharField(db_column='Name', max_length=45)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'client'
