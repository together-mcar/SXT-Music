from django.db import models

# Create your models here.

class UserList(models.Model):
  '''
  用户列表
  '''
  choice = (
    (0, '先生'),
    (1, '女士')
  )
  userId = models.AutoField(primary_key=True)
  userName = models.CharField(max_length=16, unique=True, null=True)
  passWord = models.CharField(max_length=16, null=True)
  gender = models.IntegerField(choices=choice, default=0)

  def __str__(self):
    return 'UserList object (name: %s)' % (self.userName)
  class Meta:
    db_table = 'userList'