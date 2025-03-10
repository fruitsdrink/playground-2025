package user

import "github.com/gogofly/modules/core/base"

type UserDao struct {
	base.BaseDao
}

var userDao *UserDao

func NewDao() *UserDao {
	if userDao == nil {
		userDao = &UserDao{
			base.NewDao(),
		}
	}
	return userDao
}