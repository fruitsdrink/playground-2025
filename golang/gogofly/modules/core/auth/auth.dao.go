package auth

import (
	"github.com/gogofly/model/system"
	"github.com/gogofly/modules/core/base"
)

type AuthDao struct {
	base.BaseDao
}

var authDao *AuthDao

func NewDao() *AuthDao {
	if authDao == nil {
		authDao = &AuthDao{
			base.NewDao(),
		}
	}
	return authDao
}

func (ad *AuthDao) FindByUserName(userName string) system.User {
	var user system.User

	ad.Orm.Model(&user).Where("user_name = ?", userName).First(&user)

	return user
}